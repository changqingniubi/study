let url = require('url');
let http = require('http');
process.on('message', (message) => {
    let { type, options } = message;
    if (type === 'send') {
        //http://localhost:3000/data={}
        let urlObj = url.parse(options.url);
        let config = {
            hostname: urlObj.hostname,
            port: urlObj.port,
            path: urlObj.path,
            method: options.method
        }
        let req = http.request(config, res => {
            let chunks = [];
            res.on('data', chunk => {
                chunks.push(chunk);
            });
            res.on('end', chunk => {
                process.send({
                    type: 'response',
                    data: JSON.parse(Buffer.concat(chunks).toString())
                });
            });
        });
        req.end();
    }
});