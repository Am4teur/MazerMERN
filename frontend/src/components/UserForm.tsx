import React, { Component } from 'react';
import axios from 'axios';
import "../App.css";
import { Link } from 'react-router-dom';


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

    axios.post('http://localhost:5000/users/add', user)
      .then(res => console.log(res.data));

    
    window.location.href = '/mazer';
  }


  render() {
    return (
      <div className="userForm">
        <h3>Create your username to play online</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input type="text"
                    required
                    className="form-control"
                    onChange={this.onChangeUsername}
                    />

          </div>
          <div className="form-group text-center">
            <Link onClick={event => (!this.state.username) ? event.preventDefault(): null} to={`/mazer?username=${this.state.username}`}>
              <input type="submit" value="Create User" className='btn btn-primary'/>
            </Link>
          </div>
        </form>
      </div>
    );
  }
}


export default UserForm;