var Queue = require('firebase-queue');
var f = require('./call-dist-firebase.js')



var ref = f.child('queue');

var options = {
  'specId': 'new_answerer',
  'numWorkers': 5
};

var newAnswererQueue = new Queue(ref, options, function (data, progress, resolve, reject) {
  // Read and process task data
  console.log(data);

  //TODO validate the phone number
  if (!data.phoneNumber) {
    console.log("rejecting");
    reject("Invalid data")
    return
  }

  f.child("phonenumbers").child(data.phoneNumber).once("value").then(function (snapshot) {
    if (snapshot.exists()) {
      console.log("Phone number exists!")
      reject("phone number exists")
      return
    }

    var answerer = {
      availability: false,
      phoneNumber: data.phoneNumber
    }

    var phoneNumber = {
      ownerType: "answerer"
    }

    var answererKey = f.child("answerers").push(answerer).key;

    phoneNumber.owner = answererKey
    f.child("phonenumbers").child(data.phoneNumber).set(phoneNumber)

    resolve(answerer);
  });
});