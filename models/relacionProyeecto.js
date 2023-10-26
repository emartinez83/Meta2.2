const Proyecto = require('./models/proyecto'); // Asegúrate de utilizar la ruta correcta
const Donador = require('./models/donadores'); // Asegúrate de utilizar la ruta correcta

// Encontrar el proyecto al que deseas asociar el donador (reemplaza con el proyecto deseado)
Proyecto.findOne({
    where: {
        id: 1, // Reemplaza con el ID del proyecto deseado
    }
})
    .then((proyecto) => {
        if (proyecto) {
            // Encontrar el donador que deseas asociar (reemplaza con el donador deseado)
            Donador.findOne({
                where: {
                    id: 2, // Reemplaza con el ID del donador deseado
                }
            })
                .then((donador) => {
                    if (donador) {
                        // Asociar el donador al proyecto
                        proyecto.addDonador(donador)
                            .then(() => {
                                console.log('Donador asociado al proyecto:', proyecto.toJSON());
                            })
                            .catch((error) => {
                                console.error('Error al asociar donador al proyecto:', error);
                            });
                    } else {
                        console.error('El donador no se encontró.');
                    }
                })
                .catch((error) => {
                    console.error('Error al buscar el donador:', error);
                });
        } else {
            console.error('El proyecto no se encontró.');
        }
    })
    .catch((error) => {
        console.error('Error al buscar el proyecto:', error);
    });
