const fs = require("fs");

function crearNuevoBot() {

    const data = JSON.parse(fs.readFileSync("./bots.json"));

    data.ultimoBot++;

    const nombre = `SCP-001-${data.ultimoBot}`;

    data.bots.push(nombre);

    fs.writeFileSync("./bots.json", JSON.stringify(data, null, 2));

    return nombre;
}

module.exports = { crearNuevoBot };
