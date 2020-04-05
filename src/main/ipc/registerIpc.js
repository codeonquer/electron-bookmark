/**
 * 注册主进程需要处理的ipc
 */

const path = require('path');
const fs = require('fs');
const { ipcMain, app } = require('electron');

const {
  GET_BOOKMARK_CONFIG,
  SEND_BOOKMARK_CONFIG,
  UPDATE_BOOKMARK_CONFIG
} = require('../../constants/IPC_EVENT');

function getPaths () {
  const homePath = app.getPath('home');
  const codeonquerPath = path.resolve(homePath, '.codeonquer/');
  const bookmarkJsonPath = path.resolve(codeonquerPath, 'bookmark.json');

  return {
    homePath,
    codeonquerPath,
    bookmarkJsonPath
  };
}

ipcMain.on(GET_BOOKMARK_CONFIG, (event, data) => {
  const { codeonquerPath, bookmarkJsonPath } = getPaths();

  const isCodeonquerExisted = fs.existsSync(codeonquerPath);
  if (!isCodeonquerExisted) {
    fs.mkdirSync(codeonquerPath);
  }

  const isBookmarkJsonExisted = fs.existsSync(bookmarkJsonPath);
  let bookmarkJson = '';
  if (!isBookmarkJsonExisted) {
    const baseContent = require('../../constants/BOOKMARK_JSON');
    baseContent.ts = Date.now();
    const baseContentStr = JSON.stringify(baseContent);
    fs.writeFileSync(bookmarkJsonPath, baseContentStr);
    bookmarkJson = baseContent;
  } else {
    const bookmarkJsonStr = fs.readFileSync(bookmarkJsonPath);
    bookmarkJson = JSON.parse(bookmarkJsonStr);
  }

  event.sender.send(SEND_BOOKMARK_CONFIG, bookmarkJson);
});

ipcMain.on(UPDATE_BOOKMARK_CONFIG, (event, bookmarkJson) => {
  const { bookmarkJsonPath } = getPaths();
  bookmarkJson.ts = Date.now();
  const bookmarkJsonStr = JSON.stringify(bookmarkJson);
  fs.writeFileSync(bookmarkJsonPath, bookmarkJsonStr);
});
