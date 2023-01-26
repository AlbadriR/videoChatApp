# Doc

Dans cette doc il y a un peu tous les chose ou je me suis documenter

# WebRTC

WebRTC est une technologie qui permet aux navigateurs Web de communiquer en temps réel en utilisant des protocoles de communication en temps réel, comme UDP, pour échanger des données audio, vidéo.

Pour ce projet, je me suis d'abord basé sur la documentation officielle mdn : https://developer.mozilla.org/fr/docs/Web/API/WebRTC_API
Cette documentation permet de bien comprendre le fonctionnement de webRTC mais la plupart de la documentation contient maleuresement des élements obsolètes comme indiqué ici : https://developer.mozilla.org/fr/docs/Web/API/WebRTC_API/Signaling_and_video_calling#note

Il y a plein de chose a savoir sur webrtc et parmis les plus important il y a le NAT , le STUN et le TURN ainsi que le SDP et le ICE que je vais vous expliquer.

Je n'est pas besoin de connaitre tous ces concepts en détail pour réaliser mon projet mais il faut que j'ai une idée de ce que c'est et de comment ça marche.

Cette vidéo m'a permis de comprendre la base de tous ces complexes protocoles : Source : https://www.youtube.com/watch?v=FExZvpVvYxA

De nos jours, tous les navigateurs moderne supporte WebRTC ainsi que sur tous les OS.

Il faut cependent ne pas oublier d'utilisé le navigateur safari sur les apareilles IOS.

![support](./img/support.png)

## UDP

UDP (User Datagram Protocol) est un protocole de communication de données utilisé sur Internet. Il fait partie de la couche transport du modèle OSI et est souvent utilisé pour établir des communications de données en temps réel entre deux ordinateurs sur un réseau.

WebRTC utilise UDP qui est souvent utilisé comme protocole de transport pour l'échange de données multimédia en temps réel entre les navigateurs Web. 

UDP est souvent préféré pour les communications video en temps réel car il est plus rapide que TCP (Transmission Control Protocol). UDP est moins fiable que TCP, c'est à dir qu'on ne garenti pas l'envoie des données, mais cela n'est pas un problème dans le cas de la transimission de données audio et vidéo en temps réel car l'importance de l'intégrité des données n'est pas très élevé.

## Nat

Le NAT est le protocole qui donne a notre appareil une adresse ip publique.
Nos appareils connecté au router ont une adresse ip privé.

On ne peut pas faire une connection webRTC sans connaitre l'adresse privé d'un appareil c'est pourquoi ont utilise un server STUN ou TURN.

## STUN

STUN est un protocole qui nous dire quel est notre adresse ip publique et va déterminé tout les restriction qui empécherai la connexion avec un autre uilisateur comme un firewall. Une fois cela fait une communication peut étre établie. Dans ce cas la pas besoin de TURN server.  

## TURN

Turn est un serveur permet aussi de faire de la communication directe entre 2 personnes derriere un NAT. Il est utilisé comme relay, il recois les stream d'un client et les transferes à l'autre. Cela permet de les mettre en relation meme si ce n'est pas une connection directe. Le désavantage c'est que ce n'est plus une connection directe ce qui crée un peu de latance. TURN est donc utilisé en deuxieme options si la methode STUN ne fonctionne pas peut importe la raison.

## ICE

ICE est un protocole qui permet de transferer les informations du réseau afin d'établir une connection. Le protocole à ce que l'on apelle un ICE candidate qui contient les informations suivantes : 

- Adresse ip
- port
- Protocole utilisé (TCP ou UDP)

Une fois que les ICE candidats sont échangés, la connection par STUN ou TURN commence à ce faire.

## SDP

Le SDP est un format en JSON qui va contenir de nombreuses informations sur l'appareil. Il va échanger ces données avec l'appareil de l'autre utilisateur en décrivant par exemple le format video, audio et la résolution des médias qui sont envoyé, ensuite il vont se mettre d'accord sur quoi utilisé pour la communication.

