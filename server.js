const express = require("express");
const console = require("console");
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://Web_App:MBagqM4A9sB0EvsJ@cluster0.va4jut6.mongodb.net/?retryWrites=true&w=majority";
const app = express();
app.use(express.json());
function waitForCondition(condition, action) {
    // Check if the condition is true
    if (condition()) {
        // If true, execute the action
        action();
    } else {
        // If false, wait for 100 milliseconds and check again
        setTimeout(waitForCondition.bind(null, condition, action), 100);
    }
}
async function checkUser(username,password,model){
    console.log(JSON.stringify({username: username, password: password}));
    const a=await model.countDocuments(JSON.stringify({username: username, password: password}));
    await client.close();
    return a>0;
}
var start = 0;
var tempo = 0;
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
client.connect()
    .then(client => {
        console.log('Connected to MongoDB database!');
    })
    .catch(err => {
        console.error(err);
    });
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/home.html");
});
app.get("/pages/music-1.png", (req, res) => {
    res.sendFile(__dirname + '/pages/music-1.png')
});
app.get("/pages/music-2.png", (req, res) => {
    res.sendFile(__dirname + '/pages/music-2.png')
});

app.get("/musician", (req, res) => {

    waitForCondition(function () {
        // Check if the start variable is equal to 1
        return start == 1;
    }, function () {
        // This will only execute when the start variable is equal to 1
        res.sendFile(__dirname + "/musician.html");
    });

});
app.get("/conductor", (req, res) => {
    res.sendFile(__dirname + "/conductor.html");
});
app.get("/login", (req, res) => {
    res.sendFile(__dirname + "/login.html")
});
app.get("/signup", (req, res) => {
    res.send("sign up page")
});
app.get("/data", (req, res) => {
    start = 1;
    tempo = req.query.tempo;
    console.log(tempo);
    console.log(start);
});
app.get('/data2', (req, res) => {

    res.json({ tempo: tempo }); // pass the data variable as the argument
});
app.post('/data3', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
  
    // Print the data to the console
    console.log(`Name: ${username}`);
    console.log(`Email: ${password}`);
    const db = client.db('User_Data');
    const collection = db.collection('Authentication');
    res.send(checkUser(username,password,collection));
});
app.listen(3000, () => {
    console.log("App listening on port 3000");
});