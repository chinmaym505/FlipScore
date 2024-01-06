const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Use body-parser middleware to parse URL-encoded request bodies
app.use(bodyParser.urlencoded({ extended: false }));

// Define a route handler for GET requests that sends an HTML form
app.get('/', (req, res) => {
res.sendFile(__dirname+"/jj.html")
});

// Define a route handler for POST requests that prints the data to the console and sends a response
app.post('/submit', (req, res) => {
  // Access the data from the request body
  const name = req.body.name;
  const email = req.body.email;

  // Print the data to the console
  console.log(`Name: ${name}`);
  console.log(`Email: ${email}`);
  console.log();
  // Send a response to the client with the data
  res.send(JSON.stringify({name: name, email: email}));
});

// Start the server on port 3000
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
