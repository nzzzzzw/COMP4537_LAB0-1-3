const http = require('http');
const url = require('url');
const Utils = require('./modules/utils');
const en = require('./lang/en/en');

class MyServer {
    constructor(port = 8089, hostname = '0.0.0.0') {
        this.port = port;
        this.hostname = hostname;
        this.server = http.createServer(this.handleRequest.bind(this));
    }

    handleRequest(req, res) {
        const parsedUrl = url.parse(req.url, true);
        
        if (parsedUrl.pathname === '/comp4537/labs/3/getDate') {  // 确保匹配你的 URL 结构
            const name = parsedUrl.query.name || 'Guest';
            const currentTime = Utils.getDate();
            
            const message = `<p style="color:blue;">${en.greeting(name)} ${en.serverTime(currentTime)}</p>`;
    
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(message);
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 Not Found');
        }
    }

    start() {
        this.server.listen(this.port, this.hostname, () => {
            console.log(`🚀 Server running at https://${this.hostname}:${this.port}/`);
        });
    }
}

// 启动服务器
const myServer = new MyServer(8089);
myServer.start();