# Documentation Technique

## Contact

- Albadri Rami
- rami.albdr@eduge.ch

## Résumé

Debate est une application web qui est disponible aussi bien sur pc que sur un appareil mobile. Elle a pour but de permettre de crée un environnement de débat sain et civilisé.

L'application propose des débats écrit et vidéo. les débats vidéo sont réalisé en utilisant une camera et un micro. Les débats écrit sont sous la forme d'une discussion dans le style de whatsapp par exemple mais avec les régles du débat que j'expliquerai plus tard dans cette documentation.

## Contexte

Cette documentation technique a été réaliser dans le cadre de mon travail de diplome de dernière année de Technicien ES informatique au CFPTI à Geneve.

## Introduction

Depuis l'arrivé des réseaux sociaux, les gens donne leur avis et d'autre personne réponde. C'est techniquement une forme de débat et donc les réseaux sociaux sont déja un bon moyen de débattre mais il y a un problème, les gens ne sont pas forcement civilisé et ne respecte pas les règles de base du débat. C'est pour cela que je souhaite créer une plateforme qui est concu dans l'objectif de débattre sainement.

A ma grande surprise je n'est pas trouvé de platforme en ligne qui permet de réaliser des débats vidéo en ligne. D'ou mon idée de faire un site qui propose au débatteur de tout niveau d'avoir un débat civilisé.

## Analyse de l'existant

C'est un peu compliqué de faire une analyse de l'existant car d'après mes recherche, il n'existe aucun site qui propose des débats vidéo en ligne. Il y avait à l'époque un site nommé 'deeyoon' qui proposait des débats video mais il n'est plus en ligne.
Il avait un look vraiment ancien et ne donnait pas envie d'y aller.

Voici une image que j'ai trouvé du site :

![Deeyoon](./img/existant.png)

Le site permettait de créer des débats asser simple sans régle, juste avec un timer et un system de votation.
Il y a cependant plusieurs site qui propose des débat par écrit comme 'Kialo'.

![Kialo](./img/existant2.png)

Il y a aussi des site qui propose des débat écrit comme 'DebateArt'.

![DebateArt](./img/existant3.png)

Le system de création de débat sur DebateArt se fait de la manière suivante :

![DebateArt](./img/existantCreation.png)

## Planning

Voici le planning prévisionnel du projet qui à été réaliser avec Excel.

### Planning prévisionnel

![Planning](./img/planningPDA.png)

### Planning réel

### Explication des différences

## Trello

Trello me permet de gérer mon projet en notant les différentes taches et leur status.

Mon trello comporte 3 colonnes:

- A faire
- En cours
- Terminé

## Journal de bord

Le journal de bord m'a permis de noté petit a petit les différentes taches que j'ai effectué, les problèmes que j'ai rencontré et les solutions que j'ai trouvé.

Voici un exemple de la structure de mon journal de bord :

### 28 Février 2023

** Objectif de la journée : ** Avancé la documentation et le projet

** 8H15: ** Je dois avancé la documentation car j'ai tout de meme pris un peu de retard

** 9H25: ** J'ai rencontréun probleme mais ...

** 10H55: ** ...

** 11H40: ** ...

** Bilan de la journée : ** J'ai avancé la documentation

## Environnement

### Matériel

Pour le matériel je dispose de :

- 3 écran HP
- Un ordinateur
- Un clavier
- Une souris
- Un micro
- Une webcam

### Logiciel

Pour le logiciel je dispose de :

### Visual Studio Code

Visual studio code est mon IDE favorie qui met a disposition de nombreuse extention qui me permettent de travailler plus efficacement.

## Technologies

Dans mon projet j'ai besoin de faire de la communication video, un system de chat, un system de connexion et d'inscription, une base de donnée et encore plein d'autres choses. Pour faire tout ça j'ai besoin de choisir les bonnes technologies.

### WebRTC

WebRTC est une technologie qui permet de faire de la communication en temps réel entre deux navigateur. Elle permet de faire de la vidéoconférence, de la visioconférence, de la messagerie instantanée, de la diffusion de contenu en temps réel. Dans mon cas je l'utilise pour faire de la vidéo.

### Socket.io

Socket.io est une bibliothèque qui permet de faire de la communication en temps réel entre le serveur et le client.

### React

Pour le front-end j'ai choisi React qui est une biliothéque JavaScript open source développer par meta. La bibliothéque React est utilisé pour construire des interfaces utilisateurs. Je l'est choisi elle est pas vueJS ou Angular car je l'avais déja utilisé, elle est plus populaire, elle a une communauté plus importante et elle est utilisé dans de nombreuse entreprise.

