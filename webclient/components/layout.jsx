import React from 'react';
import io from 'socket.io-client';
import TweetCard from './tweetCard';
import {Card, Image} from 'semantic-ui-react';
import mail from '../../images/mail.gif'
const ReactToastr = require('react-toastr');
const {ToastContainer} = ReactToastr;
const ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);
export default class Layout extends React.Component {
  constructor() {
    super();
    this.state = {
      tweets: []
    }
    this.newFeedAlert = this.newFeedAlert.bind(this);
    this.unreadFeedAlert = this.unreadFeedAlert.bind(this);
    this.handleUnreadTweets = this.handleUnreadTweets.bind(this);
    this.handleNewTweets = this.handleNewTweets.bind(this);
  }//end of constructor
	//used ReactToastr to notify new feed
  newFeedAlert() {
    this.refs.container.success('You have a new tweet', '', {
      timeOut: 1000,
      extendedTimeOut: 10000
    });
  }//end of newFeedAlert
	//used ReactToastr to notify unread feed
  unreadFeedAlert(length) {
    this.refs.container.success('You have ' + length + ' unread feeds', '', {
      timeOut: 1000,
      extendedTimeOut: 10000
    });
  }//end of unreadFeedAlert
	//will be invoked in componentWillMount
  handleUnreadTweets(unreadTweets) {
    this.setState((prevState, prop) => ({tweets: prevState.tweets.concat(unreadTweets)}));
    if (unreadTweets.length > 0)
      this.unreadFeedAlert(unreadTweets.length)
  }//end of handleUnreadTweets
	//will be invoked in componentDidMount
  handleNewTweets(newTweet) {
    this.setState((prevState, prop) => {
      prevState.tweets.unshift(newTweet);
      return {tweets: prevState.tweets}
    });
    this.newFeedAlert(newTweet.length)
  }//end of handleNewTweets
	//adding listener for unread feed in componentWillMount using socketio
  componentWillMount() {
    this.socket = io();
    this.socket.on('unread tweets', function(unreadTweets) {
      this.handleUnreadTweets(unreadTweets)
    }.bind(this))
  }//end of componentWillMount
	//adding listener for new feed in componentDidMount using socketio
  componentDidMount() {
    this.socket.on('chat message', function(newTweet) {
      this.handleNewTweets(newTweet)
    }.bind(this));
  }//end of componentDidMount

  render() {
    var tweetPortlets;
		//used map functions to group the tweet cards
    if (this.state.tweets.length > 0)
      tweetPortlets = this.state.tweets.map((tweet) => {
        return <TweetCard tweet={tweet}/>
      })
    else
      tweetPortlets = <div style={{backgroundImage: "url(" + mail + ")",height: '80vh'}}><p>Tweets on their wy to screen..</p></div>

    return (
      <div>
        <div style={{
          width: '960px',
          marginLeft: "15%"
        }}>
          {tweetPortlets}
        </div>
        <ToastContainer ref='container' toastMessageFactory={ToastMessageFactory} className='toast-bottom-center'/>
      </div>
    );
  }//end of render
} //end of class
