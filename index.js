const connectToMongo = require('./db')
const express = require('express')
const app = express();
const cors = require('cors');
const port = 1000;
connectToMongo();

app.use(cors())
app.use(express.json())
app.use('/api/qna', require('./route/qna'))
app.use('/api/theory', require('./route/theory'))
app.listen(process.env.PORT || port, () => {
    console.log("Application is started on Port "+port);
})