require('dotenv').config();
const express = require('express')
const app = express();
var body_parser = require('body-parser');
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client  = require('twilio')(accountSid,authToken);

app.use(body_parser.urlencoded({extended:true}));

app.post('/sms', (req, res)=>{
    const sms = req.body
    client.messages.create({
        to: process.env.MY_PHONE_NUMBER,
        from: '+16625064671',
        body: `Se publicaron nuevos articulos en la seccion de ${sms}`
    })
    .then(message => console.log(message.sid))
    console.log(sms)
    res.status(200).json({
        message: "La notificación fue enviada"
    })
})


//Inicializando el servidor
app.listen(4000, () => {
    console.log("server on port 4000");
  });




