const express = require('express');
const { AppRouter } = require('./src/routers');

const app = express();
const port = process.env.PORT || 3000;

//initialization express middleware
app.use(express.json());

//initializing route middleware
app.use('/api/v1', AppRouter)

app.listen(port, () => {
    console.log(`listening on ${port}`)
});
