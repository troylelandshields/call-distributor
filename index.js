// //require the Twilio module and create a REST client
// var client = require('twilio')('AC557fcb165d86419458c2692716202b92', 'bd2a9a5491aea94fd2d5083bf3062f96');


// //Place a phone call, and respond with TwiML instructions from the given URL
// client.makeCall({

//     to:'+16515556677', // Any number Twilio can call
//     from: '+14506667788', // A number you bought from Twilio and can use for outbound communication
//     url: '' // A URL that produces an XML document (TwiML) which contains instructions for the call

// }, function(err, responseData) {

//     //executed when the call has been initiated.
//     console.log(responseData.from); // outputs "+14506667788"

// });

var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

// app.use(express.static(__dirname + '/public'));

// // views is directory for all template files
// app.set('views', __dirname + '/views');
// app.set('view engine', 'ejs');

// app.get('/', function(request, response) {
//   response.render('pages/index');
// });


//Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({ "error": message });
}

app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});

app.post("/phonecall/incoming", function (req, res) {
    var phoneCall = req.body;

    console.log("req:", req)

    //Figure out who the call is for and what instructions they have for the answerer

    //Figure out who to forward the call to.
    res.send(`<Response>
                <Dial callerId="14155318437">
                    <Number>+14355122398</Number>
                </Dial>
            </Response>`);
});

