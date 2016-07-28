
var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});

//TODO: For now these are just configured in the environment variables, but really both of these will come from service calls
var fromNum = process.env.FROM_NUM
var toNum = process.env.TO_NUM
console.log("configured fromNum:", fromNum);
console.log("configured toNum:", toNum);

//Endpoint that is called when a new phone call comes in
app.post("/phonecall/incoming", function (req, res) {

    //TODO: get list of available answerers
    //TODO: Figure out what target entity the caller is trying to reach and if the phone should be answered right now
    //TODO: SMS instructions on how to handle call to answerer

    //Figure out who to forward the call to.
    res.send(`<Response>
                <Dial callerId="` + fromNum + `">
                    <Number>+`+ toNum + `</Number>
                </Dial>
            </Response>`);

    //Use this to test receiving a phonecall without being charged
    // res.send(`<Response>
    //             <Reject />
    //         </Response>`);
});

