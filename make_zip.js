import AdmZip from 'adm-zip';
import fs from 'fs';
import path from 'path';

console.log('Criando arquivos ZIP do projeto Morfos Craft...');

// 1. Zip do Código Fonte
const sourceZip = new AdmZip();
const excludeDirs = ['node_modules', 'dist', '.git', '.cache'];
const excludeFiles = ['morfos-craft-codigo.tar.gz', 'morfos-craft-codigo-fonte.zip', 'morfos-craft-jogo-pronto.zip', 'make_zip.js'];

function addFilesRecursively(dirPath, zipPath = '') {
  const items = fs.readdirSync(dirPath);
  for (const item of items) {
    const fullPath = path.join(dirPath, item);
    const relZipPath = zipPath ? `${zipPath}/${item}` : item;

    if (excludeFiles.includes(item) || excludeDirs.includes(item)) {
      continue;
    }

    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      addFilesRecursively(fullPath, relZipPath);
    } else {
      sourceZip.addLocalFile(fullPath, zipPath);
    }
  }
}

addFilesRecursively('.');
sourceZip.writeZip('morfos-craft-codigo-fonte.zip');
console.log('✅ morfos-craft-codigo-fonte.zip criado com sucesso!');

// 2. Zip do Jogo Compilado (Dist)
if (fs.existsSync('dist')) {
  const distZip = new AdmZip();
  distZip.addLocalFolder('dist');
  distZip.writeZip('morfos-craft-jogo-pronto.zip');
  console.log('✅ morfos-craft-jogo-pronto.zip criado com sucesso!');
} else {
  console.error('Pasta dist não encontrada.');
}
