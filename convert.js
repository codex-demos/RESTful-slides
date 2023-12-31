const fs = require('fs');
const marked = require('marked');

if(process.argv.length < 3) {
  console.log("usage: ");
  console.log("  node convert.js myfile")
  console.log("  note: myfile.md should exist in input/ dir");
  process.exit(0);
}

let name = process.argv[2];
let filename = `input/${name}.md`;
let outputFile = `output/${name}.html`;

let md = fs.readFileSync(filename, { encoding: 'utf8', flag: 'r' });

let slideMds = md.split('---').map((content) => marked.parse(content));

let slides = [];

for(let i=0; i<slideMds.length; i++){
  let slideContent = slideMds[i];
  let slide = `<div class="slide" id="slide${i+1}">
    ${slideContent}
  </div>`
  slides.push(slide);
}

let page = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>API Presentation</title>
    <link rel="stylesheet" href="../style.css" />
  </head>
  <body>
    <div class="slideshow">
      ${slides.join("\n")}
      <button id="prevBtn">Previous</button>
      <button id="nextBtn">Next</button>
    </div>
  <script src="../script.js"></script>
</body>
</html>
`

fs.writeFileSync(outputFile,
  page,
  {
    encoding: "utf8",
    flag: "a+",
    mode: 0o666
  });
