var path = require('path');
webpack = require('webpack'),
express = require('express'),
bodyParser = require('body-parser'),
mongoose = require('mongoose'),
webpackDevMiddleware = require('webpack-dev-middleware'),
webpackHotMiddleware = require('webpack-hot-middleware'),
webpackConfig = require('./webpack.config'),
config = require('./config/config')
app = express(),
compiler = webpack(webpackConfig),
Twitter = require('twitter');
const tweetHandler = require('./webserver/utils/tweetHandler.jsx');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', express.static(path.join(__dirname, './webclient/')));

//connection to mongodb using mongoose
console.log(config)
var db = config.dburl;
mongoose.connect(db);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connnected with mongo");
});
//configuring webpackDevMiddleware
app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true
  },
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  }
}));
//using webpackHotMiddleware for autobuilding of webpack
app.use(webpackHotMiddleware(compiler));
//Listening to port 8080
var server = app.listen(config.port, config.host, function(err, result) {
  if (err) {
    console.error("Error ", err);
  }
  console.log("Server started at " + config.port);
});

//setting up twitter stream
var client = new Twitter(config.twitter)
global.io = require('socket.io')(server);
io.on('connection',tweetHandler.ioConnectionCB)
client.stream('statuses/filter', {
  track: 'javascript',
  lang: 'en'
}, tweetHandler.twitterStreamCB);
