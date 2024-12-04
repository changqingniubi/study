let http = require('http');
let server = http.createServer();
server.on('request', function (req, res) {
    res.end(JSON.stringify({ message: 'ok' }));
});
server.listen(3000, () => console.log('服务器监听3000端口'));