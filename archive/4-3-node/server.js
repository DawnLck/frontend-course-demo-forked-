'use strict';

const http = require('http');

const staticHandler = require('./lib/staticHandler');
const listHandler = require('./lib/listHandler');
const uploadHandler = require('./lib/uploadHandler');

// 端口号
const port = 3000;
const server = http.createServer((req, res) => {
    let pathUrl = req.url;

    console.log(`请求: [${req.method}]${pathUrl}`);

    // 默认路径
    if (!pathUrl || pathUrl === '/') pathUrl = 'index.html';

    // 文件上传处理 /pic/upload
    if (pathUrl.endsWith('upload')) {
        return uploadHandler(req, res);
    }

    // 数据查询接口 /pic/list
    if (pathUrl.endsWith('/pic/list')) {
        return listHandler(req, res);
    }

    // 处理静态文件
    return staticHandler(pathUrl, res);
});

server.timeout = 3000; // 超时时间3s(便于项目调试，实际项目中无需指定)
server.listen(port, () => {
    console.log(`Server running at http://127.0.0.1:${port}`);
});

// 通过以下方式启动服务他人可通过IP访问自己的服务器
// const address = require('address');
// const hostname = address.ip();
// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}`);
// });