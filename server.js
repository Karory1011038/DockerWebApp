const express = require('express');
const app = express();
const https = require('https');
const {getAllProducts} = require('./server_components/backend');
const cors = require('cors');
app.use(cors({origin: 'https://webappbot.website', credentials: true}));

const {bot} = require('./server_components/bot');
const {web_bot} = require('./server_components/web_bot');
const fs = require("fs");


const privateKey = fs.readFileSync('sslcert/server.key', 'utf8');
const certificate = fs.readFileSync('sslcert/server.crt', 'utf8');
const credentials = {key: privateKey, cert: certificate};

app.get('/products', getAllProducts);

app.post('/web-data', async (req, res) => {
    const data = JSON.parse(req.body);
    try {
        let res = JSON.stringify(data)
        await web_bot.answerWebAppQuery(data.queryId, {
            type: 'article',
            id: data.queryId,
            title: 'Success',
            input_message_content: {
                message_text: res
            }
        })
        return res.status(200).json({});
    } catch (e) {
        return res.status(500).json({})
    }
})

const httpsServer = https.createServer(credentials, app);


httpsServer.listen(8000);


//TODO
/// add https
