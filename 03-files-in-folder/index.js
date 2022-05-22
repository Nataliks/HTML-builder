const fs = require('fs');
const path = require('path');

const folder = path.join(__dirname, 'secret-folder');

const fsPromises = fs.promises;
  
fsPromises.mkdir('fs_test2').then(function() {
  console.log('Directory created successfully');
}).catch(function() {
  console.log('failed to create directory');
});


fs.readdir(folder, {withFileTypes: true}, (err, files) => {
  if(err) throw err;  

  files.forEach(file => {

    if(file.isDirectory() === false) {

      const fileInFolder =  path.join(__dirname, 'secret-folder' +`\\${file.name}`);
      const fileInfo = path.parse(fileInFolder);
      
      fs.stat(fileInFolder, (err, stats) =>{
        if(err) throw err;
        console.log(fileInfo.name + '-' + fileInfo.ext.slice(1) + '-' + `${stats.size}` +'b');
      });
    }


  });
});