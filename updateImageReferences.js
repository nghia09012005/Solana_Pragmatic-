const fs = require('fs');
const path = require('path');

const fileExtensions = ['.js', '.jsx', '.ts', '.tsx', '.css'];

function updateFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Update import statements
    content = content.replace(
        /import\s+(\w+)\s+from\s+['"]([^'"]+\.(jpg|jpeg|png|gif))['"]/g,
        (match, importName, importPath) => {
            const webpPath = importPath.replace(/\.(jpg|jpeg|png|gif)$/i, '.webp');
            modified = true;
            return `import ${importName} from '${webpPath}'`;
        }
    );

    // Update require statements
    content = content.replace(
        /require\(['"]([^'"]+\.(jpg|jpeg|png|gif))['"]\)/g,
        (match, requirePath) => {
            const webpPath = requirePath.replace(/\.(jpg|jpeg|png|gif)$/i, '.webp');
            modified = true;
            return `require('${webpPath}')`;
        }
    );

    // Update src attributes in JSX
    content = content.replace(
        /src=["']([^"']+\.(jpg|jpeg|png|gif))["']/g,
        (match, srcPath) => {
            const webpPath = srcPath.replace(/\.(jpg|jpeg|png|gif)$/i, '.webp');
            modified = true;
            return `src="${webpPath}"`;
        }
    );

    // Update background-image URLs in CSS
    content = content.replace(
        /url\(['"]?([^'"()]+\.(jpg|jpeg|png|gif))['"]?\)/g,
        (match, urlPath) => {
            const webpPath = urlPath.replace(/\.(jpg|jpeg|png|gif)$/i, '.webp');
            modified = true;
            return `url('${webpPath}')`;
        }
    );

    if (modified) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated references in ${filePath}`);
    }
}

function processDirectory(directory) {
    const files = fs.readdirSync(directory);
    
    for (const file of files) {
        const filePath = path.join(directory, file);
        const stats = fs.statSync(filePath);
        
        if (stats.isDirectory()) {
            processDirectory(filePath);
            continue;
        }
        
        if (fileExtensions.includes(path.extname(file).toLowerCase())) {
            updateFile(filePath);
        }
    }
}

// Process src directory
processDirectory('src');
// Process public directory
processDirectory('public'); 