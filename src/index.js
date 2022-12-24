//importo express
const express = require('express');
const cors = require('cors')
// use express
const app = express();

//importo el enrutador de indices
const indexRoutes = require('./routes/indexRoutes');

//leer archivos de la carpeta public
app.use(express.static(__dirname + '../public'));
app.use(cors())

// utilizar archivos a traves del body
app.use(express.json())

//ruta principal
app.use('/', indexRoutes);

// por si no existe rura
app.use('*', function (req, res) {
    res.send("Error. Intente nuevamente con otra ruta.");
});

//servicio que levanta servidor
app.listen(3000, console.log("¡Servidor encendido!"))
