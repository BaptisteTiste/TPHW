const express = require('express');
const mysql = require('mysql2');
const ModbusRTU = require('modbus-serial');
const app = express();
const PORT = process.env.PORT || 3001;

// Initialisation du pool de connexions MySQL
const pool = mysql.createPool({
    host: 'mariadb-container',
    user: 'root',
    password: '1234',
    database: 'TP',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
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
        const data = await client.readCoils(602, 1);
        const etat = data.data[0] ? 1 : 0;
        console.log('Valeur lue:', etat);

        const sql = `
            INSERT INTO variables (nom, etat) 
            VALUES (?, ?) 
            ON DUPLICATE KEY UPDATE etat = VALUES(etat);
        `;
        pool.query(sql, ['VoyantRouge', etat], (err) => {
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

// Route pour ajouter ou mettre à jour une variable
app.post('/variables', (req, res) => {
    const { nom, etat } = req.body;

    if (!nom || typeof etat === 'undefined') {
        return res.status(400).send('Nom et état sont requis');
    }

    const sql = `
        INSERT INTO variables (nom, etat) 
        VALUES (?, ?) 
        ON DUPLICATE KEY UPDATE etat = VALUES(etat);
    `;
    pool.query(sql, [nom, etat], (err) => {
        if (err) {
            console.error('Erreur lors de l insertion ou mise à jour de la variable:', err);
            res.status(500).send('Erreur serveur');
        } else {
            res.send('Variable ajoutée ou mise à jour avec succès');
        }
    });
});

// Actualiser la base de données toutes les 0.5 secondes
setInterval(updateDatabase, 500);

// Route pour tester le backend
app.get('/', (req, res) => {
    res.send('Backend opérationnel');
});

// Route pour récupérer les variables depuis la base de données
app.get('/variables', (req, res) => {
    const sql = 'SELECT * FROM variables;';
    pool.query(sql, (err, results) => {
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
