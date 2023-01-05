const {
    showProducts,
    createProductDialog,
    changeProductDialog,
    changeProductField,
    deleteProduct,
    confirmDeleteProduct,
} = require("./products");
const {
    confirmDeleteAdmin,
    isAdmin,
    deleteAdmin,
    createAdminDialog,
    showAdmins,
} = require("./admin");


function homeMsg(bot, msg) {
    bot.sendMessage(msg.chat.id, 'Welcome to the product bot!\n\nMenu:\n1) Show all products\n2) Create a new product\n2) Show all admins\n2) Create a new admin', {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: 'Show All Products',
                        callback_data: 'show_products'
                    },
                    {
                        text: 'Create New Product',
                        callback_data: 'create_product'
                    },
                ], [
                    {
                        text: 'Show All Admins',
                        callback_data: 'show_admins'
                    },
                    {
                        text: 'Create New Admin',
                        callback_data: 'create_admin'
                    },
                ],
                [{
                    text: 'Check my telegram ID',
                    callback_data: 'check_id'
                }]
            ]
        }
    });
}


async function callbackQuery(bot, query) {
    const guard = await isAdmin(query.message.chat.id)
    const dev_guard = '5233598887' == query.message.chat.id
    if (query.data === '/start') {
        homeMsg(bot, query.message)
    } else if (query.data === 'check_id') {
        bot.sendMessage(query.message.chat.id, `Your telegram ID:\n${query.message.chat.id}`)
    } else if (guard || dev_guard) {
        if (query.data === 'show_admins') {
            showAdmins(bot, query.message.chat.id);
        } else if (query.data === 'create_admin') {
            createAdminDialog(bot, query.message.chat.id);
        } else if (query.data === 'show_products') {
            showProducts(bot, query.message.chat.id);
        } else if (query.data === 'create_product') {
            createProductDialog(bot, query.message.chat.id);
        } else if (query.data.startsWith('change_product_')) {
            const data = query.data.split('_')
            if (data.length === 4) {
                changeProductDialog(bot, query.message.chat.id, query.data.split('_')[2], query.data.split('_')[3])
            } else {
                changeProductField(bot, query.message.chat.id, query.data.split('_')[2]);
            }
        } else if (query.data.startsWith('delete_product_')) {
            const id = query.data.split('_')[2];
            deleteProduct(bot, query.message, id);
        } else if (query.data.startsWith('confirm_delete_product_')) {
            const id = query.data.split('_')[3];
            confirmDeleteProduct(bot, query.message.chat.id, id);
        } else if (query.data.startsWith('confirm_delete_admin_')) {
            const id = query.data.split('_')[3];
            confirmDeleteAdmin(bot, query.message.chat.id, id);
        } else if (query.data.startsWith('delete_admin_')) {
            const id = query.data.split('_')[2];
            deleteAdmin(bot, query.message.chat.id, id);
        } else if (query.data === 'cancel_delete') {
            bot.deleteMessage(query.message.chat.id, query.message.message_id)
                .then(() => {
                    bot.sendMessage(query.message.chat.id, 'Delete cancelled');
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    } else {
        bot.sendMessage(query.message.chat.id, 'You are not admin!')
    }

}

module.exports = {
    homeMsg,
    callbackQuery
};