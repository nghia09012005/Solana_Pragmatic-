const { spawn } = require('child_process');

function runScript(scriptName) {
    return new Promise((resolve, reject) => {
        console.log(`\n=== Running ${scriptName} ===\n`);
        
        const process = spawn('node', [scriptName], {
            stdio: 'inherit'
        });

        process.on('close', (code) => {
            if (code === 0) {
                console.log(`\n=== ${scriptName} completed successfully ===\n`);
                resolve();
            } else {
                console.error(`\n=== ${scriptName} failed with code ${code} ===\n`);
                reject(new Error(`Script failed with code ${code}`));
            }
        });

        process.on('error', (err) => {
            console.error(`\n=== Error running ${scriptName}: ${err} ===\n`);
            reject(err);
        });
    });
}

async function runAll() {
    try {
        // Run scripts in sequence
        await runScript('convertToWebP.js');
        await runScript('updateImageReferences.js');
        await runScript('moveNonWebPImages.js');
        
        console.log('\n=== All scripts completed successfully ===\n');
    } catch (error) {
        console.error('\n=== Error running scripts ===\n', error);
        process.exit(1);
    }
}

runAll(); 