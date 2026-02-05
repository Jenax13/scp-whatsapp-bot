const { spawn } = require("child_process");
const { crearNuevoBot } = require("./utils/botCounter");

function crearSubBot() {

    const nombre = crearNuevoBot();

    spawn("node", ["subBot.js", nombre], {
        stdio: "inherit"
    });

    return nombre;
}

module.exports = { crearSubBot };
