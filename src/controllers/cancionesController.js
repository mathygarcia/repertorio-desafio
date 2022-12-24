const fs = require('fs');
const path = require('path');
const repertorio = require('../data/repertorio.json')
console.log(repertorio)

const controlador = {

    show: (req, res) => {
        //leyendo archivos CANCIONES . json
        const archivoCanciones = JSON.parse(fs.readFileSync(require.resolve('../data/repertorio.json')));
        //imprimir en archivo json 
        res.json(archivoCanciones);
    },

    create: (req, res) => {

        //leyendo archivos CANCIONES . json
        const archivoCanciones = JSON.parse(fs.readFileSync(require.resolve("../data/repertorio.json")));
        //creando objeto
        const nuevaCancion = {
            id: req.body.id,
            titulo: req.body.titulo,
            artista: req.body.artista,
            tono: req.body.tono
        };

        //guardo cancion
        archivoCanciones.push(nuevaCancion);

        //sobreescribo cancion
        fs.writeFileSync(require.resolve("../data/repertorio.json"), JSON.stringify(archivoCanciones, null, ' '));
        res.json(archivoCanciones);
    },

    modify: (req, res) => {
        const { id } = req.params
        const cancion = req.body
        //leer archivo
        const archivoCanciones = JSON.parse(fs.readFileSync(require.resolve("../data/repertorio.json")));
        //buscar archivo
        const index = archivoCanciones.findIndex(p => p.id == id)
        //reemplazar archivo
        archivoCanciones[index] = cancion;
        //volver a guardar
        fs.writeFileSync(require.resolve("../data/repertorio.json"), JSON.stringify(archivoCanciones, null, ' '));
        res.json(archivoCanciones);
    },
    remove: (req, res) => {
        //leer archivo
        const { id } = req.params
        const archivoCanciones = JSON.parse(fs.readFileSync(require.resolve("../data/repertorio.json")));
        //buscar archivo
        const index = archivoCanciones.findIndex(p => p.id == id)
        //removerlo
        archivoCanciones.splice(index, 1)
        //volver a guardar
        fs.writeFileSync(require.resolve("../data/repertorio.json"), JSON.stringify(archivoCanciones));
        res.json(archivoCanciones);
    }
}

module.exports = controlador;