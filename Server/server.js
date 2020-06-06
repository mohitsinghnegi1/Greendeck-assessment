// Import Express, and create a new instance of Express.
const express = require('express');
const app = express();
const path = require('path');
const express = require('express');
const app = express();

// I am using port 3000 on my local environment; however,
// Heroku will assign a port for your app after deploying it, so both cases should be covered.
const port = process.env.PORT || 3000;

// we pass in all of the pieces of the path, and path.join puts them together
const publicPath = path.join(__dirname, '..', 'public');

// Tell Express to serve up the public folder and everything inside of it.
// Passing publicPath Express will know which files to serve.
app.use(express.static(publicPath));

// below code will  make sure your index.html file is served, in case the user requests a resource currently not in the public folder.
app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}!`);
});
