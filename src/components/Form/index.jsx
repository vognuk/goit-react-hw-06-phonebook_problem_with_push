import React, { Component } from 'react'
import s from './Form.module.css'
import PropTypes from 'prop-types'
import { Provider, connect } from 'react-redux'
import validatePhoneNumber from '../../utils/validator'
import action from '../../redux/actions'

// const Form = () => {
class Form extends Component {
  static propTypes = {
    name: PropTypes.string,
    number: PropTypes.string,
    contacts: PropTypes.arrayOf(
      PropTypes.exact({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
      })
    ),
    onChange: PropTypes.func,
    onSubmit: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
  };

  state = {
    name: '',
    number: '+380',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
    // console.log(target);
    // console.log(this.state);
  };

  handleSubmit = e => {
    console.log(this.props);
    const { name, number } = this.state;
    e.preventDefault();
    this.props.addContact(name, number);
    // if (validatePhoneNumber(number) === true) {
      // this.props.onSubmit(name, number);
    // } else {
    //   alert("Enter correct number, please")
    // }
    this.reset();
  };

  reset() {
    this.setState({ name: '', number: '+380' });
  }

  render() {
    const { addContact } = this.props;
    const { name, number } = this.state;
    // console.log(localStorage.getItem('contacts'));
    return (
      <>
        <form className={s.form} 
        onSubmit={this.handleSubmit}
        >
          <label className={s.label}>
            Name
            <span className={s.star}>&#42;</span>
            <input
              className={s.input}
              type='text'
              name='name'
              placeholder='Enter the name'
              value={name}
              onChange={this.handleChange}
              required
            />
          </label>
          <label className={s.label}>
            Number<span className={s.star}>&#42;</span>
            <input
              className={s.input}
              type='number'
              name='number'
              placeholder='+380'
              value={number}
              maxLength="13"
              onChange={this.handleChange}
              required
            />
            <span className={s.rule}>
              <span className={s.star}>&#42;</span> - obligatory fields.
            </span>
          </label>
          <button 
          className={s.button} 
          // onSubmit={this.props.addContact} 
          disabled={false}>
            Add contact
          </button>
        </form>
      </>
    );
  }
}

let mapStateToProps = state => {
  {
    // addContact
    // state
    // name: state.name;
    // number: state.number;
  }
};

const mapDispatchToProps = dispatch => {
  return {
    addContact: (name, number) => dispatch(action.addContact(name, number)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
