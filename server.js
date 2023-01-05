const express = require('express');
const app = express();
const https = require('https');
const {getAllProducts} = require('./server_components/backend');
const cors = require('cors');
app.use(express.json())
app.use(cors({origin: 'https://webappbot.website', credentials: true}));

const {bot} = require('./server_components/bot');
const {web_bot, handleSendData} = require('./server_components/web_bot');
const fs = require("fs");


const privateKey = fs.readFileSync('sslcert/server.key', 'utf8');
const certificate = fs.readFileSync('sslcert/server.crt', 'utf8');
const credentials = {key: privateKey, cert: certificate};


app.get('/products', getAllProducts);

app.post('/web-data', async (req, res) => {
    console.log(req.body)
    const status = await handleSendData(req.body)
    res.status(status ? 200 : 500);
})


const httpsServer = https.createServer(credentials, app);


httpsServer.listen(8000);


