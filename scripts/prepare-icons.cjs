const fs = require('node:fs');
const path = require('node:path');
const lucide = require('C:/Users/Gabriel/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/lucide');
const names = ['Menu','X','MessageCircle','Plus','Minus','ChevronLeft','ChevronRight','Expand','Check','Truck','Car','Store','Layers','Eye','MapPin','Phone','Mail','ShieldCheck','Palette','Send','Star'];
fs.writeFileSync(path.join(__dirname,'../public/icons.js'), 'const V4_ICONS = '+JSON.stringify(Object.fromEntries(names.map(name=>[name,lucide[name]])))+';\n');
