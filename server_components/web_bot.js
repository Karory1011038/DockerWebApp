process.env.NTBA_FIX_319 = 1;
process.env.NTBA_FIX_350 = 0;
const TelegramBot = require('node-telegram-bot-api');

const webAppUrl = 'https://webappbot.website'
const TOKEN = '5903716328:AAGaHW8mLMH1BkE-plgthR-MNpmUBAwkc3E';
const bot = new TelegramBot(TOKEN, {polling: true});
bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.message.chat.id, "Welcome to our bot for top-quality weed! We have a wide selection of strains to choose from, and our prices are unbeatable. Get ready to elevate your smoking experience to new heights with us!",{
            reply_markup: {
                keyboard: [
                    [{text: 'Get your weed here', web_app: {url: webAppUrl}}]
                ],
                inline_keyboard: [
                    [{text: 'Browse our selection', web_app: {url: webAppUrl}}]
                ]
            }
        });
});


bot.on('message', (msg) => {
    if (msg.text) {
        // homeMsg(bot, msg)
    }
})

module.exports = {
    bot
}
