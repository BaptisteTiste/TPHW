# Gestion des Variables Industrielles

Ce projet consiste en la gestion des variables d'un automate industriel, permettant de surveiller et de contrôler des variables telles que l'état de voyants lumineux via une interface web. Les données de ces variables sont récupérées à l'aide du protocole Modbus, puis stockées dans une base de données MariaDB. L'application permet de consulter les variables en temps réel via un frontend interactif.

## Technologies utilisées

- **Backend** : Node.js, Express.js, MySQL2 (pour la gestion de la base de données)
- **Base de données** : MariaDB
- **Automate industriel** : Modbus RTU (via le module `modbus-serial`)
- **Frontend** : HTML, CSS, JavaScript
- **Conteneurisation** : Docker (pour l'orchestration des services)

## Installation

### Prérequis

Avant de commencer, assurez-vous que vous avez les éléments suivants installés sur votre machine :

- **Docker et Docker Compose** : pour déployer l'application dans des conteneurs.
- **Node.js et npm** (si vous ne souhaitez pas utiliser Docker).

## Déploiement avec Docker

### Construire et lancer les conteneurs Docker

- **Clonez le repository et placez-vous dans le répertoire du projet.**
    git clone https://github.com/votre-utilisateur/votre-projet.git
    cd votre-projet
  
Ce projet utilise Docker Compose pour gérer le backend, la base de données MariaDB et les autres services.

- **Copier le code.**
  - docker-compose up --build

### Accéder à l'application

- Le backend sera accessible à l'adresse : http://localhost:3001
- Le frontend sera accessible via un navigateur en accédant à http://localhost:3001.

## Configuration réseau

**L'application est configurée pour fonctionner sur un réseau local. Pour accéder à l'application depuis un autre poste du réseau :**
- Assurez-vous que le port 3001 est ouvert et accessible sur la machine hôte.
- Remplacez localhost par l'adresse IP de la machine hôte dans le code frontend (par exemple, dans fetch('http://localhost:3001/variables')).
- Modifiez la configuration Docker pour autoriser l'accès au port à partir du réseau local.

## Utilisation

- **Frontend : L'interface web permet d'ajouter ou de modifier les variables à surveiller (nom, adresse IP de l'automate, adresse Modbus et fréquence d'enregistrement).**

- **Backend : Le backend récupère les valeurs des variables depuis l'automate via Modbus, puis les enregistre dans la base de données MariaDB.**

- **Base de données : Les variables sont stockées dans une table appelée variables, avec leur nom et état (0 ou 1).**

### Pour Ajouter une variable
  
- **Accédez à l'interface web.**

   -Remplissez le formulaire avec les informations de la variable à ajouter.

  -Cliquez sur "Enregistrer". La variable sera automatiquement ajoutée à la base de données.

### Routes disponibles

- GET / : Teste que le backend fonctionne correctement.

 - GET /variables : Récupère toutes les variables enregistrées dans la base de données et les affiche.

 - POST /variables : Permet d'ajouter une nouvelle variable ou de mettre à jour une variable existante.

 - DELETE /variables/{id} : Permet de supprimer une variable en spécifiant son id.


