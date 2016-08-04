
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

module.exports = {
    getFriend: getFriend
};