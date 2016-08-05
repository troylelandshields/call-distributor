var _ = require('lodash');
var f = require('./call-dist-firebase.js')

//This is all the worst
var answererQueue = []

var listen = function() {
    f.child("availableAnswerers").on("value", function(snapshot){
        answererQueue = [];
        snapshot.forEach(function(childSnapshot){
            console.log(childSnapshot.key)
            answererQueue.push(childSnapshot.key);
        });
    });
}
listen()

//So ugly, but whatever. As long as we have a function that returns a promise for an answerer we can change the implementation later.
function getAnswerer() {
    var deferred = new Promise(function (resolve, reject) {
            numAnswerers = answererQueue.length
            answererIndex = Math.floor(Math.random() * numAnswerers);
            console.log("Resolving answerer.")
            console.log(answererQueue[answererIndex])
            f.child("answerers/"+answererQueue[answererIndex]).once("value", function(snapshot){
                var answerer = snapshot.val();
                answerer.id = snapshot.key;
                console.log(answerer)
                resolve(answerer)
            })
    });
    return deferred
}

module.exports = {
    getAnswerer: getAnswerer
};