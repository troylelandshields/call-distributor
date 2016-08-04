var _ = require('lodash');
var f = require('./call-dist-firebase.js')

var answererQueue = []

var listen = function() {
    f.child("answerers").on("value", function(snapshot){
        answererQueue = _.values(snapshot.val())
    });
}

var initPromise = new Promise(function (resolve, reject) {
    f.child("answerers").once("value").then(function (snapshot) {
        answererQueue = _.values(snapshot.val())
      
        resolve(answererQueue);

        listen()
    });
});

//So ugly, but whatever. As long as we have a function that returns a promise for an answerer we can change the implementation later.
function getAnswerer() {
    var deferred = new Promise(function (resolve, reject) {
        initPromise.then(function (snapshot) {
            numAnswerers = answererQueue.length
            answererIndex = Math.floor(Math.random() * numAnswerers);
            resolve(answererQueue[answererIndex]);
        });
    });
    return deferred
}

module.exports = {
    getAnswerer: getAnswerer
};