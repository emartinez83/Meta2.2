const { Sequelize } = require('sequelize');
const Donadores = require('.//donadores'); // Asegúrate de utilizar la ruta correcta

// Crear una instancia de Sequelize con la configuración del archivo config.json
const sequelize = new Sequelize('meta2_2', 'root', 'erickson12', {
    host: 'localhost',
    dialect: 'mysql', // o el dialecto de tu base de datos
    // Otras opciones de configuración si es necesario
});

// Asociaciones con Proyectos si es necesario (ajusta esto según tus necesidades)

// Resto del código para crear un donador y asociarlo a un proyecto
Donadores.create({
    rfc: '1234',
    nombre: 'Pepe',
    imagen: 'url09',
    cantidadDonada: 230,
})
    .then((donador) => {
        console.log('Donador creado:', donador.toJSON());
    })
    .catch((error) => {
        console.log('Error al crear el donador:', error);
    });
