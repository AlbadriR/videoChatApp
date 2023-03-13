# Doc

Dans cette doc il y a un peu tous les chose ou je me suis documenter

# WebRTC

WebRTC est une technologie qui permet aux navigateurs Web de communiquer entre eux en tant réel.

Pour bien comprendre en quoi cette technologie consiste je me suis d'abord basé sur la documentation officielle mdn :
https://developer.mozilla.org/fr/docs/Web/API/WebRTC_API

Cette documentation permet de bien comprendre le fonctionnement de webRTC mais la plupart de la
documentation contient maleuresement des élements obsolètes comme indiqué ici :
https://developer.mozilla.org/fr/docs/Web/API/WebRTC_API/Signaling_and_video_calling#note
J'ai suivis plusieurs tutorial dont celui ci :
https://www.youtube.com/watch?v=gnM3Ld6_upE qui utilise la librairie peer-js.
Après avoir suivis ce tuto j'ai eu une meilleur compréhension general mais il me
restait toujours des zones d'ombres étant donnée qu'on utilise une librairie.
J'ai alors chercher un autre tutorial qui implementait une connection mais "from
scratch" sans librairie pour pouvoir comprendre en detail chaque partie et
interaction afin de réaliser une connection p2p. Je suis tombé sur celui ci :
https://www.youtube.com/watch?v=JhyY8LdAQHU que j'ai particulierement apprécier
par ses explications détailler et non pas juste suivre un code "betement". Il y
a plein de chose a savoir sur webrtc et parmis les plus important il y a le NAT
, le STUN et le TURN ainsi que le SDP et le ICE que je vais vous expliquer. Je
n'est pas besoin de connaitre tous ces concepts en détail pour réaliser mon
projet mais il faut que j'ai une idée de ce que c'est et de comment ça marche.
Cette vidéo m'a permis de comprendre la base de tous ces complexes protocoles :
Source : https://www.youtube.com/watch?v=FExZvpVvYxA De nos jours, tous les
navigateurs moderne supporte WebRTC ainsi que sur tous les OS. Il faut cependent
ne pas oublier d'utilisé le navigateur safari sur les apareilles IOS.
![support](./img/support.png)

## UDP (User Datagram Protocol)

UDP est un protocole de communication de données utilisé sur Internet. Il fait partie de la
couche transport du modèle OSI et est souvent utilisé pour établir des
communications de données en temps réel entre deux ordinateurs sur un réseau.
WebRTC utilise UDP qui est souvent utilisé comme protocole de transport pour
l'échange de données multimédia en temps réel entre les navigateurs Web. WebRTC
est une technologie qui permet aux navigateurs Web de communiquer en temps réel
en utilisant des protocoles de communication en temps réel, comme UDP, pour
échanger des données audio, vidéo et de données en temps réel. UDP est souvent
préféré pour les communications video en temps réel car il est plus rapide que
TCP (Transmission Control Protocol). UDP est moins fiable que TCP, mais cela
n'est pas un problème dans le cas de la transimission de données audio et vidéo
en temps réel car l'importance de l'intégrité des données n'est pas très élevé.

## Nat (Network Address Translation)

Let nat donne une adresse ip public a chaque appareil. Un router a une adresse publique et chaque périphérique aura
une adresse privée.

## STUN (Session Traversal Utilities for NAT)

STUN est un protocole qui va nous dire notre adresse ip publique on est et il permet aussi
de savoir si on est derriere un proxy et de savoir quel type de proxy on est.
Avec seulement stun on peut pas faire de communication directe entre 2 personnes
derriere un NAT car l'adresse ip public est donnée par le router et on ne sait
pas quel sous apareille sur le router. C'est pour cela qu'il y a le TURN.

## TURN (Transversal Using Relays around NAT)

Lorsque les utilisateurs ne sont pas
sur le meme réseau local on fait apelle au TURN car lorsque l'on est sur le meme
réseau le STUN suffit. Turn est un serveur qui permet de faire de la
communication directe entre 2 personnes derriere un NAT. Etant donné que
l'apareil se trouve deriere une box on ne peut pas accéder directement a
l'apareil, il faut donc passer par le TURN qui va faire le lien entre les 2
appareils.

## ICE (Interactive Connectivity Establishment)

