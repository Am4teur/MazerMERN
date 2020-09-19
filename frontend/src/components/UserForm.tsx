import React, { Component } from 'react';
import axios from 'axios';
import "../App.css";
import { Link } from 'react-router-dom';

let ENDPOINT = 'http://localhost:5000/';

interface UserFormState {
  username: string;
}

class UserForm extends Component<{}, UserFormState> {
  constructor(props: any){
    super(props);

    this.state = {
      username: '',
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);

  }

  onChangeUsername(e: any): void {
    this.setState({
      username: e.target.value,
    })
  }

  onSubmit(e: any): void {
    e.preventDefault();

    const user = {
      username: this.state.username,
      x: 0,
      y: 0
    }

    console.log(user);

    axios.post((ENDPOINT + 'users/add'), user)
      .then(res => console.log(res.data));

    window.location.href = `/mazer?username=${this.state.username}`;
  }


  render() {
    return (
      <div className="createUserForm ml-5 mr-5" style={{"color": "white"}}>
        <h3>Choose your username to play online</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <input type="text" required className="form-control" placeholder="Enter Username" onChange={this.onChangeUsername}/>
            <small className="form-text text-muted">This username is temporary. {/*If you disconnect, you lose your position.*/}</small>
          </div>
          <div className="form-group">
          <Link onClick={event => (!this.state.username) ? event.preventDefault(): this.onSubmit(event)} to={`/mazer?username=${this.state.username}`}>
          <input type="submit" value="Create User" className='btn btn-primary'/>
          </Link>
          </div>
        </form>
      </div>
    );
  }
}


export default UserForm;