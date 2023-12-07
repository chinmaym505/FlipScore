const express = require("express");
const console = require("console");
const app = express();
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
var start = 0;
var tempo = 0;
app.get("/",(req,res) => {
res.send("welcome!");
});
app.get("/pages/music-1.png",(req,res) => {
res.sendFile(__dirname+'/pages/music-1.png')
});
app.get("/pages/music-2.png",(req,res) => {
    res.sendFile(__dirname+'/pages/music-2.png')
    });
app.get("/data", (req, res) => {
    start = 1;
    tempo = req.query.tempo;
    console.log(tempo);
    console.log(start);
});
app.get('/data2', (req, res) => {
 
    res.json({tempo:tempo}); // pass the data variable as the argument
  });
app.get("/musician", (req, res) => {
    
    waitForCondition(function() {
        // Check if the start variable is equal to 1
        return start == 1;
    },function(){
        // This will only execute when the start variable is equal to 1
        res.sendFile(__dirname + "/musician.html");
    });
    
});
app.get("/conductor", (req, res) => {
    res.sendFile(__dirname + "/conductor.html");
});

app.listen(3000, () => {
    console.log("App listening on port 3000");
});