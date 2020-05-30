import React, { Component } from 'react';
import NotesList from '../NotesList/NotesList';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
 
function Transition(props) {
 return <Slide direction="up" {...props} />;
}
 
const styles = theme => ({
 textField: {
   marginLeft: theme.spacing.unit,
   marginRight: theme.spacing.unit,
   width: 500,
   overflow: 'hidden',
 },
});
 
class Notes extends Component {
 constructor(props) {
   super(props);
   this.state = {
     notes: [
       {
         title: 'Hello, World',
         timestamp: '11 June 2018',
         content: "This is your first note",
       },
       {
         title: 'Hey There',
         timestamp: '22 May 2016',
         content: "This is your second note",
       },
     ],
     open: false,
     title: null,
     content: null,
   };
 }
 
 addNote = () => {
   var date = new Date();
   var timestamp = date.getDate() + '/' + (date.getMonth() + 1) + ' | ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
   console.log(timestamp);
   var note = {};
   note['title'] = this.state.title;
   note['timestamp'] = timestamp;
   note['content'] = this.state.content;
   this.state.notes.push(note);
   console.log(this.state);
   this.handleClose();
 }
 
 handleClickOpen = () => {
   this.setState({
     open: true,
   });
 };
 
 handleClose = () => {
   this.setState({
     open: false,
     title: '',
     content: '',
   });
 };
 
 handleChange = name => event => {
   this.setState({
     [name]: event.target.value,
   });
 };
 
 
 render () {
   const { classes } = this.props;
   const AddButtonStyle = {
     position: 'fixed',
     right: '4%',
     bottom: '6%',
   };
   return (
     <div className="Dashboard">
       <Grid container spacing={0}>
         <Grid item xs={12} className="NavBar">
           <AppBar className="AppBar" position="fixed">
             <Toolbar>
               <h1>My Notes</h1>
             </Toolbar>
           </AppBar>
         </Grid>
         <br />
         <br />
         <br />
         <Grid item xs={12} className="Notes" style={{ marginTop:'20px' }}>
           { this.state.notes.map(note => <NotesList note={ note } /> )}
           <br />
           <br />
         </Grid>
       </Grid>
       <Button className='AddButton' onClick={this.handleClickOpen} style={ AddButtonStyle } variant="fab" color="primary" aria-label="Add">
         <AddIcon />
       </Button>
       <Dialog
         open={this.state.open}
         TransitionComponent={Transition}
         keepMounted
         onClose={this.handleClose}
         aria-labelledby="alert-dialog-slide-title"
         aria-describedby="alert-dialog-slide-description"
       >
         <DialogTitle id="alert-dialog-slide-title">
             <TextField
               id="itle"
               label="Title"
               placeholder="Note Title"
               className={classes.textField}
               value={this.state.title}
               onChange={this.handleChange('title')}
               margin="normal"
             />
         </DialogTitle>
         <DialogContent>
           <DialogContentText id="alert-dialog-slide-description">
           <TextField
             id="content"
             label="Content"
             placeholder="Add your note here"
             multiline
             value={this.state.content}
             className={classes.textField}
             onChange={this.handleChange('content')}
             margin="normal"
           />
           </DialogContentText>
         </DialogContent>
         <DialogActions>
           <Button onClick={this.handleClose} color="secondary">
             Cancel
           </Button>
           <Button onClick={this.addNote} color="primary">
             Add
           </Button>
         </DialogActions>
       </Dialog>
     </div>
   );
 }
}
 
Notes.propTypes = {
 classes: PropTypes.object.isRequired,
};
 
export default withStyles(styles)(Notes);