const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const directories = [
    'src/assets',
    'public/images',
    'src/assets/Thongnhat/images',
    'src/assets/DongHoGame/image',
    'src/assets/CuChiGame/images',
    'src/assets/CauRong/images',
    'src/assets/TayNguyenGame',
    'src/assets/PersonalMuseum'
];

async function convertToWebP(directory) {
    try {
        const files = fs.readdirSync(directory);
        
        for (const file of files) {
            const filePath = path.join(directory, file);
            const stats = fs.statSync(filePath);
            
            if (stats.isDirectory()) {
                await convertToWebP(filePath);
                continue;
            }
            
            if (file.match(/\.(jpg|jpeg|png|gif)$/i)) {
                const webpPath = filePath.replace(/\.(jpg|jpeg|png|gif)$/i, '.webp');
                
                try {
                    await sharp(filePath)
                        .webp({ quality: 80 })
                        .toFile(webpPath);
                    
                    console.log(`Converted ${filePath} to WebP`);
                } catch (err) {
                    console.error(`Error converting ${filePath}:`, err);
                }
            }
        }
    } catch (err) {
        console.error(`Error processing directory ${directory}:`, err);
    }
}

async function main() {
    for (const directory of directories) {
        if (fs.existsSync(directory)) {
            console.log(`Processing directory: ${directory}`);
            await convertToWebP(directory);
        }
    }
}

main().catch(console.error); 