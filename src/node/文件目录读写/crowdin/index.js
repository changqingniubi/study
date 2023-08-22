const fs = require('fs');
const { copyFile, menu } = require('./util');
const inquirer = require('inquirer');
const redColor = '\x1b[31m';
const greenColor = '\x1b[32m';
process.stdin.setEncoding('utf8');

console.log(greenColor + '多语言翻译同步工具' + greenColor);

const commands = {
  allFiles() {
    const zhCNPath = `src/locales/zh-CN`;
    try {
      const fileNames = fs.readdirSync(zhCNPath);
      console.log('fileNames');
      console.log(fileNames);
      commands.appointFiles(fileNames);
    } catch (error) {
      console.error('读取文件夹时出错:', error);
      return [];
    }
  },
  appointFiles(inputArray) {
    const languageArray = [
      'ar',
      'en',
      'es-ES',
      'fr',
      'hu',
      'id',
      'ja',
      'ko',
      'pt-BR',
      'ru',
      'vi',
      'zh-TW',
    ];
    const copyFilesAsync = async () => {
      for (const inputItem of inputArray) {
        for (const languageItem of languageArray) {
          const sourceCrowdinPath = `../EEO ClassIn (translations)/${languageItem}/WEB/LMS/zh-CN/${inputItem}`;
          const destinationPath = `src/locales/${languageItem}`;
          await copyFile(sourceCrowdinPath, destinationPath);
        }
      }
    };

    copyFilesAsync()
      .then(() => {
        console.log('多语言自动同步完成！');
      })
      .catch((error) => {
        console.error(redColor + error + redColor);
      });
  },
};

menu([
  { text: '全部文件', fun: commands.allFiles },
  {
    text: '指定文件名',
    fun: () => {
      inquirer
        .prompt([
          {
            type: 'input',
            name: 'files',
            message: '请输入（src/locales/zh-CN/文件名），多个文件名用英文逗号分隔:',
          },
        ])
        .then((answers) => {
          const input = answers.files;
          commands.appointFiles(input.trim().split(','));
        });
    },
  },
]);
