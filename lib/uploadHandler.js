'use strict';

const { access, constants, readFile, writeFile } = require('fs');
const { join, relative } = require('path');
const formidable = require('formidable');

module.exports = (req, res) => {
  // formidable初始配置
  const form = formidable({
    // 保留上传文件后缀名
    keepExtensions: true,
    // 文件保存路径
    uploadDir: join(__dirname, '..', 'web', 'data', 'pic'),
    filename(name, ext) {
      // 文件命名方式
      return `pic-${Date.now()}${ext}`;
    },
  });

  res.writeHead(200, { 'Content-Type': 'application/json' });
  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error(`上传错误`, err);
      // 读取操作发生错误
      res.end(JSON.stringify({ success: false, error: e.message }));
      return;
    }

    // 更新图片信息JSON文件
    const listDataPath = join(__dirname, '..', 'web', 'data', 'data.json');
    let listData = [];
    // 1. 检查文件安是否存在和可读
    access(listDataPath, constants.F_OK | constants.R_OK , err =>  {
      if (err) {
        res.end(JSON.stringify({ success: false, error: e.message }));
        return;
      }
      // 2. 读取数据 web/data/data.json
      readFile(listDataPath, 'utf8', (err, data) => {
        try {
          listData = JSON.parse(data);
        } catch(e) {
          res.end(JSON.stringify({ success: false, error: e.message }));
          return;
        }

        // 2. 构造返回数据，数据结构: {name, photographer, desc, picPath}
        const { file } = files;
        fields.picPath = relative(join(__dirname, '..', 'web'), file.filepath);
        listData.unshift(fields);

        // 3. 回写 web/data/data.json
        writeFile(listDataPath, JSON.stringify(listData, null, 2), 'utf8', err => {
          res.end(JSON.stringify({ success: true, fields, files }, null, 2));
          console.log(`上传: ${JSON.stringify(fields)}`);
        });
      });
    });
  });
}