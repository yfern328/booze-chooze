import React, { Component } from 'react';
import {Image, Button, Input} from 'semantic-ui-react'

class Login extends Component {
  render(){
    return(
      <div>
      <div id="wrapper">
        <div id="welcome-nav">
          <Image className="nav-button" src={'./paw-print.png'} size='small' href='/'/>
          <Image className="welcome-logo" src={'./booze-chooze-logo.png'} size='large' centered />
        </div>

        <div className="login-bar">
        <Input
          placeholder='Enter A Name'
        />

        <Button color='blue' href='/'>
          Log In
        </Button>
        </div>

        </div>
      </div>
    );
  }
};

export default Login;
