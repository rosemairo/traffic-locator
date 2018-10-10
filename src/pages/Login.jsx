import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios'

class Login extends Component {
constructor(){
  super()
  this.state = {
    email:'',
    password:'',
    loading:false,
    errors: {

    }
    
  }
}


handleInputChange = (e) => {
  this.setState({
    [e.target.name]: e.target.value
  })
}

handleSubmit = () => {
  let loginDetails = {
    email: this.state.email,
    password: this.state.password
  }
    this.setState({
      loading:true
    })

  let registeredUser = axios.post('https:v-forum-api.bahdcasts.com/api/login', loginDetails)
  registeredUser.then((response)=> {
    if(response.status === 200) {
      this.setState({
        loading:false
      })
      return (this.props.history.push('/home')) 
    }
    
  }).catch((error)=>{
    this.setState({
      errors: error.response.data.data,
      loading:false
    })
    setTimeout(()=>{
      this.setState({
        errors:''
      })
    },1500);

  })

}

  render() {                                                                                                              
    return (
      <div >
        <div className="jumbotron">
          <div className="containerbig">
            <div className="containersmall">
              <h1>Welcome</h1>
              
              <div>
                <input type="email" name={"email"} id="email" className="form-control mb-2" placeholder="Enter email.." onChange={this.handleInputChange} />
                <div className="errorMessage">{this.state.errors.email ? this.state.errors.email[0] : ''}</div>
                <input type="password" name={"password"} id="password" className="form-control" placeholder="Enter password.." onChange={this.handleInputChange}/>
                <small className='errorMessage'>{typeof this.state.errors === 'string' ? this.state.errors : ''}</small>
                <div className="errorMessage">{this.state.errors.password ? this.state.errors.password[0] : ''}</div>
               
                {
                  !this.state.loading ?  
                  <button className="btn btn-primary btn-sm my-3" id="btn" onClick={this.handleSubmit}>Login</button> :  
                    
                  <button className="btn btn-primary btn-sm my-3 " id="btn-loading" disabled >
                      <i className="fas fa-spinner fa-spin" />
                  </button>
                }
              </div>
              <div className="acct">
                <p><Link to="/register"><span className="text-success">Register </span></Link></p>
                
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default Login ;