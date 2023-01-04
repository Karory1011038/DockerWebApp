const express = require('express');
const app = express();
const https = require('https');
const {getAllProducts} = require('./server_components/backend');
const cors = require('cors');
app.use(cors({ origin: 'http://81.163.23.58:5173' , credentials :  true}));

const {bot} = require('./server_components/bot');
const fs = require("fs");


const privateKey  = fs.readFileSync('sslcert/server.key', 'utf8');
const certificate = fs.readFileSync('sslcert/server.crt', 'utf8');
const credentials = {key: privateKey, cert: certificate};

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

const httpsServer = https.createServer(credentials, app);


httpsServer.listen(8000);


//TODO
/// add https
