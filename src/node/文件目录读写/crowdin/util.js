const path = require('path');
const fs = require('fs');
const inquirer = require('inquirer');
const util = require('util');
const pipeline = util.promisify(require('stream').pipeline);

module.exports = {
  menu(list, message = '请选择') {
    var menus = list.map((i, index) => `${index + 1}. ${i.text}`);
    var funs = list.map((i) => i.fun);
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'menu',
          message,
          choices: menus,
        },
      ])
      .then((answers) => {
        var index = menus.indexOf(answers.menu);
        funs[index]();
      });
  },
  async copyFile(sourceFilePath, destinationDir) {
    try {
      // Check if the source file exists
      await fs.promises.access(sourceFilePath, fs.constants.F_OK);
    } catch (error) {
      throw new Error(`源文件不存在: "${sourceFilePath}"`);
    }
    try {
      // Check if the destination directory exists, create it if not
      await fs.promises.access(destinationDir, fs.constants.F_OK);
    } catch (error) {
      throw new Error(`目标路径不存在: "${sourceFilePath}"`);
    }

    const fileName = path.basename(sourceFilePath);
    const destinationFilePath = path.join(destinationDir, fileName);
    const sourceStream = fs.createReadStream(sourceFilePath);
    const destinationStream = fs.createWriteStream(destinationFilePath);

    sourceStream.on('error', (err) => {
      console.error('读取源文件时出错:', err);
    });

    destinationStream.on('error', (err) => {
      console.error('写入目标文件时出错:', err);
    });

    await pipeline(sourceStream, destinationStream);

    console.log(`同步${destinationFilePath}语言成功`);
  },
};
