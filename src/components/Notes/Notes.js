import React, { Component } from "react";
import NotesList from "../NotesList/NotesList";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
// import Button from "@material-ui/core/Button";
import { Button, Icon } from "semantic-ui-react";
// import AddIcon from "@material-ui/icons/Add";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  addToDB,
  removeFromDB,
  logOut,
  fetchFromDB,
} from "../../firebase/firebase";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const styles = (theme) => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 500,
    overflow: "hidden",
  },
});

class Notes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      open: false,
      title: null,
      content: null,
    };
  }

  addNote = () => {
    var date = new Date();
    var timestamp =
      date.getDate() +
      "/" +
      (date.getMonth() + 1) +
      " | " +
      date.getHours() +
      ":" +
      date.getMinutes() +
      ":" +
      date.getSeconds();
    console.log(timestamp);
    var note = {};
    note["title"] = this.state.title;
    note["timestamp"] = timestamp;
    note["content"] = this.state.content;
    var key = addToDB(note);
    note["key"] = key;
    var notes = this.state.notes;
    notes.push(note);
    this.setState({
      notes: notes,
    });
    this.handleClose();
  };

  removeNote = (noteKey) => {
    var notes = this.state.notes;
    console.log(noteKey);
    for (var i = 0; i < Object.keys(notes).length; ++i) {
      if (notes[i].key === noteKey) {
        notes.splice(i, 1);
        removeFromDB(noteKey);
        this.setState({
          notes: notes,
        });
        return;
      }
    }
  };

  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleClose = () => {
    this.setState({
      open: false,
      title: "",
      content: "",
    });
  };

  handleChange = (name) => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  logOut = () => {
    localStorage.removeItem("LOCAL_UID");
    logOut();
    this.props.history.push("/");
  };
  componentWillMount() {
    fetchFromDB().then((notes) => {
      this.setState({
        notes: notes,
      });
    });
  }
  render() {
    const { classes } = this.props;
    const AddButtonStyle = {
      position: "fixed",
      right: "4%",
      bottom: "6%",
    };
    return (
      <div>
        {localStorage.getItem("LOCAL_UID") !== undefined ? (
          <div className="Dashboard">
            <Grid container spacing={0}>
              <Grid item xs={12} className="NavBar">
                <AppBar className="AppBar" position="fixed">
                  <Toolbar className='appbar'>
                    <h1>My Notes</h1>

                    <Button
                      variant="contained"
                      onClick={this.logOut}
                      style={{ position: "fixed", right: "12px" }}
                    >
                      Log Out
                    </Button>
                  </Toolbar>
                </AppBar>
              </Grid>
              <br />
              <br />
              <br />
              <Grid
                item
                xs={12}
                className="Notes"
                style={{ marginTop: "20px" }}
              >
                {this.state.notes.map((note) => (
                  <NotesList removeNote={this.removeNote} note={note} />
                ))}
                <br />
                <br />
              </Grid>
            </Grid>
            <Button
              basic
              animated="vertical"
              onClick={this.handleClickOpen}
              style={AddButtonStyle}
              aria-label="Add"
            >
              <Button.Content hidden> Add </Button.Content>
              <Button.Content visible>
                <Icon name="add" />
              </Button.Content>
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
                  onChange={this.handleChange("title")}
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
                    onChange={this.handleChange("content")}
                    margin="normal"
                  />
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose} basic negative>
                  Cancel
                </Button>
                <Button onClick={this.addNote} basic positive>
                  Add
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        ) : (
          <h1>Please log in to continue</h1>
        )}
      </div>
    );
  }
}

Notes.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Notes);
