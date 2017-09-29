import React from 'react';
import Button from 'material-ui/Button';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from 'material-ui/Dialog';

import { connect } from 'react-redux';

class AlertTickets extends React.Component {
    state = {
        open: false,
        ticketMessage: ''
    };

    componentWillReceiveProps(nextProps) {
        this.setState({
            open: nextProps.isOpen,
            ticketMessage: nextProps.message
        })
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleRequestClose = () => {
        this.setState({ open: false });
    };


    render() {
        return (
            <div>
                <Dialog open={this.state.open} onRequestClose={this.handleRequestClose}>
                    <DialogTitle>{'Ticket Status'}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {this.state.ticketMessage}
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
export default connect(mapStateToProps)(AlertTickets);