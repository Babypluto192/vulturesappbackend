const express = require('express');
const path = require('path');
const fs = require('fs');
const unzipper = require('unzipper');

const app = express();
app.use(express.json());


app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log("Server started on " + PORT);
});

app.get('/tracks', async (req, res) => {
    const zipPath = path.join(__dirname, 'public', 'Vultures.zip');
    const extractPath = path.join(__dirname, 'public', 'tracks');


    if (!fs.existsSync(extractPath)) {
        fs.mkdirSync(extractPath, { recursive: true });
    }


    fs.createReadStream(zipPath)
        .pipe(unzipper.Extract({ path: extractPath }))
        .on('close', () => {
            console.log('Extraction complete. Files:');
            fs.readdir(extractPath, (err, files) => {
                if (err) {
                    console.error('Failed to read extracted files', err);
                    return res.status(500).json({ error: 'Failed to read extracted files' });
                }
                files.forEach(file => console.log(file));
                const fileUrls = files.map(file => ({
                    fileName: file,
                    fileURL: `/tracks/${file}`
                }));
                res.json(fileUrls);
            });
        })
        .on('error', (err) => {
            console.error('Failed to unzip the file', err);
            res.status(500).json({ error: 'Failed to unzip the file' });
        });
});

app.use('/tracks', express.static(path.join(__dirname, 'public', 'tracks')));
