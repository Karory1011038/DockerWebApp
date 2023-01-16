const fs = require('fs');
const request = require('request');

const db = require('../database.js');

let currentList = []

async function showProducts(bot, chatId) {
    try {
        const rows = await db.getAllProducts();
        if (!rows || rows.length === 0) {
            bot.sendMessage(chatId, "There are no products in the database.");
            return;
        }
        const sortedRows = rows.sort((a, b) => parseFloat(a.id) - parseFloat(b.id));
        const currentList = [];
        for (const row of sortedRows) {
            const result = await showProduct(bot, chatId, row);
            if (result) {
                currentList.push(result);
            }
        }
        await bot.sendMessage(chatId, 'All products shown', {
            reply_markup: {
                inline_keyboard: [[{
                    text: 'Home', callback_data: '/start'
                },]]
            }
        });
    } catch (err) {
        console.error(err.message);
    }
}

async function showProduct(bot, chatId, row) {
    try {
        let image;
        if (fs.existsSync(row.image)) {
            image = fs.readFileSync(row.image);
        } else {
            image = fs.readFileSync('images/img.png');
        }
        const r = await bot.sendPhoto(chatId, image, {
            caption: `Name: ${row.name}\nPrice: ${row.price}\nProperties:${row.properties}\nDescription:${row.description || 'Not specified'}`,
            reply_markup: {
                inline_keyboard: [[{
                    text: 'Change', callback_data: `change_product_${row.id}`
                }, {
                    text: 'Delete', callback_data: `confirm_delete_product_${row.id}`
                }]]
            }
        });
        return {...r, itemId: row.id};
    } catch (err) {
        bot.sendMessage(chatId, 'Error sending product: ' + err.message);
    }
}

const createProductDialog = (bot, chatId) => {
    const askName = () => {
        bot.sendMessage(chatId, 'Enter the name of the product:', {
            reply_markup: {
                force_reply: true,
            },
        }).then((sentMessage) => {
            const messageId = sentMessage.message_id;
            bot.onReplyToMessage(chatId, messageId, (message) => {
                const name = message.text;
                askPrice(name);
            });
        });
    };

    const askPrice = (name) => {
        bot.sendMessage(chatId, 'Enter the price of the product:', {
            reply_markup: {
                force_reply: true,
            },
        }).then((sentMessage) => {
            const messageId = sentMessage.message_id;
            bot.onReplyToMessage(chatId, messageId, (message) => {
                const price = message.text;
                askProperties(name, price);
            });
        });
    };

    const askProperties = (name, price) => {
        bot.sendMessage(chatId, 'Enter the properties of the product:', {
            reply_markup: {
                force_reply: true,
            },
        }).then((sentMessage) => {
            const messageId = sentMessage.message_id;
            bot.onReplyToMessage(chatId, messageId, (message) => {
                const properties = message.text;
                askDescription(name, price, properties);
            });
        });
    };

    const askDescription = (name, price, properties) => {
        bot.sendMessage(chatId, 'Enter the description of the product:', {
            reply_markup: {
                force_reply: true,
            },
        }).then((sentMessage) => {
            const messageId = sentMessage.message_id;
            bot.onReplyToMessage(chatId, messageId, (message) => {
                const description = message.text;
                askImage(name, price, properties, description);
            });
        });
    };

    const askImage = (name, price, properties, description) => {
        bot.sendMessage(chatId, 'Send the image of the product:', {
            reply_markup: {
                force_reply: true,
            },
        }).then((sentMessage) => {
            const messageId = sentMessage.message_id;
            bot.onReplyToMessage(chatId, messageId, (message) => {
                if (message.photo) {
                    const fileId = message.photo[message.photo.length - 1].file_id;
                    bot.getFileLink(fileId).then((link) => {
                        const imageUrl = link;
                        const filePath = `images/${new Date().getTime()}.jpg`;
                        download(imageUrl, filePath, (err) => {
                            if (err) {
                                console.error(err.message);
                                return;
                            }
                            db.addProduct(name, price, filePath, properties, description)
                                .then(() => {
                                    bot.sendMessage(chatId, 'Product created successfully!', {
                                        reply_markup: {
                                            inline_keyboard: [[{
                                                text: 'Home', callback_data: '/start'
                                            },]]
                                        }
                                    });
                                })
                                .catch((err) => {
                                    console.error(err.message);
                                });
                        });
                    });
                } else {
                    bot.sendMessage(chatId, 'Please send a photo of the product.');
                }
            });
        });
    };

    askName();
};

