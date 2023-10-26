const express = require("express");
const app = express();
const fs = require("fs");
const https = require("https");

process.env.port = 4001;

const llavePrivada = fs.readFileSync("C:/Users/erick/private.key");
const certificado = fs.readFileSync("C:/Users/erick/certificate.crt");
const credenciales = {
    key: llavePrivada,
    cert: certificado,
    passphrase: "erickson12" //passwd de la llave privada usado en la creación del certificado
};
const httpsServer = https.createServer(credenciales, app);
app.get('/index', (req, res) => {
    res.sendFile(__dirname + '/index.html'); // Ruta al archivo HTML que creaste
});


httpsServer.listen(process.env.port, () => {
    console.log('Servidor https escuchando por el puerto:', process.env.port);
}).on('error', err => {
    console.log('Error al inciar el servidor:', err);
});