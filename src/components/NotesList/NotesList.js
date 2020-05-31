import React, { Component } from "react";
import "./NotesList.css";
import { Card,Icon } from "semantic-ui-react";
// import Paper from '@material-ui/core/Paper';
// import DeleteForeverSharpIcon from '@material-ui/icons/DeleteForeverSharp';

class NotesList extends Component {
  render() {
    return (
      <div className="note">
      <Card
    fluid
    color='violet'
  className='paper'
  >
  <Card.Content>
  <Card.Header id='title' >{ this.props.note.title }</Card.Header>
  <Card.Meta id='timestamp'>{ this.props.note.timestamp } </Card.Meta>
  <Card.Description id='content'>{ this.props.note.content } <Icon id='delete' name="delete" onClick={ () => this.props.removeNote(this.props.note.key) }/></Card.Description>
 
  </Card.Content>

  </Card>
      </div>
    );
  }
}

export default NotesList;

