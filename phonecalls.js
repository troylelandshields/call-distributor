
var f = require('./call-dist-firebase.js')

function log(callLog) {
    //TODO add call log to list of call logs for answerer and entity?
    var newPhoneCallLogUrl = f.child('phonecalls').push(callLog).toString();
    var newPhoneCallLogSplit = newPhoneCallLogUrl.split("/")
    var newPhoneCallLog = newPhoneCallLogSplit[newPhoneCallLogSplit.length-1]

    return newPhoneCallLog;
}

function ended(key, data) {
    console.log(key, data)
    // f.child('phonecalls/'+logUrl)
}

module.exports = {
    log: log,
    ended: ended
};