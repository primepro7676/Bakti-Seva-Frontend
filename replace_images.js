const fs = require('fs');
const path = require('path');

const userImages = [
  '/images/003fe7c4-81e7-480d-9df1-e7656dbb0eed.png',
  '/images/563a6eef-a6d2-4ae0-9b18-6ef036ef0f3f.png',
  '/images/5ee0b7c7-778f-4c7c-aef8-29f11ff58d18.png',
  '/images/5ef07730-5c33-4e7a-9784-0e6d11b61785.png',
  '/images/69d3b008-34ea-4b8a-8c26-c4a4b8042947.png',
  '/images/79e17883-d27e-449f-afbf-783d894fc81f.png',
  '/images/aa4649e7-5d6f-4350-962b-f65710c44586.png',
  '/images/c61b827d-c793-41af-9391-20d3751c5527.png',
  '/images/f83160f2-e296-429f-b981-6ad98ac5b923.png'
];

let imgIndex = 0;
function getNextImage() {
  const img = userImages[imgIndex];
  imgIndex = (imgIndex + 1) % userImages.length;
  return img;
}

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = [...walk('./src'), './prisma/seed.ts'];
let changedFiles = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  const original = content;
  
  // Replace all Unsplash image links with local images
  content = content.replace(/https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9-]+\?[^\"\'\s}]+/g, () => {
    return getNextImage();
  });

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    changedFiles++;
    console.log('Updated:', file);
  }
});

console.log('Total files updated:', changedFiles);
