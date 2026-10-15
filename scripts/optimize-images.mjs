import sharp from 'sharp';
import path from 'node:path';
const root='public';
const names={'Deluxe Room.jpg':'aariva-deluxe','Deluxe Room1.jpg':'aariva-deluxe-1','Deluxe Room2.jpg':'aariva-deluxe-2','Family Room.jpg':'aariva-family','Family Room (2).jpg':'aariva-family-2','reception1.jpg':'aariva-reception-1','reception2.jpg':'aariva-reception-2','bathrooms.jpg':'aariva-bathroom','bathrooms1.jpg':'aariva-bathroom-1'};
for(const[file,name] of Object.entries(names)){
 const src=path.join(root,'images/Aariva',file);
 for(const width of [320,640,960,1280,1920]) await sharp(src).rotate().resize({width,withoutEnlargement:true}).webp({quality:82}).toFile(path.join(root,'images',`${name}-${width}.webp`));
 await sharp(src).rotate().resize({width:1280,withoutEnlargement:true}).webp({quality:82}).toFile(path.join(root,'images',`${name}.webp`));
}
const logo=path.join(root,'aariva logo withoutbackound.png');
await sharp(logo).trim().resize({width:320,height:320,fit:'inside'}).png().toFile(path.join(root,'aariva-logo.png'));
await sharp(logo).trim().resize(512,512,{fit:'contain',background:'#fbf6ee'}).png().toFile('app/icon.png');
await sharp(logo).trim().resize(180,180,{fit:'contain',background:'#fbf6ee'}).png().toFile('app/apple-icon.png');
console.log('Aariva responsive photos, logo and app icons prepared.');
