import React from 'react';
import { Link } from 'react-router';
import { observer } from 'mobx-react';
import { browserHistory } from 'react-router';
import auth from '../auth.js';
import NavLink from './NavLink.jsx';
import ajax from '../lib/ajax';

// @observer
export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.store = this.props.route.store;
    this.state = {
      error: false
    };
  }

  componentWillMount() {
    ajax.getLanguages(function(data) {
      data.forEach( lang => {
        $('#login-learn-language').append($('<option>', {
          value: lang.name,
          text: lang.name
        }));
      });
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.store.username = e.target.username.value;
    this.store.password = e.target.password.value;
    auth.login(this.store.username, this.store.password, (loggedIn) => {
      if (!loggedIn) {
        return this.setState({error: true});
      }
      browserHistory.push('/home');
    });
  }

  render() {
    return (
      <div className="login-signup-box">
        <h1>Login</h1>
        <form className="login-signup-form" onSubmit={ this.handleSubmit.bind(this) }>
          Username: <input type="text" name="username" />
          Password: <input type="password" name="password" />
          Language you want to learn today:
          <select id="login-learn-language" name="login-learn-language">
            <option></option>
          </select>
          <input id="general-button" type="submit" />
          {this.state.error && (<p>Login Failed</p>)}
        </form>
      </div>
    );
  }
}