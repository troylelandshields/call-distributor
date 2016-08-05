
var f = require('./call-dist-firebase.js')

function log(callLog) {
    //TODO add call log to list of call logs for answerer and entity?
    var newPhoneCallLog = f.child('phonecalls').push(callLog).key();

    return newPhoneCallLog;
}

function ended(logUrl) {
    console.log(logUrl)
    // f.child('phonecalls/'+logUrl)
}

module.exports = {
    log: log,
    ended: ended
};