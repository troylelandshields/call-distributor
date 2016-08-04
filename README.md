# call distributor - a sidepiece project!

A heroku Twiml app that will redirect phone calls.

Deploy this to a heroku app and environment variables by running the following command:

`heroku config:set FROM_NUM=19992223333`

FROM_NUM is the caller ID that will be shown

Set up the endpoint `https://my-heroku-app.herokuapp.com/phonecall/incoming` to handle incoming calls for your phone number and enjoy some nice call distribution.