const fs = require('fs');
const path = require('path');
  
fs.promises.mkdir(path.join(__dirname, 'files-copy')).then(function() { 
  copyDirectory(originalFolder, copyFolder);
}).catch(function() { 
  deleteDirectory(copyFolder); 
  copyDirectory(originalFolder, copyFolder);
  
});

const originalFolder = path.join(__dirname, 'files');
const copyFolder = path.join(__dirname, 'files-copy');

function copyDirectory(from, to) {
 
  fs.readdir(from, (err, files) => {
    if(err) throw err; 

    files.forEach(element => {      
      fs.copyFile(path.join(from, element), path.join(to, element), err => {
        if(err) throw err; 
      });
    });
  });
}

function deleteDirectory(folder) {
 
  fs.readdir(folder, (err, files) => {
    if(err) throw err; 
    
    files.forEach(element => {      
      fs.unlink(path.join(folder, element), err => {
        if(err) throw err; 
      });
    });
  });
}