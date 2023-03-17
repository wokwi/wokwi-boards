const fs = require('fs');
const path = require('path');
const jsonc = require('jsonc-parser');
const { execSync } = require('child_process');

const boardsRoot = path.join(__dirname, '..', 'boards');
const indexFile = path.join(boardsRoot, 'index.json');

const index = {};
for (const boardId of fs.readdirSync(boardsRoot)) {
  try {
    const boardPath = path.join(boardsRoot, boardId);
    const boardJson = jsonc.parse(fs.readFileSync(path.join(boardPath, 'board.json'), 'utf-8'));
    const rev = execSync(`git log -1 --pretty=format:"%h" ${boardPath}`).toString().trim();

    index[boardId] = { rev, h: boardJson.height, w: boardJson.width, mcu: boardJson.mcu };
  } catch (err) {
    console.error(`Error reading ${boardId}: ${err}`);
  }
}
fs.writeFileSync(indexFile, JSON.stringify(index, null, 2));
