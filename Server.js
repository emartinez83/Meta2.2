const express = require("express");
const app = express();
const fs = require("fs");
const https = require("https");
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
const jwt = require('jsonwebtoken'); // Agregamos la dependencia jsonwebtoken
const routes = require('./routes');

process.env.port = 4001;

// Configuración de Passport y sesión
app.use(session({ secret: 'tu_secreto', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Configuración de la estrategia de autenticación de Google
passport.use(new GoogleStrategy({
    clientID: 'tu_client_id',
    clientSecret: 'tu_client_secret',
    callbackURL: 'https://localhost:4001/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
    // Generamos un token JWT después de la autenticación exitosa
    const user = { id: profile.id, displayName: profile.displayName, email: profile.emails[0].value };
    const token = jwt.sign(user, 'tu_secreto', { expiresIn: '1h' }); // Cambia 'tu_secreto_secreto' por tu secreto
    return done(null, { user, token });
}));

// Serialización de usuario para almacenar en la sesión
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

// Agrega las rutas definidas en el archivo index.js
app.use('/', routes);

// Resto de tu código...
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
