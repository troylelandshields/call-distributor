
var express = require('express');
var app = express();
var answerers = require('./answerers.js')
var friends = require('./friends.js')
var phonecalls = require('./phonecalls.js')
var url = require('url');
var bodyParser = require('body-parser');


app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodi

//Endpoint that is called when a new phone call comes in
app.post("/phonecall/incoming", function (req, res) {
    var phoneCallData = req.body;
    console.log("Phone call:", phoneCallData);

    var recipientNum = phoneCallData.To;

    //TODO figure out howt o get the phone number for the business from the call
    var associatedPhoneNumber = recipientNum

    //get a promise for an answerer 
    answererPrm = answerers.getAnswerer()

    //TODO: Figure out what target entity the caller is trying to reach and if the phone should be answered right now
    friendPrm = friends.getFriend(associatedPhoneNumber.replace("+", ""))

    //TODO: SMS instructions on how to handle call to answerer

    //When all promises are resolved, forward call
    Promise.all([answererPrm, friendPrm]).then(function (values) {
        answerer = values[0];
        friend = values[1];

        var answererPhoneNum = answerer.phoneNumber;
        console.log("Directing phone call to:", answererPhoneNum);

        var promptPromise = friends.getPrompt(friend.prompt);
        promptPromise.then(function (prompt) {


            logRefUrl = phonecalls.log({
                answerer: answerer.id,
                friend: friend.id,
                startTime: Date.now(),
                phoneCallData: phoneCallData
            });

            res.send(`<Response>
                        <Sms to="+`+ answererPhoneNum + `" from="+14352222772">
                            `+ prompt.text + `
                        </Sms>
                        <Dial callerId="Lindsay" action="/phonecall/ended?log=` + encodeURIComponent(logRefUrl) + `">
                            <Number statusCallbackEvent="answered" statusCallback="/phonecall/answered?" statusCallbackMethod="POST">+`+ answererPhoneNum + `</Number>
                        </Dial>
                    </Response>`);

            //Use this to test receiving a phonecall without being charged
            // res.send(`<Response>
            //             <Reject />
            //         </Response>`);
        });
    });
});

app.post("/phonecall/ended", function (req, res) {
    var calllog = req.query.log;

    if (calllog) {
        phonecalls.ended(calllog, {
            endTime: Date.now()
        });
    }
});

app.post("/phonecall/answered", function (req, res) {
    console.log('response', res.data);
    console.log('request', req.body);
});

app.post("/text/incoming", function (req, res) {
    console.log('response', res.data);
    console.log('request', req.body);
});
