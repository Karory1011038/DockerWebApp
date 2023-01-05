process.env.NTBA_FIX_319 = 1;
process.env.NTBA_FIX_350 = 0;
const TelegramBot = require('node-telegram-bot-api');

const webAppUrl = 'https://webappbot.website'
const TOKEN = '5903716328:AAGaHW8mLMH1BkE-plgthR-MNpmUBAwkc3E';
const bot = new TelegramBot(TOKEN, {polling: true});


bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, "Hey there! Looking for some fire weed? We've got you covered. Check out our selection and elevate your smoking game.", {
        reply_markup: {
            keyboard: [
                [{text: 'Get your weed here', web_app: {url: webAppUrl}}]
            ],
        }
    }).then(r => console.log(r))
        .catch(r => console.log(r))
    bot.sendMessage(msg.chat.id, "Click here", {
        reply_markup: {
            inline_keyboard: [
                [{text: "Shop 'til you drop, baby", web_app: {url: webAppUrl}}]
            ],
        }
    }).then(r => console.log(r))
        .catch(r => console.log(r))
});


bot.on('message', (msg) => {
    if (msg.text) {
        // homeMsg(bot, msg)
    }
})

module.exports = {
    bot
}
