const express = require('express');
const app = express();
const path = require('path');

// Define the root directory for serving static files
const publicDirectory = path.join(__dirname, 'static'); // Updated to 'static' directory

// Serve static files from the 'static' directory
app.use(express.static(publicDirectory));

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Define your routes here
app.get('/', (req, res) => {
  res.sendFile('index.html', { root: publicDirectory });
});