import React from 'react'
import {Card, Image } from 'semantic-ui-react'
export default class TweetCard extends React.Component {
	constructor () {
		super();
		this.state = {
		}
	}
  render () {

    return(
      <Card style={{width: '100%'}}>
          <Card.Content>
            <Image floated='left' size='big' avatar='circular' src={this.props.tweet.user["profile_image_url_https"]} />
            <Card.Header style ={{fontSize: '15px', color: 'skyblue'}}>
              {this.props.tweet.user.name} &nbsp;<span style={{color: 'lightgrey'}}> @{this.props.tweet.user["screen_name"]}</span>
            </Card.Header>
            <Card.Meta style={{marginTop: '-0px'}}>
              { this.props.tweet.user["location"]}
            </Card.Meta>
            <Card.Description style={{clear: 'inherit'}}>
            {this.props.tweet.text}
             </Card.Description>

          </Card.Content>
          <Card.Content extra>

          </Card.Content>
        </Card>
    )
  }
}
