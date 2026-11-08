const fs = require('node:fs');
const path = require('node:path');
const root = path.join(__dirname,'..');
const publicDir = path.join(root,'public');
const outputDir = path.join(root,'dist');
fs.mkdirSync(outputDir,{recursive:true});
for (const entry of fs.readdirSync(publicDir,{withFileTypes:true})) {
  fs.cpSync(path.join(publicDir,entry.name),path.join(outputDir,entry.name),{recursive:true,filter: source => !source.endsWith('.jpg')});
}
console.log('Static site prepared in dist.');
