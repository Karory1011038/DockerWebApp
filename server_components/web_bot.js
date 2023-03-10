process.env.NTBA_FIX_319 = 1;
process.env.NTBA_FIX_350 = 0;
const TelegramBot = require('node-telegram-bot-api');

const webAppUrl =  process.env.WEBAPPBOT_URL;
const TOKEN = process.env.WEB_BOT_TOKEN;
const bot = new TelegramBot(TOKEN, {polling: true});

function createOrderMessage(data) {
    let message = `Hello, ${data.user.username}! Your order includes the following items:\n`;
    data.items.forEach((item) => {
        message = message + `- ${item.name} x${item.count}\n`;
    });
    return message
}


async function handleSendData(data, callback) {
    try {
        const message = createOrderMessage(data);
        await bot.answerWebAppQuery(data.queryId, {
            type: 'article',
            id: data.queryId,
            title: 'Success',
            input_message_content: {
                message_text: message,
            },
        });
        callback(null, true);
    } catch (error) {
        callback(error, false);
    }
}

async function handleSendDataByButton(msg, data, callback) {
    try {
        let message = createOrderMessage(data)
        await bot.sendMessage(msg.chat.id, message);
        callback(null, true);
    } catch (error) {
        callback(error, false);
    }
}


bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, "Hey there! Looking for some fire weed? We've got you covered. Check out our selection and elevate your smoking game.", {
        reply_markup: {
            keyboard: [
                [{text: ' > press here to start shopping <', web_app: {url: webAppUrl}}]
            ],
        }
    }).then(r => console.log(r))
        .catch(r => console.log(r))
    bot.sendMessage(msg.chat.id, "click the window below to start", {
        reply_markup: {
            inline_keyboard: [
                [{text: "Shop 'til you drop, baby", web_app: {url: webAppUrl}}]
            ],
        }
    }).then(r => console.log(r))
        .catch(r => console.log(r))
});

bot.on('message', (msg) => {
    if (msg?.web_app_data?.data) {
        handleSendDataByButton(msg, JSON.parse(msg?.web_app_data?.data), (error, status) => {
            if (error) {
                // console.error(error);
            } else {
                console.log(`Data processing completed with status: ${status}`);
            }
        });
    }
});


module.exports = {
    bot,
    handleSendData
}
