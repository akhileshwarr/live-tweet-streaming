import {Layout,Book} from '../../components';
import React, { Component } from 'react'
import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react'
export default class Home extends React.Component {
  state = { visible: false,element:"layout" }

  toggleVisibility = () => this.setState({ visible: !this.state.visible })
	handleTwitterClick = () => this.setState({ element: "layout" })
	handleBookClick = () => this.setState({ element: "book" })

  render() {
    const { visible,element } = this.state
    return (
      <div style={{height:"90vh"}}>
        <Button onClick={this.toggleVisibility}>Toggle Home</Button>
        <Sidebar.Pushable as={Segment}>
          <Sidebar as={Menu} animation='overlay' width='thin' visible={visible}  vertical inverted>
            <Menu.Item >
						<Button icon color='black' onClick={this.handleTwitterClick}>
						    <Icon name='twitter' />twitter
						  </Button>
            </Menu.Item>
						<Menu.Item >
						<Button icon color='black' onClick={this.handleBookClick}>
						    <Icon name='book' />book
						  </Button>
            </Menu.Item>
          </Sidebar>
          <Sidebar.Pusher>
            <Segment basic  className="ScrollbarContent--custom">
						{(element=="layout")?<Layout/>:<Book/>}
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    )
  }
}
