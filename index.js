'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()

app.set('port', (process.env.PORT || 5000))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// parse application/json
app.use(bodyParser.json())

// index
app.get('/', function (req, res) {
	res.send('hello world i am a secret bot')
})

// for facebook verification
app.get('/webhook/', function (req, res) {
	if (req.query['hub.verify_token'] === 'my_voice_is_my_password_verify_me') {
		res.send(req.query['hub.challenge'])
	}
	res.send('Error, wrong token')
})

// to post data
app.post('/webhook/', function (req, res) {
	

	let messaging_events = req.body.entry[0].messaging

	for (let i = 0; i < messaging_events.length; i++) {
		let event = req.body.entry[0].messaging[i]
		let sender = event.sender.id
		if (event.message && event.message.text) {
			let text = event.message.text
			if (text === 'Hello') {
				sendGenericMessage(sender)
				continue
			}
			if (text === 'Postback') {
					sendTextMessageA(sender, "cool!!! Based on your current location we recommended few places here! ", token)
				
				continue
			}

			sendTextMessage(sender, "Text received, echo: " + text.substring(0, 200))
		}
		if (event.postback) {
			let text = JSON.stringify(event.postback)
//	 sendTextMessage(sender, "Postback received: "+text.substring(0, 200), token)
	//sendTextMessage(sender, "text", token)

	//	sendGenericMessage(sender)
		

var senderID = event.sender.id;
  var recipientID = event.recipient.id;
  var timeOfPostback = event.timestamp;

  // The 'payload' param is a developer-defined field which is set in a postback 
  // button for Structured Messages. 
  var payload = event.postback.payload;

if(payload==='home')
{
sendTextMessageA(sender, "Will share you the location shortly ", token)
}
else{
sendGenericHomeMessage(sender)
}
		
 // receivedPostback(messagingEvent);     
//	sendTextMessageB(sender, "cool based on your current location we recommended few place near to your location ",text, token)
 //sendTextMessage(sender, "tank you for your interest ", token)
	//sendGenericAppoinmentMessage(sender)
//sendTextMessageA(sender, "Have a nice Time ", token)

			continue
				
		}




	}
	res.sendStatus(200)
})







//heroku config:set FB_PAGE_ACCESS_TOKEN=EAAaR3YFqStUBAGkbrURhmj7UZCNzOZATNT7FboByCfFPHaotrPBnZCvszmcZBJrZBrnZAWssbidbwVXIhbWYZClIZBBXL5jMXRFLhgMYwvvjW9tfmZBFbeY4syKyuruEpczojEUtCAdAcGokNtx7pcstYfv1ZAZC51Ol924x4ZCnqmWTYgZDZD
// recommended to inject access tokens as environmental variables, e.g.
// const token = process.env.PAGE_ACCESS_TOKEN
const token = "EAAaR3YFqStUBAGkbrURhmj7UZCNzOZATNT7FboByCfFPHaotrPBnZCvszmcZBJrZBrnZAWssbidbwVXIhbWYZClIZBBXL5jMXRFLhgMYwvvjW9tfmZBFbeY4syKyuruEpczojEUtCAdAcGokNtx7pcstYfv1ZAZC51Ol924x4ZCnqmWTYgZDZD"



function sendTextMessage(sender, text) {
	let messageData = { text:text }
	if(messageData=== 'text')
{
	sendTextMessageA(sender, "cool!!! Based on your current location we recommended few places here! ", token)

}else{
	request({
		url: 'https://graph.facebook.com/v2.6/me/messages',
		qs: {access_token:token},
		method: 'POST',
		json: {
			recipient: {id:sender},
			message: messageData,
		}
	}, function(error, response, body) {
		if (error) {
			console.log('Error sending messages: ', error)
		} else if (response.body.error) {
			console.log('Error: ', response.body.error)
		}
	})

	}
}





function receivedPostback(event) {
  var senderID = event.sender.id;
  var recipientID = event.recipient.id;
  var timeOfPostback = event.timestamp;

  // The 'payload' param is a developer-defined field which is set in a postback 
  // button for Structured Messages. 
  var payload = event.postback.payload;

  console.log("Received postback for user %d and page %d with payload '%s' " + 
    "at %d", senderID, recipientID, payload, timeOfPostback);

  // When a postback is called, we'll send a message back to the sender to 
  // let them know it was successful
  sendTextMessage(senderID, "Postback called");
}







function sendTextMessageA(sender, text) {
	let messageData = { text:text }

	request({
		url: 'https://graph.facebook.com/v2.6/me/messages',
		qs: {access_token:token},
		method: 'POST',
		json: {
			recipient: {id:sender},
			message: messageData,
		}
	}, function(error, response, body) {
		if (error) {
			console.log('Error sending messages: ', error)
		} else if (response.body.error) {
			console.log('Error: ', response.body.error)
		}
	})


}


