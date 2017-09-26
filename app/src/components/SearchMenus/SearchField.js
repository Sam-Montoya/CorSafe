import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import MenuItem from 'material-ui/Menu/MenuItem';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux';
import _ from 'underscore';

import { updateUserTickets, updateFilteredTickets } from '../ducks/user-reducer';

class SearchField extends React.Component {
    handleChange(input) {
        let sortedTickets = this.props.user.userTickets.slice(0);
        let tempTickets = [];
        sortedTickets.map(element => {
            if (element.subject.toLowerCase().includes(input.target.value.toLowerCase())) {
                tempTickets.push(element)
            }
        });
        this.props.updateFilteredTickets(tempTickets);
    };

    render() {
        return (
            <form style={{ width: '12vw', margin: '1vh 0 0 2vw'}}>
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