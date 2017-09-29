import React from 'react';
import Button from 'material-ui/Button';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from 'material-ui/Dialog';

import { deleteTicket } from '../axiosController';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';

class AlertDelete extends React.Component {
    state = {
        open: false,
        shouldRedirect: false
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleRequestClose = () => {
        this.setState({ open: false });
    };

    deleteSelectedTicket() {
        deleteTicket(this.props.ticket.ticket_id);
        this.setState({
            shouldRedirect: true
        })
    }
    render() {
        if (this.state.shouldRedirect) {
            return <Redirect to="/dashboard/my-tickets" />
        }

        return (
            <div>
                <button className='selectedticket_delete' onClick={this.handleClickOpen}>Delete</button>
                <Dialog open={this.state.open} onRequestClose={this.handleRequestClose}>
                    <DialogTitle>{"Are you sure you want to delete this ticket?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Once tickets are deleted, they are never coming back.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.deleteSelectedTicket()} color="primary">
                            Yes
                        </Button>
                        <Button onClick={this.handleRequestClose} color="primary">
                            Cancel
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
export default connect(mapStateToProps)(AlertDelete);