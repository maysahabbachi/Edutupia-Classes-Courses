var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/ws', function(req, res, next) {
    console.log('howdy !')
    //console.log(req.app.get('io'))
    req.app.get('io').on('connection', function(socket) {
        socket.on('msg', (data) => { console.log(data)}) 
        console.log('A user connected')
        socket.on('message', (data) => console.log(data) )
    })
    res.send('respond with a resourcefdsfs');
});

module.exports = router;