const changeProductDialog = (bot, chatId, field, id) => {
    const textFields = ['name', 'properties', 'description']
    const onReplyMessage = message => {
        if (field === 'image') {
            if (message.photo) {
                const fileId = message.photo[message.photo.length - 1].file_id;
                bot.getFileLink(fileId).then((link) => {
                    const imageUrl = link;
                    const filePath = `images/${new Date().getTime()}.jpg`;
                    download(imageUrl, filePath, err => {
                        if (err) {
                            console.error(err.message);
                            return;
                        }
                        db.getProduct(id)
                            .then(row => {
                                if (!row) {
                                    bot.sendMessage(chatId, 'Product not found.');
                                    return;
                                }
                                if (fs.existsSync(row.image)) {
                                    fs.unlink(row.image, err => {
                                        if (err) {
                                            console.error(err.message);
                                            return;
                                        }
                                    });
                                } else {
                                    bot.sendMessage(chatId, 'Old product image file not found.');
                                }
                                db.changeProduct(filePath, id, field)
                                    .then(() => {
                                        bot.sendMessage(chatId, 'The image of the product has been successfully changed.', {
                                            reply_markup: {
                                                inline_keyboard: [[{
                                                    text: 'Home', callback_data: '/start'
                                                },]]
                                            }
                                        });
                                    })
                                    .catch((err) => {
                                        console.error(err.message);
                                    });
                            })
                            .catch((err) => {
                                console.error(err.message);
                            });
                    });
                });
            } else {
                bot.sendMessage(chatId, 'Please send a photo of the product.');
            }
        } else if (textFields.some((el) => field == el)) {
            editProductTextField(bot, message, field, id, onReplyMessage)
        } else if (field === 'price') {

        }
    }


    bot.sendMessage(chatId, 'Enter the new value for the ' + field, {
        reply_markup: {
            force_reply: true
        }
    }).then((sentMessage) => {
        const messageId = sentMessage.message_id;
        bot.onReplyToMessage(chatId, messageId, onReplyMessage);
    });
};

function editProductTextField(bot, message, field, id, onReplyMessage) {
    const chatId = message.chat.id;
    if (message.text) {
        console.log('text')

        const newVal = message.text;
        db.getProduct(id)
            .then(row => {
                if (!row) {
                    bot.sendMessage(chatId, 'Product not found.');
                    return;
                }
                db.changeProduct(newVal, id, field)
                    .then(() => {
                        bot.sendMessage(chatId, `The ${field} of the product has been successfully changed.`, {
                            reply_markup: {
                                inline_keyboard: [[{
                                    text: 'Home', callback_data: '/start'
                                },]]
                            }
                        });
                    })
                    .catch((err) => {
                        console.error(err.message);
                    });
            })
            .catch((err) => {
                console.error(err.message);
            });
    } else {
        console.log('no-text')

        bot.sendMessage(chatId, `Please enter the new ${field} of the product as a text message.`).then((sentMessage) => {
            const messageId = sentMessage.message_id;
            bot.onReplyToMessage(chatId, messageId, onReplyMessage);
        });
    }
}

function confirmDeleteProduct(bot, chatId, id) {
    db.getProduct(id)
        .then((row) => {
            if (!row) {
                bot.sendMessage(chatId, 'Product not found.');
                return;
            }
            bot.sendMessage(chatId, `Are you sure you want to delete the product "${row.name}"?`, {
                reply_markup: {
                    inline_keyboard: [[{
                        text: 'Yes', callback_data: `delete_product_${id}`
                    }, {
                        text: 'No', callback_data: `cancel_delete`
                    }]]
                }
            });
        })
        .catch((err) => {
            console.error(err.message);
        });
}

const deleteProduct = (bot, msg, id) => {
    const chatId = msg.chat.id
    const msgId = msg.message_id
    db.getProduct(id)
        .then((row) => {
            if (!row) {
                bot.sendMessage(chatId, 'Product not found.');
                return;
            }

            db.deleteProduct(id)
                .then(() => {
                    if (fs.existsSync(row.image)) {
                        // Delete the product image from the images directory
                        fs.unlink(row.image, (err) => {
                            if (err) {
                                console.error(err.message);
                                return;
                            }
                            bot.deleteMessage(chatId, currentList.find(el => el.itemId == id)?.message_id)
                                .then(() => {
                                    bot.deleteMessage(chatId, msgId)
                                    bot.sendMessage(chatId, 'Product deleted successfully!', {
                                        reply_markup: {
                                            inline_keyboard: [[{
                                                text: 'Home', callback_data: '/start'
                                            },]]
                                        }
                                    });
                                })
                                .catch((error) => {
                                    bot.sendMessage(chatId, 'Product message error!');
                                    console.error(error);
                                });
                        });
                    } else {
                        bot.sendMessage(chatId, 'Product image file not found.');
                    }
                })
                .catch((err) => {
                    console.error(err.message);
                });
        })
        .catch((err) => {
            console.error(err.message);
        });
};


function changeProductField(bot, chatId, id) {
    db.getProduct(id)
        .then((product) => {
            if (!product) {
                bot.sendMessage(chatId, 'Product not found.');
                return;
            }
            bot.sendMessage(chatId, `Which field do you want to change for the product "${product.name}"?`, {
                reply_markup: {
                    inline_keyboard: [[{
                        text: 'Name', callback_data: `change_product_name_${id}`
                    }, {
                        text: 'Price', callback_data: `change_product_price_${id}`
                    }], [{
                        text: 'Properties', callback_data: `change_product_properties_${id}`
                    }, {
                        text: 'Image', callback_data: `change_product_image_${id}`
                    }], [{
                        text: 'Description', callback_data: `change_product_description_${id}`
                    }]]
                }
            });
        })
        .catch((err) => {
            console.error(err.message);
        });
}

function download(url, filePath, cb) {
    request.head(url, (err, res, body) => {
        if (err) {
            cb(err);
            return;
        }
        request(url).pipe(fs.createWriteStream(filePath)).on('close', cb);
    });
}


module.exports = {
    showProducts,
    confirmDeleteProduct,
    createProductDialog,
    changeProductDialog,
    deleteProduct,
    changeProductField
};
