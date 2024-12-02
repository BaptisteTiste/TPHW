const express = require('express');
const mysql = require('mysql2');
const ModbusRTU = require('modbus-serial');


const app = express();
const PORT = process.env.PORT || 3001;

// Connexion à la base de données MariaDB
const connection = mysql.createConnection({
    host: 'mariadb-container', // Nom du service défini dans docker-compose.yml
    user: 'root',
    password: '1234', // Mot de passe défini dans docker-compose.yml
    database: 'TP' // Nom de la base de données
});

// Tester la connexion à MariaDB
connection.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à MariaDB:', err);
        return;
    }
    console.log('Connecté à la base de données MariaDB');
});

// Connexion à l'automate
const client = new ModbusRTU();
client.connectTCP("172.16.1.24", { port: 502 })
    .then(() => {
        console.log('Connecté à l\'automate');
    })
    .catch((err) => {
        console.error('Erreur de connexion à l\'automate:', err);
    });

    

// Fonction pour lire la variable depuis l'automate et mettre à jour la base de données
async function updateDatabase() {
    try {
        // Lire l'état de la variable %M602 (Voyant Rouge)
        const data = await client.readCoils(602, 1);
        const etat = data.data[0] ? 1 : 0; // Convertir en 0 ou 1
        console.log('Valeur lue:', etat);

        // Insérer ou mettre à jour la base de données
        const sql = `
            INSERT INTO variables (nom, etat) 
            VALUES ('VoyantRouge', ?) 
            ON DUPLICATE KEY UPDATE etat = ?;
        `;
        connection.query(sql, [etat, etat], (err) => {
            if (err) {
                console.error('Erreur lors de la mise à jour de la base:', err);
            } else {
                console.log('Base de données mise à jour avec succès');
            }
        });
    } catch (err) {
        console.error('Erreur lors de la lecture de l\'automate:', err);
    }
}

// Actualiser la base de données toutes les 0.5 secondes
setInterval(updateDatabase, 2000);

// Route pour tester le backend
app.get('/', (req, res) => {
    res.send('Backend opérationnel');
});

// Route pour récupérer les variables depuis la base de données
app.get('/variables', (req, res) => {
    const sql = 'SELECT * FROM variables;';
    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des variables:', err);
            res.status(500).send('Erreur serveur');
        } else {
            res.json(results);
        }
    });
});

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
