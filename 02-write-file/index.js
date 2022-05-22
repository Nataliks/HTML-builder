const fs = require('fs');
const path = require('path');

const writeableStream = fs.createWriteStream(path.join(__dirname, 'text.txt'));
const { stdout, stdin} = process;
stdout.write('Enter your message:\n');
stdin.on('data', data => {  
  if (data.toString().trim() === 'exit') {
    process.exit();
  } else {
    writeableStream.write(data);
  }     
});

process.on('exit', () => console.log('\nYour message saved!'));
process.on('SIGINT', () => process.exit());

 
