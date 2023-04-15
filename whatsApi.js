const qrcode = require("qrcode-terminal");
const { Client, LocalAuth, MessageMedia } = require("whatsapp-web.js");
const fs = require("fs");
const mime = require("mime-types");
const { commandList } = require("./src/utils");
const noler = MessageMedia.fromFilePath("./audios/nolerGod.mp3");
const customId = "client-id";
const authStrategy = new LocalAuth({ clientId: customId });

const worker = `${authStrategy.dataPath}/session-${customId}/Default/Service Worker`;

if (fs.existsSync(worker)) {
  fs.rm(worker, { recursive: true }, (err) => {
    if (err) throw err;
  });
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

client.on("ready", async () => {
  console.log("Client is ready!");
  const groupName = "Parroquia";

  const group = await client.getChats().then((chats) => {
    return chats.find((chat) => {
      if (chat.isGroup && chat.name.includes(groupName)) {
        return true;
      }
      return false;
    });
  });

  if (group) {
    const groupId = group.id._serialized;
    const msg = "🔺Bot is ready!🔻";
    const groupChat = await client.getChatById(groupId);
    groupChat.sendMessage(msg);
  } else {
    console.log(
      `No se ha encontrado ningún grupo que contenga la palabra "${groupName}".`
    );
  }
});

client.on("message", async (msg) => {
  const contact = await msg.getContact();
  // if (contact.number === "5218717680408") {
  //   msg.reply("vayase a la verga viejo pendejo");
  // } else {
  //command list
  commandList(msg);

  if (msg.body === "!noler") {
    msg.reply(noler);
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
  // }
});

//read my own messages

client.on("message_create", (msg) => {
  if (msg.fromMe) {
    //command list
    commandList(msg);

    if (msg.body === "!noler") {
      msg.reply(noler);
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
