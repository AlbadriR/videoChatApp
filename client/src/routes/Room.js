import { useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
const Room = (props) => {
  const userVideo = useRef();
  const partnerVideo = useRef();
  const peerRef = useRef();
  const socketRef = useRef();
  const otherUser = useRef();
  const userStream = useRef();
  const { roomID } = useParams();

  useEffect(() => {
    // Ask the user for permission to use the webcam and microphone
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then((stream) => {
        userVideo.current.srcObject = stream;
        userStream.current = stream;
        // We connect to the socket.io server
        socketRef.current = io.connect("https://192.168.1.7:3001/", {
          secure: false,
        });
        // We send the roomID to the server
        socketRef.current.emit("join room", roomID);

        // we get the ID of the other user
        socketRef.current.on("other user", (userID) => {
          // we call the other user (the one who created the room)
          callUser(userID);
          // we save the ID of the other user
          otherUser.current = userID;
        });
        // the one who created the room gets the ID of the other user
        socketRef.current.on("user joined", (userID) => {
          otherUser.current = userID;
        });
        // This event is called wehen we receive an offer and we will then emit an answer to the server
        socketRef.current.on("offer", handleRecieveCall);
        // This event handle the answer we receive from the server
        socketRef.current.on("answer", handleAnswer);
        //
        socketRef.current.on("ice-candidate", handleNewICECandidateMsg);
      });
  }, []);

  function callUser(userID) {
    // create a peer object
    peerRef.current = createPeer(userID);
    // we get the stream of the user who is calling and we add it to the peer object to then send it to the other user
    userStream.current
      .getTracks()
      .forEach((track) => peerRef.current.addTrack(track, userStream.current));
    console.log("callUser");
  }
  // userID represents the ID of the user trying to call us
  function createPeer(userID) {
    /* Create a peer object, the iceServers contains an url for the stun and turn server
    these server job is to help the peer object to find the best way to connect to the other peer by bypassing
     the firewall, NAT an other netowrk problems depending on the router configuration*/
    const peer = new RTCPeerConnection({
      iceServers: [
        {
          urls: "stun:stun.stunprotocol.org", // stun:stun.stunprotocol.org is a famous free public stun server
        },
        {
          urls: "turn:numb.viagenie.ca", // turn:numb.viagenie.ca is a free public turn server
          credential: "muazkh", // the password for the turn server
          username: "webrtc@live.com", // the username for the turn server
        },
      ],
    });

    console.log("createPeer");
    // onicecandidate event is called when the peer object find a candidate to connect to the other peer
    peer.onicecandidate = (e) => {
      if (e.candidate) {
        const payload = {
          target: otherUser.current,
          candidate: e.candidate,
        };
        socketRef.current.emit("ice-candidate", payload);
      }
    };
    // on track event is called when a connection is established and we can start to stream the video. HandleTrackEvent will display the video of the other user
    peer.ontrack = handleTrackEvent;
    /* This event is called when there's a change like a user change his camera or microphone.
     In this case we will update the connection with the new informations without restart the connection 
     instead of restart the connection at zero We use onegotionneeded to avoid to
      recreate a call with peer.onicecandidate and peer.ontrack. (The one who change the connection is responsible to initiate the negotiation) */
    peer.onnegotiationneeded = () => handleNegotiationNeededEvent(userID);

    return peer;
  }

  function handleNegotiationNeededEvent(userID) {
    // Create an offer to the other user
    peerRef.current
      .createOffer()
      .then((offer) => {
        // Change the curent description of the peer object to the offer we just created
        return peerRef.current.setLocalDescription(offer);
      })
      .then(() => {
        const payload = {
          target: userID,
          caller: socketRef.current.id,
          sdp: peerRef.current.localDescription,
        };
        // We send the offer to the server to send it to the other user
        socketRef.current.emit("offer", payload);
      })
      .catch((e) => console.log(e));
    console.log("handleNegotiationNeededEvent");
  }

  function handleRecieveCall(inComingPayload) {
    // we are receiving an offer from the other user so our createPeer dosen't need an ID
    peerRef.current = createPeer();
    const desc = new RTCSessionDescription(inComingPayload.sdp);
    // Set the description with the offer we received from the other user
    peerRef.current
      .setRemoteDescription(desc)
      .then(() => {
        userStream.current // we get the stream of the user who is receiving the call
          .getTracks() // we get the tracks of the stream
          .forEach(
            (track) => peerRef.current.addTrack(track, userStream.current) // we add the tracks to the peer object
          );
      })
      .then(() => {
        // we create an answer to the offer we received
        return peerRef.current.createAnswer();
      })
      .then((answer) => {
        // we set the description of the peer object to the answer we just created
        return peerRef.current.setLocalDescription(answer);
      })
      .then(() => {
        const payload = {
          target: inComingPayload.caller, // who he is
          caller: socketRef.current.id, // who i am
          sdp: peerRef.current.localDescription, // the description of the peer object
        };
        // we send the payload to the server to send it to the other user
        socketRef.current.emit("answer", payload);
      });
  }

  function handleAnswer(message) {
    console.log("handleAnswer");
    const desc = new RTCSessionDescription(message.sdp);
    // we set the description of the other user peer object with the answer we received from him
    peerRef.current.setRemoteDescription(desc).catch((e) => console.log(e));
  }

  // This function will be called when we receive an ice candidate from the other user
  function handleNewICECandidateMsg(inComingPayload) {
    // get the ice candidate
    const candidate = new RTCIceCandidate(inComingPayload);
    // add the ice candidate to the peer object and try to estiblish a connection
    peerRef.current.addIceCandidate(candidate).catch((e) => console.log(e));
  }

  function handleTrackEvent(e) {
    // we set the source of the video to the stream of the other user, partnerVideo is the video element
    partnerVideo.current.srcObject = e.streams[0];
  }

  return (
    <div>
      {/* This will display our cam */}
      <video autoPlay ref={userVideo} />
      {/* This will display the oponnent cam */}
      <video autoPlay ref={partnerVideo} />
    </div>
  );
};

export default Room;
