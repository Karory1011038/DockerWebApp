process.env.NTBA_FIX_319 = 1;
process.env.NTBA_FIX_350 = 0;
const TelegramBot = require('node-telegram-bot-api');

const {
    homeMsg,
    callbackQuery,
} = require('./bot_components/functions');

const TOKEN = process.env.ADMIN_BOT_TOKEN;
const bot = new TelegramBot(TOKEN, {polling: true});
// Initialize database and create products table if it doesn't exist


bot.onText(/\/start/, (msg) => {
    homeMsg(bot, msg)
});


bot.on('callback_query', query => callbackQuery(bot,query));


bot.on('message', (msg) => {
    if (msg.text) {
        // homeMsg(bot, msg)
    }
})

module.exports = {
    bot
}