ICE est un protocole qui va permettre d'échanger les informations sur la connexion réseau. Les
informations sont contenue dans ce que l'on apelle ice candidate et détail si
c'est possible de se connecter directement ou si il faut passer par un TURN. ##
SDP (Session Description Protocol) SDP n'est pas un protocole mais un format de
fichier qui permet de décrire une session de communication. Il permet de prendre
le sdp generer par un utilisateur et l'envoyer quelque part et de le recuperer
et de le lire pour savoir comment se connecter a l'utilisateur. Il contient les
informations de l'utilisateur.

## DTLS (Datagram Transport Layer Security)

DTLS est un transport de données sécurisé qui encrypte toutes les données envoyer par
webRTC. Mais en sois dans une connection P2P les données ne passe pas par le web
ou un server donc cela rend déja plus difficile de les intercepter. C'est pas
une information utile pour le développement du projet de diplome mais c'est une
information utile pour comprendre comment fonctionne la sécurité des données en
webrtc.

## Schema

Ce shema montre comment tous les protocoles fonctionnent
ensemble pour crée une communication. ![schema](./img/schema.png)

# WebRTC & websocket

Elles ont été concus pour des utilisations différentes. WebRTC est
souvent utilisé pour la création de applications de communication en temps réel,
telles que les appels vidéo en ligne et les conférences vidéo. WebSocket, en
revanche, est un protocole de communication de données en temps réel qui permet
aux navigateurs Web de communiquer avec des serveurs en temps réel en créant une
connexion persistante aussi appelé connexion bidirectionnel entre le navigateur
et le serveur. Il est souvent utilisé pour la communication en temps réel de
données de faible latence, telles que les mises à jour en direct des données de
jeux en ligne ou les notifications en temps réel. En résumé, WebRTC est
principalement conçu pour la communication en temps réel de données multimédia
entre les navigateurs Web et d'autres appareils, tandis que WebSocket est
principalement conçu pour la communication en temps réel de données de faible
latence entre les navigateurs Web et les serveurs.

## Simple peer vs peerjs

Parmis les librairies qui permette d'utilisé WebRTC il y en a deux qui sorte du
lot : simple-peer et peerjs.

### Comparatif

Les deux biliothèques sont populaire mais il y a quelque différence notable. Simple-peer est une bibliothèque plus
petite et plus simple que peerjs, ce qui peut la rendre plus facile à utiliser
et à intégrer. peerjs, en revanche, propose une gamme de fonctionnalités et de
fonctions de haut niveau qui peuvent être utiles dans certains cas, mais qui
peuvent également rendre la bibliothèque plus complexe à utiliser.

### Choix

Si j'ai besoin d'utilisé une librairie j'utiliserai simple-peer car elle est plus
simple et plus petite que peerjs. De plus, je n'ai pas besoin de toutes les
fonctionnalités de peerjs. J'essaierai dabord sans librairie pour bien
comprendre comment ca marche et ensuite si je trouve qu'uiltiliser une librairie
me fais gagner du temp alors j'utiliserai simple-peer. Source :
https://www.libhunt.com/compare-peerjs-vs-simple-peer Source:
https://npmtrends.com/easyrtc-vs-peerjs-vs-simple-peer-vs-simplewebrtc

## Comment ca marche concretement ?

Pour l'implémentation, j'ai suivis les documentations officiels ainsi que des tutoriels sur internet dont celui ci que
j'ai particuliérement apprécié car il couvre tous les principaux points
important qui permette de comprendre comment fonctionne une connection WebRTC :
https://www.youtube.com/watch?v=QsH8FL0952k C'est dans la documentation de
mozilla qu'il faut ce documenter afin de comprendre comment l'API WebRTC
fonctionne et comment on peut l'utiliser. Documentation : https://webrtc.org/
https://developer.mozilla.org/fr/docs/Web/API/WebRTC_API

## WebRTC from scratch

J'ai réalisé un petit projet qui permet de faire une connection WebRTC entre 2 utilisateurs sans utiliser de librairie afin de comprendre en détail le fonctionnement de WebRTC.

## Connection WebRTC comment ca marche ?

