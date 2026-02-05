const fs = require("fs");

function obtenerData() {
    return JSON.parse(fs.readFileSync("./database/economia.json"));
}

function guardarData(data) {
    fs.writeFileSync("./database/economia.json", JSON.stringify(data, null, 2));
}

function crearUsuario(id) {

    const data = obtenerData();

    if (!data[id]) {
        data[id] = {
            creditos: 100,
            muestras: 0,
            autorizaciones: 0
        };
    }

    guardarData(data);
}

function agregarCreditos(id, cantidad) {

    const data = obtenerData();
    crearUsuario(id);

    data[id].creditos += cantidad;
    guardarData(data);
}

function quitarCreditos(id, cantidad) {

    const data = obtenerData();
    crearUsuario(id);

    data[id].creditos -= cantidad;
    guardarData(data);
}

function obtenerUsuario(id) {

    const data = obtenerData();
    crearUsuario(id);

    return data[id];
}

module.exports = {
    crearUsuario,
    agregarCreditos,
    quitarCreditos,
    obtenerUsuario
};
