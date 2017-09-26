import React from 'react';
import { withStyles } from 'material-ui/styles';
import { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';
import { connect } from 'react-redux';
import { updateUserTickets, updateFilteredTickets } from '../ducks/user-reducer';

import _ from 'underscore';

class IdMenu extends React.Component {
    constructor() {
        super();

        this.state = {
            id: ''
        };
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
        let sortedTickets = this.props.user.filteredTickets;

        if (event.target.value === 'Greatest')
            this.props.updateFilteredTickets(
                _.sortBy(sortedTickets, 'ticket_id').reverse()
            );
        else
            this.props.updateFilteredTickets(
                _.sortBy(sortedTickets, 'ticket_id')
            )
    };

    render() {
        return (
            <form style={{ display: 'flex', alignContent: 'center' }}>
                <FormControl style={{ minWidth: '10vw', margin: '1vh 0 0 2vw' }}>
                    <InputLabel>ID</InputLabel>
                    <Select
                        value={this.state.id}
                        onChange={this.handleChange('id')}
                    >
                        <MenuItem value={'Least'}>Least</MenuItem>
                        <MenuItem value={'Greatest'}>Greatest</MenuItem>
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

export default connect(mapStateToProps, { updateUserTickets, updateFilteredTickets })(IdMenu);