### NodeJS

Pour le back-end j'ai choisi NodeJS qui est un environnement d'éxécution JavaScript coté serveur. Il est utilisé pour créer des serveur web, des applications web, des applications mobiles, des API et plus encore. Dans mon cas je l'utilise pour l'API et le serveur web.

### ExpressJS

Express est le framework web le plus populaire pour NodeJS. Je l'utilise pour créer mon API.

### mangoDB

J'ai une base de donnée mangoDB qui contient les topics, les utilisateurs et les messages.
Pour effectuer un CRUD sur les topics j'ai une API qui permet de faire les requetes.

### Socket.io

Socket.io est une bibliothéque qui permet de faire de la communication en temps réel entre le serveur et le client. Je l'utilise pour faire le chat, échanger les informations entre utilisateurs afin établir la connexion vidéo.

## Installation

### Back-end

#### Prérequis

Il faut avoir installé sur sa machine NodeJS qui se trouve sur le site officiel de NodeJS.

#### Installation

Pour initialisé le back-end NodeJs, il faut se placer à la racine du projet et lancer la commande suivante :

```bash
npm init
```

Cette commande va créer le fichier package.json qui va contenir les dépendances du projet.

A la suite de cette commande, il faut installer les dépendances du projet avec la commande suivante :

```bash
npm install <nomDeLaDependence>
```

Il faut crée un fichier server.js qui va étre lancer au moment de l'éxécution du serveur qui se lance avec la commande suivante :

```bash
npm start
```

#### Dépendances

- express
- cors
- nodemon
- https
- socket.io

### Front-end

#### Prérequis

Il faut avoir installé sur sa machine NodeJS qui se trouve sur le site officiel de NodeJS.

#### Installation

Pour initialisé le front-end React, il faut se placer dans le dossier 'client' et lancer la commande suivante :

```bash
npx create-react-app <nomDuProjet>
```

Cette commande va créer le dossier du projet React avec des fichiers de base.

Comme pour le back-end, il faut installer les dépendances du projet avec la commande suivante :

```bash
npm install <nomDeLaDependence>
```

Pour lancer le projet React, il faut se placer dans le dossier du client et lancer la commande suivante :

```bash
npm start
```

#### Dépendances

- socket.io-client
- react-router-dom
- uuid

## Analyse fonctionelle

Lorsque qu'on arrive sur le site on arrive sur la page principale qui présente les topics, on peut cliquer sur les topics pour avoir plus d'informations a leur propos.
![Accueil](./img/officala.png)

Lorsque l'on clique sur le bouton "create" le forumlaire s'ouvre et on peut y créer un topic.
![Formulaire](./img/Form.png)

L'application est responsive, elle s'adapte a la taille de l'écran notamment sur les mobiles.

![Mobile](./img/mobile.png)

### Cas d'utilisation

L'application propose une navigation simple et intuitive. Il est assser facile pour n'importe qui de s'y retrouver.

![Cas d'utilisation](./img/useCase.png)

### Structure du projet

L'application utilise la MERN stack (MongoDB, Express, React, Node.js).

Voici comment ces différente technologie communique entre elle.

![Structure](./img/structure.png)

### Droit d'accès

Il y a 3 types d'utilisateurs:

![Droit d'accès](./img/Droit.png)

Chaque utilisateur a des droits d'accès différents.

Droit d'accès pour l'administrateur:

![Droit d'accès](./img/admin.png)

Droit d'accès pour les utilisateur inscrits:

![Droit d'accès](./img/user.png)

Droit d'accès pour les utilisateurs non inscrits:

![Droit d'accès](./img/visitor.png)

## Régle du débat

### Spécificité du débat vidéo

### Spécificité du débat écrit

### Diagramme de classe

## Analyse organique

## Github

Le githb du projet se trouve à l'adresse suivante [github](https://github.com/AlbadriR/PDA_Project)

## Structure de l'application

- client
  - public
  - src
    - components
    - Button
    - Contexts
    - Languages
    - Layout
    - Topics
  - pages
    App.js
    index.js

## Cheat Sheet de l'API

### Topics

#### GET

- /api/topics

  - Récupère tous les topics

- /api/topics/:id
  - Récupère un topic en fonction de son id

#### POST

- /api/topics
  - Créer un topic

#### PUT

- /api/topics/:id
  - Met à jour un topic en fonction de son id

#### DELETE

- /api/topics/:id
  - Supprime un topic en fonction de son id

## Tests

## Conclusion

## Glosaire

### Topics

Un topic c'est un sujet de discussion, il peut être ouvert par n'importe quel personne qui a un compte.
