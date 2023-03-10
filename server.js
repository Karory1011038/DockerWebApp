const express = require('express');
const app = express();
const https = require('https');
const {getAllProducts, getProduct} = require('./server_components/backend');
const cors = require('cors');
// app.use(express.json())
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

const webappbotUrl = process.env.WEBAPPBOT_URL;

app.use(cors({origin: webappbotUrl, credentials: true}));

const {bot} = require('./server_components/bot');
const {web_bot, handleSendData} = require('./server_components/web_bot');
const fs = require("fs");


const privateKey = fs.readFileSync('sslcert/server.key', 'utf8');
const certificate = fs.readFileSync('sslcert/server.crt', 'utf8');
const credentials = {key: privateKey, cert: certificate};


app.get('/products', getAllProducts);
app.get('/product/:id', getProduct);

app.post('/web-data', (req, res) => {
    // const data = JSON.parse(req.body)
    const data = req.body
    if (data && data.user) {
        handleSendData(data, (error, status) => {
            if (error) {
                // console.error(error);
                res.status(500).send('Error processing data');
            } else {
                res.status(status ? 200 : 500).send('Data received and processed successfully');
            }
        });
    } else
        res.status(500).send('Data is invalid');
});


const httpsServer = https.createServer(credentials, app);

const port = process.env.WEBAPPBOT_BACKEND_PORT
httpsServer.listen(port);


