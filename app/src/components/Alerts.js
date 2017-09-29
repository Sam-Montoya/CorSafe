import React from 'react';
import Button from 'material-ui/Button';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from 'material-ui/Dialog';

import { createTicket } from '../axiosController';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';

class Alerts extends React.Component {
    state = {
        open: false,
        shouldRedirect: false
    };

    handleClickOpen = () => {
        if (this.props.ticket.description && this.props.ticket.subject) {
            createTicket(this.props.ticket);

            this.setState({
                shouldRedirect: true
            })
        } else
            this.setState({ open: true });
    };

    handleRequestClose = () => {
        this.setState({ open: false });
    };


    render() {
        if (this.state.shouldRedirect) {
            return <Redirect to="/dashboard/my-tickets" />
        }

        return (
            <div>
                <button onClick={this.handleClickOpen}>Submit</button>
                <Dialog open={this.state.open} onRequestClose={this.handleRequestClose}>
                    <DialogTitle>{"Submit Ticket Error"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            You must fill out all the information before submitting.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleRequestClose} color="primary">
                            Okay
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state
    }
}
export default connect(mapStateToProps)(Alerts);