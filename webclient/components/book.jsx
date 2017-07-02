import React, { Component } from 'react'
import { Input, Button} from 'semantic-ui-react'

export default class Book extends React.Component {
  constructor() {
    super();
    this.state = {
    }
}
render() {
  return(
    <div style={{marginLeft:'15%'}}>
  <Input
  action={{ color: 'teal', labelPosition: 'left', icon: 'book', content: 'Chapter' }}
  actionPosition='left'
  placeholder='ChapterName'
/><Button>Add Chapter</Button></div>)
}
}