Un utilisateur transmet son SDP qui contient les infomation de connection a un
autre utilisateur. Il y a plusieurs facons de transmettre le SDP mais la plus
simple est de l'envoyer par socket.io. Une fois que l'autre utilisateur a recu
le SDP il peut l'envoyer a son navigateur qui va se connecter a l'utilisateur
qui a envoyé le SDP. Le sdp resemble à ca :
{"type":"offer","sdp":"v=0\r\no=mozilla...THIS_IS_SDPARTA-99.0
4500225421382342246 0 IN IP4 0.0.0.0\r\ns=-\r\nt=0
0\r\na=sendrecv\r\na=fingerprint:sha-256
29:F5:8A:54:B5:EE:9F:5B:73:02:FA:96:0F:7A:07:CD:98:B5:77:CC:49:83:F8:C5:27:41:4C:A7:2C:0B:39:9E\r\na=group:BUNDLE
0\r\na=ice-options:trickle\r\na=msid-semantic:WMS \*\r\nm=video 35458
UDP/TLS/RTP/SAVPF 120 124 121 125 126 127 97 98\r\nc=IN IP4
10.5.51.38\r\na=candidate:0 1 UDP 2122252543 10.5.51.38 35458 typ
host\r\na=candidate:1 1
http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time\r\na=extmap:5
urn:ietf:params:rtp-hdrext:toffset\r\na=extmap:6/recvonly
http://www.webrtc.org/experiments/rtp-hdrext/playout-delay\r\na=extmap:7
http://www.ietf.org/id/draft-holmer-rmcat-transport-wide-cc-extensions-01\r\na=fmtp:126
profile-level-id=42e01f;level-asymmetry-allowed=1;packetization-mode=1\r\na=fmtp:97
profile-level-id=42e01f;level-asymmetry-allowed=1\r\na=fmtp:120
max-fs=12288;max-fr=60\r\na=fmtp:124 apt=120\r\na=fmtp:121
max-fs=12288;max-fr=60\r\na=fmtp:125 apt=121\r\na=fmtp:127 apt=126\r\na=fmtp:98
Je l'ai rogné un peu pour que ca soit plus lisible. et que ca prenne moins de
place. A se moment là ils sont connectés mais ne peuvent pas encore communiquer.
Pour cela il faut que l'utilisateur qui a envoyé le SDP envoie son ICE candidate
a l'autre utilisateur. L'autre utilisateur va ensuite envoyer son ICE candidate
a son navigateur qui va se connecter a l'utilisateur qui a envoyé le SDP. On
doit faire sa car aujaurd'hui la plupart des aparails sont dérrière des routers.
On utilise la methode ICE pour demander au server STUN de nous donner notre
adresse IP publique. Le server STUN va nous renvoyer notre adresse IP publique
et le port que nous utilisons. On va ensuite envoyer cette information a l'autre
utilisateur qui va ensuite envoyer cette information a son navigateur qui va se
connecter a l'utilisateur qui a envoyé le SDP. Ensuite le second utilisateur va
faire la meme chose. La connection entre les deux utilisateur est maintenant
établie. Ils peuvent maintenant communiquer des données audio et vidéo.

## WebRTC alterative

Si on ne shouaite pas utilisé webRTC on peut faire apelle a un
"third-party" comme par exemple Twillo ou Agora.io. Ces services sont payant qui
propose des API et ils sont utilisé par de nombreuses entreprises.

## WebRTC

Type d'approche réseau Il existe 3 type d'approche réseau pour la connection
WebRTC, le mesh, le mcu et le sfu et le Mesh Network.
[network](https://1447146506-files.gitbook.io/~/files/v0/b/gitbook-legacy-files/o/assets%2F-M52w8t7SxT8Jf95la_N%2F-M6Ua_W0jeGIk98ISL3W%2F-M6UbrFwqB4h9d-2NjOH%2FGroup%2031.png?alt=media&token=e410d58f-b230-4155-9d0e-68490ae4b103)

### MESH network

La methode mesh consisite a connecter les utilisateurs entre

eux mais le probleme et qu'il est très dificile de gerer beaucoup d'utilisateur
avec cette methode. La methode mesh se nomme aussi "peer-to-peer".

### MCU

(Multipoint Control Unit) Chaque utilisateur envoie ses données audio et vidéo a
un serveur qui va les traiter pour en faire un seul flux qui va redistribuer a
tous les autres utilisateurs. La methode MCU est souvent utilisé lorsque l'on a
besoin d'avoir de nombreux clients. Le principal probleme avec le MCU c'est que
cela consomme beaucoup de ressources et que cela peut etre tres couteux. Il sera
priviligé pour les visio-conferences de petite et moyenne taille..

### SFU

(Selective Forwarding Unit) La methode SFU est également concus pour avoir de
nombreux utilisateurs
Mais contrairement au MCU, le SFU ne va pas traiter les
données audio et vidéo de chaque utilisateur
Il va juste les redistribuer a
tous les autres utilisateurs. Le SFU aura une meilleur qualité que le mcu car il
transmet les données audio et vidéo sans les traiter. Le SFU sera géneralement
préféré au MCU pour les conferences de grande taille.

## Mettre en place ReactJS

Pour mettre en place ReactJS il faut d'abord installer NodeJS et NPM. Ensuite il
faut installer create-react-app qui va nous permettre de créer un projet
ReactJS. `bash npm install -g create-react-app ` Pour crée on execute la
commande suivante : `bash npx create-react-app nom-du-projet ` Ensuite on
nettoie le projet en supprimant les fichiers inutiles comme par exemple le
fichier logo.svg, App.css, App.test.js, index.css, logo.svg, setupTests.js,
serviceWorker.js. Le projet a besoin comme dépendance de simple-peer,
socket.io-client, @mui/material @emotion/react @emotion/styled,
@mui/icons-material uuid et react-copy-to-clipboard. `bash npm install `
Pour lancer le projet il faut se placer dans le dossier du projet front end et
lancer la commande suivante : `bash npm start ` ## Mettre en place NodeJS
Pour mettre en place NodeJS il faut d'abord installer NodeJS et NPM. Pour
initialier le projet il faut executer la commande suivante : `bash npm init
` et si on veut garder la configuration par défaut. `bash npm init -y `
Cette commande va créer un fichier package.json qui va contenir les informations
du projet. Par la suite on install les dépendances dont on a besoin pour le
projet. Dans mon cas j'ai besoin de express, socket.io et nodemon, cors, uuid.
On peut écrire i a la place de install. `bash npm i express socket.io nodemon
cors uuid ` Pour lancer le projet il faut se placer dans le dossier du projet
backend end et lancer la commande suivante : `bash npm start ` ## npm module

## React design UI library Reactjs dispose de plusieurs librairie pour le design

J'ai préféré utiliséer une librairie de composant plutot que de faire tout design a la main.

### Material UI

C'est une
librairie gratuite qui permet d'implementer des composants reactjs. Ils sont
aujaurd'ui a la V5. Il faut donc se méfier de ne pas utiliser des importaion de
module obsoléte que l'on trouve souvent dans les tutoriels. lorsque l'on utilise
Material UI il faut importer le module @mui/material et non pas
@material-ui/core qui est aujaurd'ui obsolete. Il y a deux approche pour
utiliser Material UI, la première est d'importer les composants un par un et la
deuxième est d'importer le module @mui/material qui contient tous les
composants. L'avantage de la deuxième approche est que l'on peut utiliser les
composants sans avoir a les importer un par un mais l'inconvénient est que le
projet final sera plus lourd.

### Ant design

Ant design est également gratuite
et à l'avantage d'avoir de nombreux composants.

### Mantine ui

Mantine ui est une librairie openSource. Elle est très bien documenté et elle est très simple à utiliser.

## Choix

J'ai choisi Mantine ui car je suis pas spécialement bon en design donc je préfère utiliser une librairie qui est simple à utiliser et dispose de composant responsive pour me concentrer surtout sur la partie fonctionnelle de l'application plutot que la partie visuel.

## ReactJS qualité du code

### ESLint

Avec la commande npx create-react-app nom-du-projet il y a eslint qui est installé
par défaut. Il permet de vérifier la qualité du code et de nous affichés dans la
console certaines erreurs. J'ai modifié la configuration de eslint pour avoir mes propres règles. Pour cela il faut créer un fichier .eslintrc.json à la racine du projet. Dans ce fichier on peut définir les règles que l'on veut.

### Norme de codage

Les composants ont toujours une
majuscule au début du nom, c'est une convention de ReactJS car les composants
existant de JSX qui sont comme des balise HTML eux sont en miniscule et donc
pour différencier les composants des balises HTML on met une majuscule au début
du nom du composant. L'interpreteur JSX va donc savoir que c'est un composant et
non une balise HTML.

### Local

En local tous fonctionne bien sur en localhost mais le
problème c'est que j'ai besoin de plusieurs utilisateurs pour tester mon
application. Avec la commande "npm start" d'un projet crée avec "npx
create-react-app nom-du-projet" le projet est lancé sur le port 3000. Pour
pouvoir y accéder depuis un autre ordinateur il faut noter dans l'url l'adresse
IP de l'ordinateur sur lequel le projet est lancé suivis du port.

### Heroku

Heroku est un service qui permet
d'heberger des applications web. Pour utilisé Heroku il faut obligatoirement
mettre une carte de crédit. Depuis Le 28 Novembre 2022 Heroku n'a plus de
version gratuite. Mais heuresement github student qui permet d'avoir accés
gratuitement a des outils de developpement qui sont normalement payant. Parmis
ces outils il y a Heroku.

#### Déployer une application React Nodejs WebRTC sur Heroku

Cette video m'a permis de mieux comprendre comment déployer une app
WebRTC sur la platforme Heroku. https://www.youtube.com/watch?v=CrZ2JgLljAk

#### Installer le package react dotenv

Cela nous permet d'avoir des variables
d'environnement que l'on va utilisé afin de pouvoir changer rapidement la
configuration du projet. Dans mon cas ce sera utile car la configuration
developpement/production n'est pas la meme. Dans le code importer la ligne
suivante en haut de l'server.js require("dotenv").config(); On peut ensuite
déclarer une constante 'port' qui ne sera pas le meme en fonction de son
environnement. const port = process.env.PORT || 3001; process est une variable
fournis par Node.js et contient les informations sur l'environnement de
l'application env permet de configurer les variable d'environnement. PORT est
définit par l'environnement d'execution, dans mon cas c'est Heroku.

#### Procfile

Le procfile est une fichier se trouvant a la racine et qui sera utilisé
par Heroku pour savoir comment démarrer l'application. dans mon cas le fichier
contindera : web: node server.js

#### package.json

Dans le package.json il faut
préciser dans le script start PROD=true avant le node server.js

##### Postinstall

Le script postinstall qui s'execute une fois les dépendences du projet
installer. "postinstall": "cd ./client && npm install" si on utilise yarn :
"postinstall": "cd ./client && yarn" Une fois que l'installation coté client et
réaliser nous allons build la partie client. Dans le package.js de reactjs
ajouté : "postinstall": "yarn build" ou "postinstall": "npm run build"

##### code dans sever.js

if (process.env.PROD) { // this will serve all the client
side app to the client via the build folder
app.use(express.static(path.join(**dirname,'./client/build'))); // if a request
from a user come to the server match, we send the index.html and let the client
side reactjs app do the navigation instead of doing it with express.
app.get('\*',(req,res) => {
res.sendFile(path.join(**dirname,'./client/build/index.html')); }); } le dossier
build contient la version de production generer avec la commande se trouvant
dans le "postinstall" de reactjs.

##### Deployer

En ligne de commande : Se
connecter avec heroku login Ensuite créer l'application heroku create Pour lier
l'application a github heroku git:remote -a nom-de-l-application Pour finir on
push sur heroku git push heroku master

### Infomaniak

https://www.infomaniak.com/fr/hebergement/toutes-nos-offres Informaniak est une
entreprise d'informatique Suisse qui est spécialisé dans l'hebergement de site
web. Il y a une offre gratuite pour les étudiants pour l'hebergement de site
web. Mais pour pouvoir heberger mon server nodejs il me faut un serveur cloud
qui n'est pas disponible gratuitement pour les étudiants.

### AWS

https://aws.amazon.com/fr/ Aws est une entreprise d'informatique américaine qui
est spécialisé dans l'hebergement de site web mais n'est pas gratuite pour
héberger un serveur nodejs.

### Render

https://render.com/ Render lui est le
seul qui propose d'heberger gratuitement un serveur nodejs. Il faut juste avoir
un compte github et un compte render. L'inconvénient est que le dépoiement est
particuliérement et j'ai déja une mauvaise expérience avec eux en utilisant la
version gratuite.

### Glitch

https://glitch.com/

### Choix

Si je dois héberger
mon app en dehors du localhost je choisierai Heroku car c'est la meilleur
solution possible que je peux obtenir gratuitement grace a github student.

## Git

Git est un logiciel qui permet d'avoir un historique des modifications d'un
projet. Il permet de travailler en équipe sur un projet et de pouvoir revenir en
arrière si on fait une erreur.

### GitIgnore

Un gitignore permet d'ignorer
certains fichiers ou dossiers lors de l'ajout des fichiers au commit. Dans un
projet nodejs la principale utilisation du gitignore est d'ignorer le dossier
node_modules car il est très lourd est de plus c'est inutile de le commit car il
est généré automatiquement lors de l'installation des dépendances avec la
commande "npm install" grace au package.json.

## Serveur de médiation

Lorsque on utilise la methode MCU ou SFU, il faut un serveur de médiation pour diffuser les
videos des utilisateurs en contact video a tous les autres utilisateurs de la
room. Le server de médiation va nous permettre de diffuser les videos de la
connection p2p des utilisateur en contact video a tous les autres spectateur de
la room. Ce qui permet au specatateur de voir les video des utilisateurs en
contact video sans meme avoir établie une connection p2p avec eux. Il plusieurs
serveur de médiation :

## Janus https://janus.conf.meetecho.com/

https://github.com/meetecho/janus-gateway

## Kurento

https://github.com/Kurento/kurento-media-server

### mediasoup

https://www.npmjs.com/package/mediasoup https://mediasoup.org/documentation/ npm
module qui permet d'utiliser SFU (Selective Forwarding Unit).

## Divers

### Ce que j'ai appris

ce que j'ai appris qui ne me sert pas pour ce projet mais pourrait me servir dans le futur.
Les protocoles DASH HLS RTMP permettent de diffuser les vidéos de votre connexion WebRTC à
des utilisateurs qui ne sont pas connectés en direct à votre application. Cela
nous permet de diffuser notre connection par exemple sur youtube ou twitch à
l'aide de par exemple OBS Studio qui prend en charge les protocoles vu
précédement et qui permet par un server de médiation comme Janus ou Kurento de
diffuser notre connection WebRTC. C'est protocol sont donc interessant pour
faire du streaming en direct du débat en live sur les célèbres plateformes de
streaming comme youtube ou twitch.

### wrtc

https://www.npmjs.com/package/wrtc https://github.com/node-webrtc/node-webrtc Ce
package permet d'utiliser WebRTC dans nodejs sans avoir besoin d'un front-end
comme react.

## Accesibilité du site depuis un autre aparreil

Voici les différentes étapes que j'ai essayé pour faire marché le projet sur le réseau afin qu'un utilisateur utilisant un autre appareil puisse se connecter sans problème à l'url de mon poste et que toutes les fonctionnalités lier au server fonctionne.

### Desactivé le firewall

J'ai fait des recherches et j'ai trouvé que le firewall pouvait être la cause du problème. J'ai donc essayé de le désactivé mais cette solution à elle seul n'a pas marché.

Sur ubuntu pour désactivé le firewall il faut faire la commande suivante:

```bash
sudo ufw disable
```

### Ajouter https

Pour accéder au site il suffit de taper dans l'url l'adresse du pc sur lequel le site est hébergé, puis de rajouter le port à la fin de l'adresse. Mais en http il y a un problem, on ne peut pas utilisé la camera.

Alors j'ai du passer mon site en https pour que les navigateurs autorise l'utilisation de la camera :

https://10.5.51.38:3000

Pour cela j'ai du indiquée a la commande start dans le package.json du front-end que j'utilisait https.
https://create-react-app.dev/docs/using-https-in-development/

```json
"start": "HTTPS=true react-scripts start",
```

Pour crée les certificat j'ai utilisé openssl.
Il fallait également que je rajoute un certificat ssl, j'ai utilisé un certificat donnée par la compagnie Encryption Everywhere DigiCert Inc que j'ai obtenue avec github student.

J'ai du ensuite ajouter le lien vers le certificat dans le package.json ainsi que ma clé privée.

```json
"start": "HTTPS=true SSL_CRT_FILE=./localhost.pem SSL_KEY_FILE=./localhost-key.pem react-scripts start",
```

Pour le backend c'est similaire, il faut indiqué que l'on utilise https et le chemin vers le certificat et la clé privée.

Il y a 3 fichiers à fournir, le certificat, la clé privée et le certificat de l'autorité de certification.

```js
const options = {
  key: fs.readFileSync("./ns1.name.com.key"),
  cert: fs.readFileSync("./debate_crt.crt"),
  ca: fs.readFileSync("./debate_ca.crt"),
};
```

Il faut également dire a corse que l'on accepte les requêtes provenant de l'adresse du front-end

origin: "https://192.168.1.7:3000"

## Glossaire

### Signaling

C'est le processus ou chaque
utilisateurs va s'envoyé les informations nécessaire pour trouver un terrain
d'entente afin de se connecter. Il y a plusieurs facons de le faire mais la plus
simple est de l'envoyer par socket.io.

### JSX

JSX est une extension de syntaxe
pour JavaScript. Il permet de créer des éléments React avec une syntaxe
similaire à celle de HTML.
