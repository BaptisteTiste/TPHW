 
Gestion des Variables Industrielles
Ce projet consiste en la gestion des variables d'un automate industriel, permettant de surveiller et de contrôler des variables telles que l'état de voyants lumineux via une interface web. Les données de ces variables sont récupérées à l'aide du protocole Modbus, puis stockées dans une base de données MariaDB. L'application permet de consulter les variables en temps réel via un frontend interactif.

Technologies utilisées
Backend : Node.js, Express.js, MySQL2 (pour la gestion de la base de données)
Base de données : MariaDB
Automate industriel : Modbus RTU (via le module modbus-serial)
Frontend : HTML, CSS, JavaScript
Conteneurisation : Docker (pour l'orchestration des services)
Installation
Prérequis
Docker et Docker Compose installés sur votre machine.
Node.js et npm installés (si vous souhaitez exécuter le backend localement sans Docker).
Déploiement avec Docker
Clonez le repository et placez-vous dans le répertoire du projet.

bash
Copier le code
git clone https://github.com/votre-utilisateur/votre-projet.git
cd votre-projet
Construire et lancer les conteneurs Docker : Ce projet utilise Docker Compose pour gérer le backend et la base de données.

bash
Copier le code
docker-compose up --build
Accéder à l'application :

Le backend sera accessible à l'adresse : http://localhost:3001
Le frontend sera accessible via un navigateur en accédant à http://localhost:3001
Configuration réseau
L'application est configurée pour fonctionner sur un réseau local. Pour accéder à l'application depuis un autre poste du réseau :

Assurez-vous que le port 3001 est ouvert et accessible sur la machine hôte.
Remplacez localhost par l'adresse IP de la machine hôte dans le code frontend (fetch('http://localhost:3001/variables')).
Modifiez la configuration Docker pour autoriser l'accès au port à partir du réseau local.
Lancer l'application manuellement
Si vous préférez ne pas utiliser Docker, vous pouvez exécuter l'application manuellement. Assurez-vous d'installer les dépendances suivantes :

bash
Copier le code
npm install
Ensuite, vous pouvez démarrer le backend avec la commande suivante :

bash
Copier le code
npm start
Le backend sera accessible sur http://localhost:3001.

Utilisation
Frontend : L'interface web permet d'ajouter ou de modifier les variables à surveiller (nom, adresse IP de l'automate, adresse Modbus et fréquence d'enregistrement).
Backend : Le backend récupère les valeurs des variables depuis l'automate via Modbus, puis les enregistre dans la base de données MariaDB.
Base de données : Les variables sont stockées dans une table appelée variables, avec leur nom et état (0 ou 1).
Ajouter une variable
Accédez à l'interface web.
Remplissez le formulaire avec les informations de la variable à ajouter.
Cliquez sur "Enregistrer". La variable sera automatiquement ajoutée à la base de données.
Consulter les variables
Les variables ajoutées peuvent être consultées dans le tableau des variables sur le frontend. Les valeurs sont mises à jour automatiquement toutes les 0.5 secondes.

Contribution
Les contributions sont les bienvenues. Pour proposer des changements importants, veuillez d'abord ouvrir un problème pour discuter des modifications envisagées.

Fork ce repository.
Créez une branche pour votre fonctionnalité : git checkout -b ma-nouvelle-fonctionnalite.
Commitez vos changements : git commit -am 'Ajout de ma nouvelle fonctionnalité'.
Poussez la branche : git push origin ma-nouvelle-fonctionnalite.
Créez une pull request.
Licence
Ce projet est sous licence MIT.
