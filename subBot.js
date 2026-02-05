const economiaCmd = require("./commands/economia");

sock.ev.on("messages.upsert", async ({ messages }) => {

    const msg = messages[0];
    if (!msg.message) return;

    const texto =
        msg.message.conversation ||
        msg.message.extendedTextMessage?.text;

    const jid = msg.key.remoteJid;

    if (!texto) return;

    // 👇 ECONOMÍA SCP
    await economiaCmd(sock, msg, texto);


    // Comando SCP básico
    if (texto === "!scp") {

        await sock.sendMessage(jid, {
            text: `Unidad auxiliar ${nombre} operativa`
        });

    }

});
