'use strict';

const { access, readFile, constants } = require('fs');
const { join, extname } = require('path');
const { lookup } = require('mime-types');

module.exports = (pathUrl, res) => {
    // 处理静态文件
    const extName = extname(pathUrl);
    const filePath = join(__dirname, '..', 'web', pathUrl);

    // 1. 检查文件:是否存在和有读取的权限 web/data/data.json
    access(filePath, constants.F_OK | constants.R_OK, err => {
        if (err) {
            // 读取操作发生错误
            // 404 not found
            res.writeHead(404, { 'Content-Type': `${lookup(extName)}` });
            return;
        }

        // 200 success
        res.writeHead(200, { 'Content-Type': `${lookup(extName)}` });
        // 2. 读取文件
        readFile(filePath, (err, data) => {
            if (err) {
                // 读取操作发生错误
                res.end(JSON.stringify({ success: false, error: e.message }));
                return;
            }
            // 3. 文件写入到response
            res.end(data);
        });
    });
};