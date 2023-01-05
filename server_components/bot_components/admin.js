const db = require('../database.js');

let currentListAdmins = []


async function showAdmin(bot, chatId, row) {
    try {
        const r = await bot.sendMessage(chatId, `Name: ${row.name}\nID: ${row.id_tg}`, {
            caption: `Name: ${row.name}\nPrice: ${row.price}\nDescription:${row.properties}`,
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: 'Delete',
                            callback_data: `confirm_delete_admin_${row.id}`
                        }
                    ]
                ]
            }
        });
        currentListAdmins.push({item: row.id, message: r.message_id});
        return r;
    } catch (err) {
        bot.sendMessage(chatId, 'Error sending admin: ' + err.message);
    }
}

async function showAdmins(bot, chatId) {
    try {
        const rows = await db.getAllAdmins();
        if (rows.length == 0) {
            bot.sendMessage(chatId, 'There are no admins in the database.', {
                reply_markup: {
                    inline_keyboard: [[
                        {
                            text: 'Home',
                            callback_data: '/start'
                        },
                    ]]
                }
            });
        } else {
            currentListAdmins = [];
            const sortedRows = rows.sort((a, b) => parseFloat(a.id) - parseFloat(b.id));
            for (const row of sortedRows) {
                const result = await showAdmin(bot, chatId, row);
                if (result) {
                    currentListAdmins.push({item: row.id, message: result.message_id});
                }
            }
            bot.sendMessage(chatId, 'All admins shown', {
                reply_markup: {
                    inline_keyboard: [[
                        {
                            text: 'Home',
                            callback_data: '/start'
                        },
                    ]]
                }
            });
        }
    } catch (err) {
        console.error(err.message);
    }
}


const createAdminDialog = (bot, chatId) => {
    const askName = () => {
        bot.sendMessage(chatId, 'Enter the name of the admin:', {
            reply_markup: {
                force_reply: true,
            },
        }).then((sentMessage) => {
            const messageId = sentMessage.message_id;
            bot.onReplyToMessage(chatId, messageId, (message) => {
                const name = message.text;
                askTgId(name);
            });
        });
    };

    const askTgId = (name) => {
        bot.sendMessage(chatId, 'Enter the Telegram ID of the admin:', {
            reply_markup: {
                force_reply: true,
            },
        }).then((sentMessage) => {
            const messageId = sentMessage.message_id;
            bot.onReplyToMessage(chatId, messageId, (message) => {
                const tgId = message.text;
                createAdmin(name, tgId);
            });
        });
    };

    const createAdmin = (name, tgId) => {
        db.addAdmin(name, tgId)
            .then(() => {
                bot.sendMessage(chatId, 'Admin created successfully!', {
                    reply_markup: {
                        inline_keyboard: [[
                            {
                                text: 'Home',
                                callback_data: '/start'
                            },]]
                    }
                });
            })
            .catch((err) => {
                console.error(err.message);
            });
    };

    askName();
};

function confirmDeleteAdmin(bot, chatId, id) {
    db.getAdmin(id)
        .then((admin) => {
            if (!admin) {
                bot.sendMessage(chatId, 'Admin not found.');
                return;
            }
            bot.sendMessage(chatId, `Are you sure you want to delete the admin "${admin.name}"?`, {
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                text: 'Yes',
                                callback_data: `delete_admin_${id}`
                            },
                            {
                                text: 'No',
                                callback_data: `cancel_delete`
                            }
                        ]
                    ]
                }
            });
        })
        .catch((err) => {
            console.error(err.message);
        });
}

const deleteAdmin = (bot, msg, id) => {
    const chatId = msg.chat.id
    const msgId = msg.message_id
    db.getAdmin(id).then(row => {
        if (!row) {
            bot.sendMessage(chatId, 'Admin not found.');
            return;
        }
        db.deleteAdmin(id).then(() => {
            bot.deleteMessage(chatId, currentListAdmins.find(el => el.item == id).message)
                .then(() => {
                    bot.deleteMessage(chatId, msgId)
                    bot.sendMessage(chatId, 'Admin deleted successfully!', {
                        reply_markup: {
                            inline_keyboard: [[
                                {
                                    text: 'Home',
                                    callback_data: '/start'
                                },]]
                        }
                    });
                })
                .catch((error) => {
                });
        }).catch(err => {
            console.error(err.message);
        });
    }).catch(err => {
        console.error(err.message);
    });
};

function isAdmin(id) {
    return new Promise((resolve, reject) => {
        db.getAdminByTg(id)
            .then((row) => {
                if (row) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}


module.exports = {
    showAdmins,
    isAdmin,
    createAdminDialog,
    confirmDeleteAdmin,
    deleteAdmin,
};
