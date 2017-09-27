import React from 'react';
import { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';
import { connect } from 'react-redux';
import { updateUserTickets, updateFilteredTickets } from '../ducks/user-reducer';

import _ from 'underscore';

class DateMenu extends React.Component {
    constructor() {
        super();

        this.state = {
            date: ''
        };
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
        let sortedTickets = this.props.user.filteredTickets;

        if (event.target.value === 'Newest')
            this.props.updateFilteredTickets(
                _.sortBy(sortedTickets, 'date').reverse()
            );
        else
            this.props.updateFilteredTickets(
                _.sortBy(sortedTickets, 'date')
            )
    };

    render() {
        return (
            <form style={{ display: 'flex', alignContent: 'center' }}>
                <FormControl style={{ minWidth: '10vw', margin: '1vh 0 0 2vw' }}>
                    <InputLabel>Date</InputLabel>
                    <Select
                        value={this.state.date}
                        onChange={this.handleChange('date')}
                    >
                        <MenuItem value={'Newest'}>Newest</MenuItem>
                        <MenuItem value={'Oldest'}>Oldest</MenuItem>
                    </Select>
                </FormControl>
            </form>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state
    }
}

export default connect(mapStateToProps, { updateUserTickets, updateFilteredTickets })(DateMenu);
