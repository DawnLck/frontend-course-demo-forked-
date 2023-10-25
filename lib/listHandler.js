'use strict';

const { access, readFile, constants } = require('fs');
const path = require('path');

module.exports = (req, res) => {
  let listData = [];
  // 构造文件路径: web/data/data.json
  const listDataPath = path.join(__dirname, '..', 'web', 'data', 'data.json');

  // 1. 检查文件:是否存在和有读取的权限 web/data/data.json
  access(listDataPath, constants.R_OK, (err) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    if (err) {
      // 读取操作发生错误
      res.end(JSON.stringify({ success: false, error: e.message }));
      return;
    }
    // 2. 读取文件: web/data/data.json
    readFile(listDataPath, 'utf8', (err, data)=> {
      if (err) {
        res.end(JSON.stringify({ success: false, error: e.message }));
        return;
      }
      try {
        listData = JSON.parse(data);
        // 3. 返回数据，数据结构: { success: true, data: [] }
        const result = JSON.stringify({ success: true, data: listData });
        console.log(`图片列表数据: ${result}`);
        res.end(result);
      } catch(e) {
        res.end(JSON.stringify({ success: false, error: e.message }));
        return;
      }
    });
  });
}