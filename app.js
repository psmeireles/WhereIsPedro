const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const fs = require('fs');

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//app.use(express.static(path.join(__dirname, 'client')));

app.get('/api/location', (req, res) => {
    fs.readFile('location.json', "utf8", function(err, data) {
        if (err) throw err;
        return res.send(data);
    });
});

app.post('/api/location', (req, res) => {
    var data = {
        lat: req.query.lat,
        long: req.query.longitude,
        time: req.query.time,
        speed: req.query.s
    }
    var jsonData = JSON.stringify(data);
    fs.writeFile("location.json", jsonData, function(err) {
        if (err) {
            return res.send(err);
        }
        else{
            return res.send(data);
        }
    });
});


const port = process.env.PORT || '4000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Running on localhost: ${port}`));