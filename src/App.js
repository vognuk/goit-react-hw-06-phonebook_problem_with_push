import React, { Component } from 'react'
import { CSSTransition } from 'react-transition-group'
import { v4 as uuidv4 } from 'uuid'
import Container from './components/Container'
import Heading from './components/Heading'
import Form from './components/Form'
import Contacts from './components/Contacts'
import Filter from './components/Filter'
import Animation from './components/NotificationNumberExist/Animation.module.css'
import NotificationNumberExist from './components/NotificationNumberExist'
import { connect } from 'react-redux'
import action from './redux/actions'

class App extends Component {
  state = {
    contacts: [],
    filter: '',
    sameContact: false,
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) this.props.initContacts(parsedContacts);
  }

  componentDidUpdate(prevProps) {
    const { contacts: nowContacts } = this.props;
    const { contacts: prevContacts } = prevProps;
    if (nowContacts !== prevContacts) {
      localStorage.setItem('contacts', JSON.stringify(nowContacts));
    }
  }

  checkContact = (name, number) => {
    const { contacts } = this.state;
    if (contacts.some(elem => elem.number === number)) {
      this.setState({ sameContact: true });
      setTimeout(() => {
        this.setState({ sameContact: false });
      }, 1000);

      return;
    } else
      this.addContact(name, number);
  };

  addContact = (name, number) => {
    const contactData = {
      id: uuidv4(),
      name: name,
      number: number,
    };
    this.setState(prevState => ({
      contacts: [contactData, ...prevState.contacts],
    }));
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(el => el.id !== id),
    }));
  };

  filterContacts = e => {
    this.setState({ filter: e.target.value });
  };

  // getVisibleContacts = () => {
  //   const { filter, contacts } = this.state;
  //   const normalizedFilter = filter.toLowerCase();
  //   return contacts.filter(el =>
  //     el.name.toLowerCase().includes(normalizedFilter)
  //   );
  // };

  render() {
    const { contacts, name, filter, number, sameContact } = this.state;
    return (
      <Container>
        <div className="heading">
          <Heading />

          <CSSTransition
            in={sameContact}
            timeout={250}
            classNames={Animation}
            unmountOnExit
          >
            <NotificationNumberExist message="The contact is already exists." />
          </CSSTransition>
        </div>

        <Form
          name={name}
          number={number}
          contacts={contacts}
          onChange={this.handleChange}
          onSubmit={this.checkContact}
        ></Form>

        <Filter
          value={filter}
          onChange={this.filterContacts}
        />

        <Contacts
          contacts={this.props.contacts}
          onDelete={this.props.delContact}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    contacts: state,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    delContact: (id) => dispatch(action.delContact(id)),
    initContacts: (contacts) => dispatch(action.initContacts(contacts)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

