const { default: makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys");
const qrcode = require("qrcode-terminal");

async function iniciarBot() {

    const { state, saveCreds } = await useMultiFileAuthState("scp_session");

    const sock = makeWASocket({
        auth: state
    });

    sock.ev.on("creds.update", saveCreds);

    sock.ev.on("connection.update", ({ qr, connection }) => {

        if (qr) {
            qrcode.generate(qr, { small: true });
        }

        if (connection === "open") {
            console.log("☣️ Bot SCP conectado");
        }
    });

    sock.ev.on("messages.upsert", async ({ messages }) => {

        const msg = messages[0];
        if (!msg.message) return;

        const texto = msg.message.conversation ||
                      msg.message.extendedTextMessage?.text;

        const jid = msg.key.remoteJid;

        if (!texto) return;

        if (texto === "!scp") {
            await sock.sendMessage(jid, {
                text: "🔐 Fundación SCP activa"
            });
        }

    });

}

iniciarBot();
