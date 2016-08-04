
var f = require('./call-dist-firebase.js')

function log(callLog) {
    //TODO add call log to list of call logs for answerer and entity?
    var newPhoneCallLog = f.child('phonecalls').push(callLog).toString();

    return newPhoneCallLog;
}

module.exports = {
    log: log
};