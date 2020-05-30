import React, { Component } from 'react';
import './NotesList.css';
import Paper from '@material-ui/core/Paper';
 
class NotesList extends Component {
 render() {
   console.log(this.props);
   return(
     <div className="Note">
       <Paper className="NotePaper" style={{ background:'lightgreen'}}>
         <br />
         <span id='title' > { this.props.note.title } </span> 
         <br />
         <span id='timestamp' > { this.props.note.timestamp } </span> 
         <br />
         <br />
         <span id='content' > { this.props.note.content } </span>
         <br /><br />
       </Paper> 
     </div>
   );
 }
}
 
export default NotesList;