function sendTextMessageB(sender, text) {
	let messageData = { text:text }
	
	request({
		url: 'https://graph.facebook.com/v2.6/me/messages',
		qs: {access_token:token},
		method: 'POST',
		json: {
			recipient: {id:sender},
			message: messageData,
		}
	}, function(error, response, body) {
		if (error) {
			console.log('Error sending messages: ', error)
		} else if (response.body.error) {
			console.log('Error: ', response.body.error)
		}
	})
}

function sendGenericHomeMessage(sender)
 {
	let messageData = {
		"attachment": {
			"type": "template",
			"payload": {
				"template_type": "generic",
				"elements": [{
					"title": "2bhk @koramangala",
					"subtitle": "rent:25k",
					"image_url": "http://www.makandekho.com/Content_Home/img/a46c35e9-2d2a-4dc5-a308-34a4be89b33f.jpg",
					"buttons": [
				
					 {
						"type": "postback",
						"title": "Intrested",
						"payload": "home",
					}],
				}, {
					"title": "2bhk @ domlur",
					"subtitle": "rent:20k",
					"image_url": "http://images.locanto.in/1303838545/2-bhk-fully-furnished-flat-at-seetamamdhara_2.jpg",
					"buttons": [{
						"type": "postback",
						"title": "Intrested",
						"payload": "home",
					}],
				},
				{
					"title": "2bhk @koramangala",
					"subtitle": "rent:22k",
					"image_url": "http://www.makandekho.com/Content_Home/img/a46c35e9-2d2a-4dc5-a308-34a4be89b33f.jpg",
					"buttons": [
				
					 {
						"type": "postback",
						"title": "Intrested",
						"payload": "home",
					}],
				}
				
				]
			}
		}
	}
	request({
		url: 'https://graph.facebook.com/v2.6/me/messages',
		qs: {access_token:token},
		method: 'POST',
		json: {
			recipient: {id:sender},
			message: messageData,
		}
	}, function(error, response, body) {
		if (error) {
			console.log('Error sending messages: ', error)
		} else if (response.body.error) {
			console.log('Error: ', response.body.error)
		}
	})
}


function sendGenericAppoinmentMessage(sender) {

	let messageData = {
		"attachment": {
			"type": "template",
			"payload": {
				"template_type": "generic",
				"elements": [{
					"title": "Book an Appoinment",
					"subtitle": "",
					"buttons": [
					 	{
					 	"type": "postback",
					 	"payload": "Yes",
					 	"title": "No"
					 },
					 {
						"type": "postback",
						"title": "Yes",
						"payload": "Yes",
					}],
				}]
			}
		}
	}
	request({
		url: 'https://graph.facebook.com/v2.6/me/messages',
		qs: {access_token:token},
		method: 'POST',
		json: {
			recipient: {id:sender},
			message: messageData,
		}
	}, function(error, response, body) {
		if (error) {
			console.log('Error sending messages: ', error)
		} else if (response.body.error) {
			console.log('Error: ', response.body.error)
		}
	})
}



function sendGenericMessage(sender) {
	let messageData = {
		"attachment": {
			"type": "template",
			"payload": {
				"template_type": "generic",
				"elements": [{
					"title": "Seller",
					"subtitle": "click below to sell your property",
					"image_url": "http://kaytons.co.uk/wp-content/uploads/2016/05/sell-you-house-fast.jpg",
					"buttons": [
					// 	{
					// 	"type": "web_url",
					// 	"url": "https://www.messenger.com",
					// 	"title": "web url"
					// },
					 {
						"type": "postback",
						"title": "Postback",
						"payload": "seller",
					}],
				}, {
					"title": "To buy",
					"subtitle": "Click here to buy your dream property",
					"image_url": "http://excasa.com/wp-content/uploads/2015/03/House-In-Cart-1-1024x768.png",
					"buttons": [{
						"type": "postback",
						"title": "toBuy",
						"payload": "based on your current location we recommended few place near to your location",
					}],
				}]
			}
		}
	}
	request({
		url: 'https://graph.facebook.com/v2.6/me/messages',
		qs: {access_token:token},
		method: 'POST',
		json: {
			recipient: {id:sender},
			message: messageData,
		}
	}, function(error, response, body) {
		if (error) {
			console.log('Error sending messages: ', error)
		} else if (response.body.error) {
			console.log('Error: ', response.body.error)
		}
	})
}






// spin spin sugar
app.listen(app.get('port'), function() {
	console.log('running on port', app.get('port'))
})
