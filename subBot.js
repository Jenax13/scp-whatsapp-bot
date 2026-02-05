const { default: makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys");
const qrcode = require("qrcode-terminal");

async function iniciarSubBot(nombre) {

    const { state, saveCreds } =
        await useMultiFileAuthState(`sessions/${nombre}`);

    const sock = makeWASocket({ auth: state });

    sock.ev.on("creds.update", saveCreds);

    sock.ev.on("connection.update", ({ qr, connection }) => {

        if (qr) {
            console.log(`QR para ${nombre}`);
            qrcode.generate(qr, { small: true });
        }

        if (connection === "open") {
            console.log(`${nombre} activo`);
        }
    });

    sock.ev.on("messages.upsert", async ({ messages }) => {

        const msg = messages[0];
        if (!msg.message) return;

        const texto =
            msg.message.conversation ||
            msg.message.extendedTextMessage?.text;

        const jid = msg.key.remoteJid;

        if (!texto) return;

        if (texto === "!scp") {

            await sock.sendMessage(jid, {
                text: `Unidad auxiliar ${nombre} operativa`
            });

        }

    });

}

const nombre = process.argv[2];
iniciarSubBot(nombre);
