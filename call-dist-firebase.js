firebase = require('firebase')

//TODO make these configurable so we don't commit them to source control :/
var config = {
    apiKey: "AIzaSyANdTshfeci78-VI-m-NaGHu4BWMIMSn0U",
    authDomain: "call-distributor-dev.firebaseapp.com",
    databaseURL: "https://call-distributor-dev.firebaseio.com",
    storageBucket: "call-distributor-dev.appspot.com",
};

firebase.initializeApp(config);

f = firebase.database().ref();

module.exports = f