// Dependencies
const express = require('express');
const path = require('path');

// Initialize the application
const app = express();

// Define a port number
const port = 5000;

// Define authorize middleware
const authorize = (req, res, next) => {
  const isAuth = true;
  if (isAuth) {
    next();
  } else {
    res.status(401).send('401 Not Authorized');
  }
};

// Middleware Express checkpoint
const requestTime = (req, res, next) => {
  const date = new Date();
  const day = date.getDay();
  const hours = date.getHours();

  if (day < 1 || day < 5 || hours < 9 || hours > 17) {
    return res.status(401).send('We are closed');
  }

  next();
};
// Serve the Home.html file as the default route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Home.html'));
  });

// Middleware use
app.use(requestTime);
app.use(authorize);



// Serve static files (CSS, JavaScript, etc.)
app.use(express.static(__dirname));

// Start the server
app.listen(port, () => console.log(`Server is running on port ${port}`));
