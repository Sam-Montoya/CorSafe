import React from 'react';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux';

import { updateUserTickets, updateFilteredTickets } from '../ducks/user-reducer';

class SearchField extends React.Component {
    handleChange(input) {
        let sortedTickets = this.props.user.userTickets.slice(0);
        let tempTickets = [];
        sortedTickets.map(element => {
            if (element.subject.toLowerCase().includes(input.target.value.toLowerCase())) {
                tempTickets.push(element)
            }
            return true;
        });
        this.props.updateFilteredTickets(tempTickets);
    };

    render() {
        return (
            <form style={{ width: '12vw', margin: '1vh 0 0 2vw', marginTop: '2.5vh'}}>
                <TextField
                    id="helperText"
                    label="Search"
                    onChange={(input) => this.handleChange(input)}
                />
            </form>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state
    }
}

export default connect(mapStateToProps, { updateUserTickets, updateFilteredTickets })(SearchField);