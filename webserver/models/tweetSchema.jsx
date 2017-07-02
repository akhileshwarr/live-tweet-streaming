var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var tweetSchema=mongoose.Schema({
  text:String,
  user:{
    name:String,
    screen_name:String,
    location:String,
    profile_image_url_https:String
  }
  })
  module.exports=mongoose.model('tweet',tweetSchema);
