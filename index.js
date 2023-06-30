const connectToMongo = require('./db')
const express = require('express')
const app = express();
const port = 1000;
connectToMongo();

app.use(express.json())
app.use('/api/data', require('./route/qna'))
app.listen(process.env.PORT || port, () => {
    console.log("Application is started on Port "+port);
})