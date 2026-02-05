module.exports = {
    comando: "!menu",
    ejecutar: async (sock, jid) => {

        await sock.sendMessage(jid, {
            text: "📜 Menú SCP"
        });

    }
};
