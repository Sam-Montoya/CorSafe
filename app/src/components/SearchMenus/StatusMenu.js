import React from 'react';
import { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';
import { connect } from 'react-redux';
import { updateUserTickets, updateFilteredTickets } from '../ducks/user-reducer';

class StatusMenu extends React.Component {
  constructor() {
    super();

    this.state = {
      status: ''
    };
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
    let sortedTickets = [];
    this.props.user.filteredTickets.map(element => {
      if (element.status === event.target.value)
        sortedTickets.unshift(element)
      if (element.status !== event.target.value)
        sortedTickets.push(element);

        return true;
    });
    this.props.updateFilteredTickets(sortedTickets);
  };

  render() {
    return (
      <form style={{ display: 'flex', alignContent: 'center' }}>
        <FormControl style={{ minWidth: '10vw', margin: '1vh 0 0 2vw' }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={this.state.status}
            onChange={this.handleChange('status')}
          >
            <MenuItem value={'Not Answered'}>Not Answered</MenuItem>
            <MenuItem value={'In-Progress'}>In-Progress</MenuItem>
            <MenuItem value={'Resolved'}>Resolved</MenuItem>
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

export default connect(mapStateToProps, { updateUserTickets, updateFilteredTickets })(StatusMenu);
