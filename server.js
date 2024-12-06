import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 80;

// Serve static files from the dist directory
app.use(express.static(join(__dirname, 'dist')));

// Handle all routes for SPA
app.get('*', (req, res) => {
    res.sendFile(join(__dirname, 'dist', 'index.html'));
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on port ${port}`);
    console.log(`Serving files from: ${join(__dirname, 'dist')}`);
});