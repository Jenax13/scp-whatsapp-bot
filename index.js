const {
  default: makeWASocket,
  useMultiFileAuthState,
  Browsers
} = require("@whiskeysockets/baileys");

async function iniciarBot() {

  const { state, saveCreds } = await useMultiFileAuthState("auth");

  const sock = makeWASocket({
    auth: state,
    browser: Browsers.macOS("SCP-001"),
    printQRInTerminal: true // QR SCP
  });

  sock.ev.on("creds.update", saveCreds);

  // 🔐 SISTEMA SCP DE VINCULACIÓN
  if (!sock.authState.creds.registered) {

    const numero = "573XXXXXXXXX"; // tu número completo

    const codigo = await sock.requestPairingCode(numero);

    console.log(`
====================================
🔒 SISTEMA DE AUTORIZACIÓN SCP
====================================

Objeto: SCP-001
Clasificación: THAUMIEL
Estado: Esperando vinculación

Código de Acceso:
>>> ${codigo} <<<

Ingrese este código en WhatsApp:
Dispositivos vinculados → Vincular con código
====================================
    `);
  }

  sock.ev.on("connection.update", (update) => {
    const { connection } = update;

    if (connection === "open") {
      console.log("🧪 SCP-001 ACTIVO Y CONTENIDO");
    }
  });

}

iniciarBot();
