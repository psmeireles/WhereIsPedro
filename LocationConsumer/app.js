const https = require('https');


console.log('Comecando');

function getLocation() {
    console.log('GET');
    https.get('https://shielded-hamlet-69581.herokuapp.com/api/location', function (resp) {
        let data = '';
        console.log('a');
        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
        });
        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            console.log(JSON.parse(data));
        });
    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
}

getLocation();
setInterval(getLocation, 60 * 1000);