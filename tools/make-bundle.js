const fs = require('fs');
const path = require('path');
const jsonc = require('jsonc-parser');
const { execSync } = require('child_process');

const boardsRoot = path.join(__dirname, '..', 'boards');
const bundleFile = path.join(boardsRoot, 'bundle.json');
const boardsFile = path.join(boardsRoot, 'boards.json');

const bundle = {};
const boards = {};
for (const boardId of fs.readdirSync(boardsRoot)) {
  try {
    const boardPath = path.join(boardsRoot, boardId);
    const boardJson = jsonc.parse(fs.readFileSync(path.join(boardPath, 'board.json'), 'utf-8'));
    const rev = execSync(`git log -1 --pretty=format:"%h" ${boardPath}`).toString().trim();

    bundle[boardId] = { rev, def: boardJson, svg: fs.readFileSync(path.join(boardPath, 'board.svg'), 'utf-8') };
    boards[boardId] = { rev, def: boardJson };
  } catch (err) {
    console.error(`Error reading ${boardId}: ${err}`);
  }
}
fs.writeFileSync(bundleFile, JSON.stringify(bundle));
fs.writeFileSync(boardsFile, JSON.stringify(boards));
