const express = require('express');
const path = require('path');
const fs = require('fs');
const unzipper = require('unzipper');
const News = require('./News')
const Merch = require('./Merch')
const Concert = require("./Concert");
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

app.get('/vultures1', async (req, res) => {
    const zipPath = path.join(__dirname, 'public', 'Vultures.zip');
    const extractPath = path.join(__dirname, 'public', 'vultures1');


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
                files.sort((a, b) => {
                    const numA = parseInt(a.match(/\d+/), 10);
                    const numB = parseInt(b.match(/\d+/), 10);
                    return numA - numB;
                });
                files.forEach(file => console.log(file));
                const fileUrls = files.map(file => ({
                    fileName: file,
                    fileURL: `/vultures1/${file}`
                }));
                res.json(fileUrls);
            });
        })
        .on('error', (err) => {
            console.error('Failed to unzip the file', err);
            res.status(500).json({ error: 'Failed to unzip the file' });
        });
});

app.use('/vultures1', express.static(path.join(__dirname, 'public', 'vultures1')));

app.get('/prevultures', async (req, res) => {
    const zipPath = path.join(__dirname, 'public', 'Leaks.zip');
    const extractPath = path.join(__dirname, 'public', 'prevultures');


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
                    fileURL: `/prevultures/${file}`
                }));
                res.json(fileUrls);
            });
        })
        .on('error', (err) => {
            console.error('Failed to unzip the file', err);
            res.status(500).json({ error: 'Failed to unzip the file' });
        });
});

app.use('/prevultures', express.static(path.join(__dirname, 'public', 'prevultures')));


app.get('/badbook', async (req, res) => {
    const zipPath = path.join(__dirname, 'public', 'BadBook.zip');
    const extractPath = path.join(__dirname, 'public', 'badbook');


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
                    fileURL: `/badbook/${file}`
                }));
                res.json(fileUrls);
            });
        })
        .on('error', (err) => {
            console.error('Failed to unzip the file', err);
            res.status(500).json({ error: 'Failed to unzip the file' });
        });
});

app.use('/badbook', express.static(path.join(__dirname, 'public', 'badbook')));

app.get('/vultures2', async (req, res) => {
    const zipPath = path.join(__dirname, 'public', 'Vultures2.zip');
    const extractPath = path.join(__dirname, 'public', 'vultures2');


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
                    fileURL: `/vultures2/${file}`
                }));
                res.json(fileUrls);
            });
        })
        .on('error', (err) => {
            console.error('Failed to unzip the file', err);
            res.status(500).json({ error: 'Failed to unzip the file' });
        });
});

app.use('/vultures2', express.static(path.join(__dirname, 'public', 'vultures2')));


app.get('/news', (req, res) => {
    res.send(News)
});



app.get('/merch', (req, res) => {
    res.send(Merch)
});

app.get('/concert', (req, res) => {
    res.send(Concert)
});

app.use('/images',express.static(path.join(__dirname, 'public', 'images')))


app.use('/',express.static(path.join(__dirname, 'public', 'placeholder')))