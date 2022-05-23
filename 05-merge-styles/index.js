const fs = require('fs');
const path = require('path');

const folder = path.join(__dirname, 'styles');
const commonCssFile = path.join(__dirname, 'project-dist' + '\\bundle.css');

fs.createWriteStream(commonCssFile);

function appendFiles (to, from) {
  fs.readdir(from, {withFileTypes: true}, (err, files) => {
    if(err) throw err;
    
    const arrCssFiles = files.filter(file => path.parse( path.join(__dirname, 'styles' +`\\${file.name}`)).ext === '.css');
      
    arrCssFiles.forEach(item => {    
      const readableStream = fs.createReadStream( path.join(__dirname, 'styles' +`\\${item.name}`));
  
      readableStream.on('data', chunk => fs.appendFile(to , chunk, (err) => {
        if(err) throw err; 
      }));
      
    });
  });  
}

appendFiles (commonCssFile, folder);
/*
fs.readdir(folder, {withFileTypes: true}, (err, files) => {
  if(err) throw err;
  
  const arrCssFiles = files.filter(file => path.parse( path.join(__dirname, 'styles' +`\\${file.name}`)).ext === '.css');
    
  arrCssFiles.forEach(item => {    
    const readableStream = fs.createReadStream( path.join(__dirname, 'styles' +`\\${item.name}`));

    readableStream.on('data', chunk => fs.appendFile(commonCssFile , chunk, (err) => {
      if(err) throw err; 
    }));
    
  });
});*/

