const qrcode = require("qrcode-terminal");
const { Client, LocalAuth, MessageMedia } = require("whatsapp-web.js");
const fs = require("fs");
const mime = require("mime-types");
const {
  sendMsgToGroup,
  currentTime,
  getRoutine,
  commandList,
} = require("./src/utils");

var alreadySentMsg = false;
const customId = "client-id";
const authStrategy = new LocalAuth({ clientId: customId });

const worker = `${authStrategy.dataPath}/session-${customId}/Default/Service Worker`;

if (fs.existsSync(worker)) {
  fs.rmdirSync(worker, { recursive: true });
}

const client = new Client({
  authStrategy,
});

client.initialize();

client.on("loading_screen", (percent, message) => {
  console.log("LOADING SCREEN", percent, message);
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready!");
  sendMsgToGroup("Bot is ready!", client, "Gym");

  const interval = () => {
    const hour = currentTime();
    if (hour == 1) {
      alreadySentMsg = false;
    }
    if (hour == 6) {
      const { routine, bool } = getRoutine(alreadySentMsg);
      alreadySentMsg = bool;
      sendMsgToGroup("Buenos dias!", client, "Gym");
      sendMsgToGroup(routine, client, "Gym");
    }
    setTimeout(interval, 3600000);
  };
  interval();
});

client.on("message", (msg) => {
  //command list
  commandList(msg);

  if (msg.body === "!rutina") {
    const { routine, bool } = getRoutine(alreadySentMsg);
    alreadySentMsg = bool;
    msg.reply(routine);
  }

  if (msg.body === "!sticker") {
    if (msg.hasMedia) {
      msg.downloadMedia().then((media) => {
        if (media) {
          const mediaPath = "./downloaded-media/";

          if (!fs.existsSync(mediaPath)) {
            fs.mkdirSync(mediaPath);
          }

          const extension = mime.extension(media.mimetype);

          const filename = new Date().getTime();

          const fullFilename = mediaPath + filename + "." + extension;

          // console.log("se envio archivo tipo:", extension);
          if (extension === "mp4") {
            // console.log("");
            //gif
            try {
              fs.writeFileSync(fullFilename, media.data, {
                encoding: "base64",
              });
              // console.log("File downloaded successfully!", fullFilename);
              // console.log(fullFilename);
              MessageMedia.fromFilePath((filePath = fullFilename));
              client.sendMessage(
                msg.from,
                new MessageMedia(media.mimetype, media.data, filename),
                {
                  sendMediaAsSticker: true,
                  stickerAuthor: "Pantunfla12",
                  stickerName: "Sticker",
                }
              );
              fs.unlinkSync(fullFilename);
              // console.log(`File Deleted successfully!`);
            } catch (err) {
              // console.log("Failed to save the file:", err);
              // console.log(`File Deleted successfully!`);
            }

            //end gif
          } else {
            // Save to file
            try {
              fs.writeFileSync(fullFilename, media.data, {
                encoding: "base64",
              });
              // console.log("File downloaded successfully!", fullFilename);
              // console.log(fullFilename);
              MessageMedia.fromFilePath((filePath = fullFilename));
              client.sendMessage(
                msg.from,
                new MessageMedia(media.mimetype, media.data, filename),
                {
                  sendMediaAsSticker: true,
                  stickerAuthor: "Pantunfla12",
                  stickerName: "Sticker",
                }
              );
              fs.unlinkSync(fullFilename);
              // console.log(`File Deleted successfully!`);
            } catch (err) {
              // console.log("Failed to save the file:", err);
              // console.log(`File Deleted successfully!`);
            }
          }
        }
      });
    } else {
      msg.reply(`send image with caption *!sticker* `);
    }
  }

  if (msg.body === "-sticker") {
    msg.reply(
      "ya no se usa ese comando, usa *!comandos* para saber cuales son los comandos disponibles"
    );
  }
});

//read my own messages

client.on("message_create", (msg) => {
  if (msg.fromMe) {
    //command list
    commandList(msg);

    if (msg.body === "!rutina") {
      const { routine, bool } = getRoutine(alreadySentMsg);
      alreadySentMsg = bool;
      msg.reply(routine);
    }

    if (msg.body === "!sticker") {
      if (msg.hasMedia) {
        msg.downloadMedia().then((media) => {
          if (media) {
            const mediaPath = "./downloaded-media/";

            if (!fs.existsSync(mediaPath)) {
              fs.mkdirSync(mediaPath);
            }

            const extension = mime.extension(media.mimetype);

            const filename = new Date().getTime();

            const fullFilename = mediaPath + filename + "." + extension;

            // console.log("se envio archivo tipo:", extension);
            if (extension === "mp4") {
              // console.log("");
              //gif
              try {
                fs.writeFileSync(fullFilename, media.data, {
                  encoding: "base64",
                });
                // console.log("File downloaded successfully!", fullFilename);
                // console.log(fullFilename);
                MessageMedia.fromFilePath((filePath = fullFilename));
                client.sendMessage(
                  msg.from,
                  new MessageMedia(media.mimetype, media.data, filename),
                  {
                    sendMediaAsSticker: true,
                    stickerAuthor: "Pantunfla12",
                    stickerName: "Sticker",
                  }
                );
                fs.unlinkSync(fullFilename);
                // console.log(`File Deleted successfully!`);
              } catch (err) {
                // console.log("Failed to save the file:", err);
                // console.log(`File Deleted successfully!`);
              }

              //end gif
            } else {
              // Save to file
              try {
                fs.writeFileSync(fullFilename, media.data, {
                  encoding: "base64",
                });
                // console.log("File downloaded successfully!", fullFilename);
                // console.log(fullFilename);
                MessageMedia.fromFilePath((filePath = fullFilename));
                client.sendMessage(
                  msg.from,
                  new MessageMedia(media.mimetype, media.data, filename),
                  {
                    sendMediaAsSticker: true,
                    stickerAuthor: "Pantunfla12",
                    stickerName: "Sticker",
                  }
                );
                fs.unlinkSync(fullFilename);
                // console.log(`File Deleted successfully!`);
              } catch (err) {
                // console.log("Failed to save the file:", err);
                // console.log(`File Deleted successfully!`);
              }
            }
          }
        });
      } else {
        msg.reply(`send image with caption *!sticker* `);
      }
    }
  }
});
