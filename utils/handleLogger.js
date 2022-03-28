require('dotenv').config()
const { IncomingWebhook } = require("@slack/webhook");
const webHook = new IncomingWebhook(process.env.SLACK_WEBHOOK);
const loggerStream = {
    write: (message) => {
      webHook.send({
        text: message
      })
      console.log("Capturando el log", message);
    },
  };

  module.exports = loggerStream