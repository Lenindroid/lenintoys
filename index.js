const express = require('express');
const app = express();

app.get('/', (req, res)=>{
    res.send('Que w');
});
app.listen(3030, ()=> {
    console.log('Ya prendió tú');
});