
var f = require('./call-dist-firebase.js')

function log(callLog) {
    //TODO add call log to list of call logs for answerer and entity?
    var newPhoneCallLogUrl = f.child('phonecalls').push(callLog).toString();
    var newPhoneCallLogSplit = newPhoneCallLogUrl.split("/")
    var newPhoneCallLog = newPhoneCallLogSplit[newPhoneCallLogSplit.length-1]

    return newPhoneCallLog;
}

function ended(key, data) {
    f.child('phonecalls').child(key).child('ended').set(data.endTime);
}

module.exports = {
    log: log,
    ended: ended
};