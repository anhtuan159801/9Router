const fs = require('fs');
const path = require('path');

function replaceInDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filepath = path.join(dir, file);
    const stat = fs.statSync(filepath);
    if (stat.isDirectory()) {
      replaceInDir(filepath);
    } else if (file.endsWith('.js')) {
      let content = fs.readFileSync(filepath, 'utf8');
      if (content.includes('from "@/lib/localDb"')) {
        content = content.replace(/from "@\/lib\/localDb"/g, 'from "@/lib/db"').replace(/} from "@\/lib\/localDb"/g, '} from "@/lib/db"');
        fs.writeFileSync(filepath, content);
        console.log('Updated:', filepath);
      }
    }
  }
}

replaceInDir(path.join(__dirname, '..', 'src'));
console.log('Done!');