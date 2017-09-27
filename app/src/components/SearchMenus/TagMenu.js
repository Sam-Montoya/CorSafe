import React from 'react';
import { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';
import { connect } from 'react-redux';
import { updateUserTickets, updateFilteredTickets } from '../ducks/user-reducer';

class TagMenu extends React.Component {
  constructor() {
    super();

    this.state = {
      tag: ''
    };
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
    let sortedTickets = [];
    this.props.user.filteredTickets.map(element => {
      if (element.tag === event.target.value)
        sortedTickets.unshift(element)
      if (element.tag !== event.target.value)
        sortedTickets.push(element);
        
        return true;
    });
    this.props.updateFilteredTickets(sortedTickets);
  };

  render() {
    return (
      <form style={{ display: 'flex', alignContent: 'center' }}>
        <FormControl style={{ minWidth: '10vw', margin: '1vh 0 0 2vw' }}>
          <InputLabel>Tag</InputLabel>
          <Select
            value={this.state.tag}
            onChange={this.handleChange('tag')}
          >
            <MenuItem value={'Critical'}>Critical</MenuItem>
            <MenuItem value={'Normal'}>Normal</MenuItem>
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

export default connect(mapStateToProps, { updateUserTickets, updateFilteredTickets })(TagMenu);
