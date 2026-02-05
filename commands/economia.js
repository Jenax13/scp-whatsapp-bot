const eco = require("../utils/economia");

module.exports = async function(sock, msg, texto) {

    const jid = msg.key.remoteJid;
    const usuario = msg.key.participant || jid;

    if (texto === "!saldo") {

        const datos = eco.obtenerUsuario(usuario);

        await sock.sendMessage(jid, {
            text:
`📊 Cuenta Fundación SCP

💳 Créditos: ${datos.creditos}
🧪 Muestras: ${datos.muestras}
📄 Autorizaciones: ${datos.autorizaciones}`
        });
    }

    // Trabajo diario
    if (texto === "!trabajar") {

        const recompensa = Math.floor(Math.random() * 50) + 10;

        eco.agregarCreditos(usuario, recompensa);

        await sock.sendMessage(jid, {
            text: `Has completado una misión y ganaste ${recompensa} créditos SCP`
        });
    }

};
