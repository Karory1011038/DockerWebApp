const express = require('express');
const app = express();
const {getAllProducts} = require('./server_components/backend');
const cors = require('cors');
app.use(cors({ origin: 'http://127.0.0.1:5173' , credentials :  true}));

const {bot} = require('./server_components/bot');

app.get('/products', getAllProducts);

app.post('/web-data', async (req, res) => {
    console.log(req)
    // const {queryId, products = [], totalPrice} = req.body;
    const data = req.body;
    try {
        // let res = createOrderMessage(data)
        // let res = 'createOrderMessage(data)'
        // await bot.answerWebAppQuery(data.queryId, {
        //     type: 'article',
        //     id: data.queryId,
        //     title: 'Успешная покупка',
        //     input_message_content: {
        //         message_text: res
        //     }
        // })
        return res.status(200).json({});
    } catch (e) {
        return res.status(500).json({})
    }
})


app.listen(8000, () => {
    console.log('Express server listening on port 8000');
});
