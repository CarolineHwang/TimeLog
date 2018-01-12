var http = require('http');
var fs = require('fs');
var formidable = require("formidable");
var util = require('util');

var server = http.createServer(function (req, res) {
    if (req.method.toLowerCase() == 'get') {
        displayForm(res);
    } else if (req.method.toLowerCase() == 'post') {
        processAllFieldsOfTheForm(req, res);
    }

});

function displayForm(res) {
    fs.readFile('index.html', function (err, data) {
        res.writeHead(200, {
            'Content-Type': 'text/html',
                'Content-Length': data.length
        });
        res.write(data);
    });
}

function processAllFieldsOfTheForm(req, res) {
    var form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {
        if(JSON.stringify(fields).length > 20) {
            var members = ["Stephanie Fu", "Luann Jung", "Leon Li", "Seth Higgins", "Alec McGlynn",
                           "Akash Aryal", "Sean Hackenberg", "Zach Paquette", "Jakob Hagemeister", "Mitchell Henry",
                           "Tori Neilson", "Zachary Kroll", "Michael Schmidt", "John Woods", "Matthew Ewers",
                           "Tejaswi Shrestha", "Allen Zhang", "Alice Le", "Isaiah Glymour", "Matthew Choi",
                           "Owen Stuckwisch", "Greg Chikan", "Andrew Suh", "Nicholas Hwang", "Sicheng Chen",
                           "Chris Chae", "Andrew Underwood", "Jerry Yan", "Peter Yan", "Rishi Govind",
                           "Isaac Castro", "Peyton Woods", "Rishi Govind", "Matt Culbertson", "Abbi Dougherty",
                           "Jonathan Hoepner", "Nathan Snowden", "Jacob Kirkeby", "Guwin Nilaweera", "Guwan Nilaweera",
                           "Spencer Raw", "Quinton Stephens", "Danny Tamura"];
            var idNumbers = [39717, 40928, 43305, 40862, 54905,
                             60021, 46243, 45451, 45509, 44683,
                             44446, 44511, 53566, 45593, 62317,
                             44957, 59224, 44192, 39068, 60709,
                             50934, 40902, 41844, 59129, 62924,
                             44067, 43425, 62014, 62013, 51177,
                             40892, 64728, 51177, 62316, 54331,
                             48211, 55673, 50704, 53950, 53949,
                             60617, 64936, 45580];

            var id = parseInt(((JSON.stringify(fields)).substring(13, 18)));
            var inOut = JSON.stringify(fields).substring(29, 32).replace(/['"]+/g, '');
            var name = members[idNumbers.indexOf(id)];
            var now = new Date();
            var date = (now.getMonth() + 1) + "-" + (now.getDate()) + "-" + (now.getFullYear());
            var time = (now.getHours() % 12) + ":" + (now.getMinutes()<10?'0':'') + now.getMinutes();
            var fs = require('fs');
            var csvWriter = require('csv-write-stream');

            var writer = csvWriter({sendHeaders: false});
            writer.pipe(fs.createWriteStream('log.csv', {flags: 'a'}));
            writer.write({name: name.replace(/['"]+/g, ''), id: id, inOutDate: date.replace(/['"]+/g, ''), inOut: inOut, inOutTime: time.replace(/['"]+/g, '')});
            writer.end();
        }
        else {

        }
    });
    res.writeHead(302, {
        'Location': 'app.js'
    });
    res.end();
}


server.listen(1185);
console.log("server listening on 1185");
