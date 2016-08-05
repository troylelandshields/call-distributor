
var f = require('./call-dist-firebase.js')

function getFriend(phoneNum) {
    friendPromise = new Promise(function (resolve, reject) {
        f.child('phonenumbers/' + phoneNum).once('value').then(function (snapshot) {
            phoneNumberData = snapshot.val();

            if (phoneNumberData.ownerType == 'entity') {
                f.child('entities/'+phoneNumberData.owner).once('value').then(function(snapshot){
                    ownerData = snapshot.val();
                    ownerData.id = snapshot.key;

                    console.log("Resolving friend.")
                    resolve(ownerData);
                });
            } else {
                reject("Nope:", phoneNumberData)
            }
        });
    });

    return friendPromise;
}



function getPrompt(promptID) {
    promptPromise = new Promise(function (resolve, reject) {
        f.child('prompts/' + promptID).once('value').then(function (snapshot) {
            console.log("getting the prompt from firebase");
            resolve(snapshot.val());
        });
    });

    return promptPromise;
}

module.exports = {
    getFriend: getFriend,
    getPrompt: getPrompt
};