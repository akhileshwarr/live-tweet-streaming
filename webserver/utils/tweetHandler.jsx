var tweetSchema = require('../models/tweetSchema.jsx')
var connectionFlag = false; //discribes connection status of user to server

//to add tweets to database
function addTweetToDb(tweet) {
  var tweetEntry = new tweetSchema(tweet);
  tweetEntry.save(function(err) {
    if (err)
      console.log(err);
    else
      console.log("Saved to db");
    }
  )
}

//to retrive unread tweets from database
function retriveUnreadTweet(io) {
  tweetSchema.find((err, tweets) => {
    console.log(tweets);
    tweetSchema.remove((err, cont) => {
      console.log("all docs removed");
    })
    io.emit("unread tweets", tweets)
  })
}
//callback function for socket.io on event "connection"
function ioConnectionCB(socket) {
  console.log("connected")
  retriveUnreadTweet(global.io)
  connectionFlag = true;
  socket.on('disconnect', function() {
    console.log('user disconnected');
    connectionFlag = false;
  });
}
//callback function for twittersteam event.
function twitterStreamCB(stream) {
  stream.on('data', function(tweet) {
    if (!connectionFlag) {
      addTweetToDb(tweet)
      console.log(tweet.created_at, tweet.text);
    } else
      global.io.emit('chat message', tweet);
    }
  );
  stream.on('error', function(error) {
    console.log(error);
  });
}
module.exports = {
  addTweetToDb,
  retriveUnreadTweet,
  twitterStreamCB,
  ioConnectionCB
}