Le sdp resemble à ca :
{"type":"offer","sdp":"v=0\r\no=mozilla...THIS_IS_SDPARTA-99.0 4500225421382342246 0 IN IP4 0.0.0.0\r\ns=-\r\nt=0 0\r\na=sendrecv\r\na=fingerprint:sha-256 29:F5:8A:54:B5:EE:9F:5B:73:02:FA:96:0F:7A:07:CD:98:B5:77:CC:49:83:F8:C5:27:41:4C:A7:2C:0B:39:9E\r\na=group:BUNDLE 0\r\na=ice-options:trickle\r\na=msid-semantic:WMS \*\r\nm=video 35458 UDP/TLS/RTP/SAVPF 120 124 121 125 126 127 97 98\r\nc=IN IP4 10.5.51.38\r\na=candidate:0 1 UDP 2122252543 10.5.51.38 35458 typ host\r\na=candidate:1 

Je l'ai rogné pour que ca soit plus lisible. et que ca prenne moins de place.

## DTLS

DTLS est un transport de données sécurisé qui encrypte toutes les données envoyer par webRTC. Mais en sois dans une connection P2P les données ne passe pas par le web ou un server donc cela rend déja plus difficile de les intercepter et si les données sont intercepté alors elle seront encrypté.
## Schema

Ce shema montre comment tous les protocoles fonctionnent ensemble pour crée une communication.

![schema](./img/schema.png)

## websocket

Pourquoi utiliser webRTC alors que les webscoket permet aussi de transferer des données en temp réels ?

WebRTC est concus pour utilisé pour la communication de média en temps réel.

WebSocket, en revanche, est un protocole de communication de données en temps réel qui permet aux navigateurs Web de communiquer avec des serveurs en temps réel en créant une connexion persistante aussi appelé connexion bidirectionnel entre le navigateur et le serveur. Il est souvent utilisé pour la communication en temps réel de données de faible latence, telles que les mises à jour en direct des données de jeux en ligne ou un chat en temps réel.

Avec les webSocket ont peut techniquement faire de la video en envoyant des images chaque milieme de seconde au server et ensuite l'envoyé au server pour le rediriger vers le client et rafraichir les images depuis un client Javascript. 

Les inconvéniant de cette approche est que cela crée de la latance,une mauvaise résolution, prend énormement de bande passante, beaucoup de performance coté client et server et il devient donc très dificile de sécuriser la "video" étant données que les images ne sont pas sécurisé.

Alors que webRTC propose une réel connection sécurisé qui est fait pour transmettre de la video et de l'audio. C'est d'ailleur pourquoi tous les tutoriels que l'on trouvent sur internet utilise webRTC.

## WebRTC Type d'approche réseau

Il existe 3 type d'approche réseau pour la connection WebRTC, le mesh, le mcu et le sfu, chaque architecture à ses avantages et inconvéniant.

![Mesh network](https://1447146506-files.gitbook.io/~/files/v0/b/gitbook-legacy-files/o/assets%2F-M52w8t7SxT8Jf95la_N%2F-M6Ua_W0jeGIk98ISL3W%2F-M6UbrFwqB4h9d-2NjOH%2FGroup%2031.png?alt=media&token=e410d58f-b230-4155-9d0e-68490ae4b103)

### Mesh network
La methode mesh se nomme aussi "peer-to-peer".
Cette methode consisite a connecter les utilisateurs entre eux en échangant leur informations dans un procecuss appelé signaling mais le probleme et que cela devient vite complexe de gerer un grand nombre d'utilisateur. L'avantage principale est la lentence extrémement faible.

### MCU (Multipoint Control Unit)

Chaque utilisateur envoie ses données audio et vidéo a un serveur qui va les traiter pour en faire un seul flux qui va redistribuer a tous les autres utilisateurs.
La methode MCU est souvent utilisé lorsque l'on a besoin d'avoir de nombreux clients.

Le principal probleme avec le MCU c'est que cela consomme beaucoup de ressources et que cela peut etre tres couteux.
Il sera priviligé pour les conferences de petite et moyenne taille.

### SFU (Selective Forwarding Unit)

La methode SFU est également concus pour avoir de nombreux utilisateurs. Mais contrairement au MCU, le SFU ne va pas traiter les données audio et vidéo de chaque utilisateur. Il va juste les redistribuer a tous les autres utilisateurs. Le SFU aura une meilleur qualité que le mcu car il transmet les données audio et vidéo sans les traiter.
Le SFU sera géneralement préféré au MCU pour les conferences de grande taille.


## Librairies

Parmis les librairies qui permette d'utilisé WebRTC il y en a deux qui sorte du lot : simple-peer et peerjs.

### Comparatif

Les deux biliothèques sont populaire et gratuite mais il y a quelque différence notable.

Simple-peer est une bibliothèque plus petite et plus simple que peerjs, ce qui peut la rendre plus facile à
utiliser et à intégrer.

peerjs, en revanche, propose une gamme de fonctionnalités et de fonctions de haut
niveau qui peuvent être utiles dans certains cas, mais qui peuvent également rendre la bibliothèque plus
complexe à utiliser.

### Alternative payante

#### simpleWEBRTC

SimplewebRTC est un framework Reactjs qui permet de facilité grandement la mise en place et la personnalisation d'une connection webRTC en fonction de nos besoin.

Le principale inconveniant de se service et qu'il est payant.

#### WebRTC dans le nuage

Si on ne shouaite pas utilisé webRTC on peut faire apelle a un "third-party" comme par exemple Twillo ou Agora.io. Ces services sont payant mais ils sont tres bien fait et ils sont utilisé par de nombreuses entreprises.
Ce sont des service en ligne qui permette d'utiliser leur API afin de gerer la connection webRTC dans le cloud.


### Choix

Si j'ai besoin d'utilisé une librairie j'utiliserai simple-peer car elle est plus simple et plus petite que peerjs. De plus, je n'ai pas besoin de toutes les fonctionnalités de peerjs.

J'essaierai dabord sans librairie pour bien comprendre comment ca marche et ensuite si je trouve qu'uiltiliser une librairie me fais gagner du temp alors j'utiliserai simple-peer.

Source : https://www.libhunt.com/compare-peerjs-vs-simple-peer
Source: https://npmtrends.com/easyrtc-vs-peerjs-vs-simple-peer-vs-simplewebrtc

## Comment ca marche concretement ?

Pour l'implémentation, j'ai suivis les documentations officiels ainsi que des tutoriels sur internet dont celui ci que j'ai particuliérement apprécié car il couvre tous les principaux points important qui permette de comprendre comment fonctionne une connection WebRTC : https://www.youtube.com/watch?v=QsH8FL0952k

Cependant, il n'utilise pas la methode de "signaling" avec socket.io qui est la méthode la plus simple et la plus utilisé et celle dont j'ai besoin pour mon projet mais ce n'est pas important car j'ai surtout besoin de comprendre les concepts.

C'est dans la documentation de mozilla qu'il faut ce documenter afin de comprendre comment l'API WebRTC fonctionne et comment on peut l'utiliser.

Documentation : https://webrtc.org/
https://developer.mozilla.org/fr/docs/Web/API/WebRTC_API

## WebRTC from scratch

A DEVELOPPER AVEC LE PROJET QUE J'AI REALISER

![fromScratch](./img/fromscratch.png)

## Connection WebRTC comment ca marche ?

Un utilisateur transmet son SDP qui contient les infomation de connection a un autre utilisateur. Il y a plusieurs facons de transmettre le SDP mais la plus simple est de l'envoyer par socket.io. Une fois que l'autre utilisateur a recu le SDP il peut l'envoyer a son navigateur qui va se connecter a l'utilisateur qui a envoyé le SDP.



A se moment là ils sont connectés mais ne peuvent pas encore communiquer. Pour cela il faut que l'utilisateur qui a envoyé le SDP envoie son ICE candidate a l'autre utilisateur. L'autre utilisateur va ensuite envoyer son ICE candidate a son navigateur qui va se connecter a l'utilisateur qui a envoyé le SDP. On doit faire sa car aujaurd'hui la plupart des aparails sont dérrière des proxy.

On utilise la methode ICE pour demander au server STUN de nous donner notre adresse IP publique. Le server STUN va nous renvoyer notre adresse IP publique et le port que nous utilisons. On va ensuite envoyer cette information a l'autre utilisateur qui va ensuite envoyer cette information a son navigateur qui va se connecter a l'utilisateur qui a envoyé le SDP.

Ensuite le second utilisateur va faire la meme chose.

La connection entre les deux utilisateur est maintenant établie. Ils peuvent maintenant communiquer des données audio et vidéo.




## Mettre en place ReactJS

Pour mettre en place ReactJS il faut d'abord installer NodeJS et NPM.
Ensuite il faut installer create-react-app qui va nous permettre de créer un projet ReactJS.

```bash
npm install -g create-react-app
```

Pour crée on execute la commande suivante :

```bash
npx create-react-app nom-du-projet
```

Ensuite on nettoie le projet en supprimant les fichiers inutiles comme par exemple le fichier logo.svg, App.css, App.test.js, index.css, logo.svg, setupTests.js, serviceWorker.js.

Le projet a besoin comme dépendance de simple-peer, socket.io-client, @mui/material @emotion/react @emotion/styled, @mui/icons-material uuid et react-copy-to-clipboard.

```bash
npm install
```

Pour lancer le projet il faut se placer dans le dossier du projet front end et lancer la commande suivante :

```bash
npm start
```

## Mettre en place NodeJS

Pour mettre en place NodeJS il faut d'abord installer NodeJS et NPM.
Pour initialier le projet il faut executer la commande suivante :

```bash
npm init
```

et si on veut garder la configuration par défaut.

```bash
npm init -y
```

Cette commande va créer un fichier package.json qui va contenir les informations du projet.

Par la suite on install les dépendances dont on a besoin pour le projet.
Dans mon cas j'ai besoin de express, socket.io et nodemon, cors, uuid.

On peut écrire i a la place de install.

```bash
npm i express socket.io nodemon cors uuid
```

Pour lancer le projet il faut se placer dans le dossier du projet backend end et lancer la commande suivante :

```bash
npm start
```

## React design UI library

Reactjs dispose de plusieurs librairie pour le design UI. Les plus connues sont Material UI et Ant design.

### Material UI

C'est une librairie gratuite qui permet d'implementer des composants reactjs. Ils sont aujaurd'ui a la V5. Il faut donc se méfier de ne pas utiliser des importaion de module obsoléte que l'on trouve souvent dans les tutoriels.

lorsque l'on utilise Material UI il faut importer le module @mui/material et non pas @material-ui/core qui est aujaurd'ui obsolete.

Il y a deux approche pour utiliser Material UI, la première est d'importer les composants un par un et la deuxième est d'importer le module @mui/material qui contient tous les composants.

L'avantage de la deuxième approche est que l'on peut utiliser les composants sans avoir a les importer un par un mais l'inconvénient est que le projet final sera plus lourd.

### Ant design

Ant design est également gratuite et à l'avantage d'avoir de nombreux composants.

## Choix

Je n'ai pas tester les deux librairies mais je pense que Material UI car elle est plus populaire et utilisé.

## ReactJS qualité du code

### ESLint

Avec la commande npx create-react-app nom-du-projet il y a eslint qui est installé par défaut. Il permet de vérifier la qualité du code et de nous affichés dans la console certaines erreurs.

### Norme de codage

Les composants ont toujours une majuscule au début du nom, c'est une convention de ReactJS car les composants existant de JSX qui sont comme des balise HTML eux sont en miniscule et donc pour différencier les composants des balises HTML on met une majuscule au début du nom du composant. L'interpreteur JSX va donc savoir que c'est un composant et non une balise HTML.

## La navigation des pages avec React

Dans une application React on ne rafraichie pas la page. Alors pour avoir une navigation on utilise le module "react-router-dom" qui s'occupera de charger les composants définit pour chaque URL.

React-router-dom fonctionne par un system de route.

## Hebergement

### Local

En local tous fonctionne bien sur en localhost mais le problème c'est que j'ai besoin de plusieurs utilisateurs pour tester mon application.

Avec la commande "npm start" d'un projet crée avec "npx create-react-app nom-du-projet" le projet est lancé sur le port 3000. Pour pouvoir y accéder depuis un autre ordinateur il faut noter dans l'url l'adresse IP de l'ordinateur sur lequel le projet est lancé suivis du port. Mais lorsque j'accéde a ma web app depuis l'adresse ip ma web app ne s'affiche pas correctement car a cause de la protection du router il n'est pas possible d'accéder a une web app qui tourne en local depuis un autre ordinateur.

C'est pour cela que j'ai besoin de ngrok.

#### ngrok

ngrok est un outil qui permet de partager son localhost avec d'autres personnes. Ce qui est pratique pour tester son application, pour pouvoir y accéder depuis un autre ordinateur ou pour pouvoir y accéder depuis un téléphone. Ce qui est pratique dans mon cas pour utilisé la camera de mon téléphone. De plus c'est plus rapide pour éffectué des tests que de devoir redeployer son application sur un server Heroku ou un infomaniak a chaque modification.

Ngrok fournis une connexion sécurisée par le certificat appelé "Let's Encrypt".

Pour utilisé ngrok il faut d'abord l'installer.
Pour l'installer suivre la documentation sur : https://dashboard.ngrok.com/get-started/setup

Ensuite une fois qu'on a l'exectuable il faut l'ajouter dans le dossier ou on soite l'utilisé.

Pour finir on execute la commande suivante :

```bash
ngrok http port
```

Dans mon cas le port est 3000.

Ensuite dans la console on a une adresse qui est généré et qui permet d'accéder a notre localhost depuis un autre ordinateur.

![ngrok](./img/ngrok.png)

### Heroku

Heroku est un service qui permet d'heberger des applications web. Pour utilisé Heroku il faut obligatoirement mettre une carte de crédit. Depuis Le 28 Novembre 2022 Heroku n'a plus de version gratuite. Mais heuresement github student qui permet d'avoir accés gratuitement a des outils de developpement qui sont normalement payant. Parmis ces outils il y a Heroku.

#### Déployer une application React Nodejs WebRTC sur Heroku

Cette video m'a permis de mieux comprendre comment déployer une app WebRtc sur la platforme Heroku.
https://www.youtube.com/watch?v=CrZ2JgLljAk

Heroku nous oblige a ajouter un moyen de paiement pour obtenir

#### Installer le package react dotenv

Cela nous permet d'avoir des variables d'environnement que l'on va utilisé afin de pouvoir changer rapidement la configuration du projet. Dans mon cas ce sera utile car la configuration developpement/production n'est pas la meme.

Dans le code importer la ligne suivante en haut de l'server.js

require("dotenv").config();

On peut ensuite déclarer une constante 'port' qui ne sera pas le meme en fonction de son environnement.

const port = process.env.PORT || 3001;

process est une variable fournis par Node.js et contient les informations sur l'environnement de l'application

env permet de configurer les variable d'environnement.

PORT est définit par l'environnement d'execution, dans mon cas c'est Heroku.

#### Procfile

Le procfile est une fichier se trouvant a la racine et qui sera utilisé par Heroku pour savoir comment démarrer l'application.

dans mon cas le fichier contindera :

web: node server.js

#### package.json

Dans le package.json il faut préciser dans le script start

PROD=true

avant le

node server.js

##### Post install

Le script postinstall qui s'execute une fois les dépendences du projet installer.

"postinstall": "cd ./client && npm install"

si on utilise yarn :

"postinstall": "cd ./client && yarn"

Une fois que l'installation coté client et réaliser nous allons build la partie client.

Dans le package.js de reactjs ajouté :

"postinstall": "yarn build"

ou

"postinstall": "npm run build"

##### code dans sever.js

if (process.env.PROD) {
// this will serve all the client side app to the client via the build folder
app.use(express.static(path.join(**dirname,'./client/build')));
// if a request from a user come to the server match, we send the index.html and let the client side reactjs app do the navigation instead of doing it with express.
app.get('\*',(req,res) => {
res.sendFile(path.join(**dirname,'./client/build/index.html'));
});
}

le dossier build contient la version de production generer avec la commande se trouvant dans le "postinstall" de reactjs.

### Infomaniak

https://www.infomaniak.com/fr/hebergement/toutes-nos-offres
Informaniak est une entreprise d'informatique Suisse qui est spécialisé dans l'hebergement de site web.
Il y a une offre gratuite pour les étudiants pour l'hebergement de site web. Mais pour pouvoir heberger mon server nodejs il me faut un serveur cloud qui n'est pas disponible gratuitement pour les étudiants.

### AWS

https://aws.amazon.com/fr/
Aws est une entreprise d'informatique américaine qui est spécialisé dans l'hebergement de site web mais n'est pas gratuite pour héberger un serveur nodejs.

### Render

https://render.com/
Render lui est le seul qui propose d'heberger gratuitement un serveur nodejs. Il faut juste avoir un compte github et un compte render.
L'inconvénient est que le dépoiement est particuliérement et j'ai déja une mauvaise expérience avec eux en utilisant la version gratuite.

### Glitch

https://glitch.com/

### Choix de l'hebergeur

J'ai choisi Heroku car c'est la meilleur solution possible que je peux obtenir gratuitement grace a github student.

## Git

Git est un logiciel qui permet d'avoir un historique des modifications d'un projet. Il permet de travailler en équipe sur un projet et de pouvoir revenir en arrière si on fait une erreur.

### GitIgnore

Un gitignore permet d'ignorer certains fichiers ou dossiers lors de l'ajout des fichiers au commit.

Dans un projet nodejs / react la principale utilisation du gitignore est d'ignorer les dossier node_modules car il sont très lourd est de plus c'est inutile de le commit car il est généré automatiquement lors de l'installation des dépendances avec la commande "npm install" grace au package.json.

## Serveur de médiation

Un server de médiation utilise le systeme SFU ou MCU

VOici la difference en image d'un server de médiation avec un connection p2p : 
![p2p](https://fiwaretourguide.readthedocs.io/en/latest/processing/kurento/images/Real-time-processin-media-stream1.png)

Un server de médiation se positionne au millieu des utilisateurs communiqueant et va permettre divers chose comme par exemple dans mon cas de diffuser le stream et permettre au specatateur de voir les video des utilisateurs en contact video sans meme avoir établie une connection p2p avec eux.

Source: https://fiwaretourguide.readthedocs.io/en/latest/processing/kurento/whats-webrtc-and-whats-a-media-server/

## Janus

https://janus.conf.meetecho.com/
https://github.com/meetecho/janus-gateway

## Kurento

Kurento se démarque car c'est le seul qui est populaire et qui permet de faire du MCU. Ce qui fais qu'il y a une faible bande passante. Il est possible d'utilisé Kurento avec Java, Nodejs et Javascript. La force de kurento résside dans le fait qu'on peut appliquer des filtre et des plugin comme par exemple OpenCV sur les streams des utilisateurs grace au MCU qui est le seul system qui traite les streams.

Voici comment il s'integre avec nodejs :

// Rogner l'image
![integration](https://fiwaretourguide.readthedocs.io/en/latest/processing/kurento/images/Real-time-processin-media-stream2.png)
https://github.com/Kurento/kurento-media-server


## Mediasoup

Mediasoup est un server de médiation open source basé sur webRTC quand est facile à intégrer avec Nodejs et Rust et c'est d'ailleur la que réside sont point fort, il est considérer cmme étant bien documenté.

Voici l'architecture mediasoup : 

![Architecture mediasoup](https://mediasoup.org/images/mediasoup-v3-architecture-01.svg)

Comme on peut le voir, pour effectué un broadcast des streams de l'utilisateur "producer" au "viewer" cela nessecite une bonne compréhension de chaque partie.


## Choix
Mediasoup est nettement plus populaire et s'intégre bien avec nodejs

Source:  https://npmtrends.com/janus-vs-janus-gateway-js-vs-kurento-utils-vs-mediasoup-vs-openvidu-browser

https://meetrix.io/blog/webrtc/introduction.html


https://www.npmjs.com/package/mediasoup-client
https://www.npmjs.com/package/mediasoup

https://github.com/mkhahani/mediasoup-sample-app



## Glossaire

### Signaling

C'est le processus qui permet de transmettre les informations de connection entre les utilisateurs. Il y a plusieurs facons de le faire mais la plus simple est de l'envoyer par socket.io.

### JSX

## Divers

### Ce que j'ai appris qui pourrait me servir dans le futur

J'ai appris que je pouvais utilisé les protocoles DASH HLS RTMP pour diffuser les vidéos de votre connexion WebRTC à des utilisateurs qui ne sont pas connectés en direct à votre application. Cela nous permet de diffuser notre connection par exemple sur youtube ou twitch à l'aide de par exemple OBS Studio qui prend en charge les protocoles vu précédement et qui permet par un server de médiation comme Janus ou Kurento de diffuser notre connection WebRTC.

C'est protocol sont donc interessant pour faire du streaming en direct du débat en live sur les célèbres plateformes de streaming comme youtube ou twitch.
