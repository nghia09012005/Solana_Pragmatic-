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

// Create src/images directory if it doesn't exist
const targetDir = 'src/images';
if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
}

function moveNonWebPImages(directory) {
    try {
        const files = fs.readdirSync(directory);
        
        for (const file of files) {
            const filePath = path.join(directory, file);
            const stats = fs.statSync(filePath);
            
            if (stats.isDirectory()) {
                moveNonWebPImages(filePath);
                continue;
            }
            
            // Check if file is an image but not WebP
            if (file.match(/\.(jpg|jpeg|png|gif)$/i)) {
                const targetPath = path.join(targetDir, file);
                
                try {
                    // Check if file already exists in target directory
                    if (fs.existsSync(targetPath)) {
                        // Add directory name to filename to avoid conflicts
                        const dirName = path.basename(directory);
                        const newFileName = `${dirName}_${file}`;
                        const newTargetPath = path.join(targetDir, newFileName);
                        fs.renameSync(filePath, newTargetPath);
                        console.log(`Moved ${filePath} to ${newTargetPath}`);
                    } else {
                        fs.renameSync(filePath, targetPath);
                        console.log(`Moved ${filePath} to ${targetPath}`);
                    }
                } catch (err) {
                    console.error(`Error moving ${filePath}:`, err);
                }
            }
        }
    } catch (err) {
        console.error(`Error processing directory ${directory}:`, err);
    }
}

// Process each directory
for (const directory of directories) {
    if (fs.existsSync(directory)) {
        console.log(`Processing directory: ${directory}`);
        moveNonWebPImages(directory);
    }
} 