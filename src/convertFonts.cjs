const fs = require('fs');
const path = require('path');

const fonts = [
  'Times-New-Roman.ttf',
  'Times-New-Roman-Bold.ttf',
  'Times-New-Roman-Italic.ttf',
  'Times-New-Roman-BoldItalic.ttf'
];

fonts.forEach(font => {
  const filePath = path.join(__dirname, 'components', 'reports', 'fonts', font);
  
  if (fs.existsSync(filePath)) {
    const fileBase64 = fs.readFileSync(filePath, 'base64');
    const outputFilePath = path.join(__dirname, 'components', 'reports', 'fonts', `${font}.base64`);

    fs.writeFileSync(outputFilePath, fileBase64, 'utf8');
    console.log(`Converted ${font} to Base64 and saved as ${font}.base64`);
  } else {
    console.log(`File not found: ${filePath}`);
  }
});
