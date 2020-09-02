const express = require('express');
const app = new express();
const ws = require('express-ws');
ws(app);
app.use(express.static('./dist'));

const router = require('./router/router.js');
router(app);


app.listen(3110, () => {
    console.log('serve run in localhost:3110//')
})