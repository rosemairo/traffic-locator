import React, { Component } from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom'

class Register extends Component {
constructor() {
 super()

 this.state = {
           name:'',
           email:'',
           password:'',
           loading: false
 }
}

 handleChange = (e) => {
   this.setState({
     [e.target.name]: e.target.value
   })

}

submitForm = () => {
 let newUser = {
   name: this.state.name,
   email: this.state.email,
   password: this.state.password
 }

 localStorage.setItem(this.state.email, newUser)
 this.setState({
   loading: true
 })
 let registerPromise= axios.post('https:v-forum-api.bahdcasts.com/api/register', newUser);
 registerPromise.then((response)=>{
   if(response.status === 200) {
     this.setState({
       loading: false
     })
    //  return (this.props.history.push('/secondhome'))
   }
 }).catch((error)=>{
   
   this.setState({
     nameError: error.response.data.data.name,
     emailError: error.response.data.data.email,
     passwordError: error.response.data.data.password,
     loading: false
   })

   setTimeout(()=> {
     this.setState({
       nameError: '',
       emailError:'',
       passwordError: '',
     
     })
   },1500)
 
 })
}

 render() {
   return (
     <div >
       <div className="jumbotron">
       <div className="containerbi">
         <div className="containersm">
           <h1>Join Medium</h1>
           <h2 className="my-4 text-dark">Create an account to personalize your homepage.</h2>
           <div className="btnall2">
             <input type="text" name={"name"} id="name" value={this.state.name} className="form-control mb-2" placeholder="Enter name.." onChange={this.handleChange}/>
             <div className="errorMessage">{this.state.nameError}</div>
             <input type="email" name={"email"} id="email" value={this.state.email} className="form-control mb-2" placeholder="Enter email.." onChange={this.handleChange}/>
             <div className="errorMessage">{this.state.emailError}</div>
             <input type="password" name={"password"} id="password" value={this.state.password} className="form-control" placeholder="Enter password.." onChange={this.handleChange}/>
             <div className="errorMessage">{this.state.passwordError}</div>
            {
              !this.state.loading ?  
            <button className="btn btn-primary btn-sm my-3" id="btn" onClick={this.submitForm}><Link to="/app">Submit</Link></button> :  
             
             <button className="btn btn-primary btn-sm my-3 " id="btn-loading" disabled >
               <i className="fas fa-spinner fa-spin" />
             </button>
            }
           </div>
           <div className="openacct">
             <p className>Already have an account? <Link to="/login"><span className="text-success">Sign in.</span></Link></p>
             <p className="mt-5">To make Medium work, we log user data and share it with service providers. Click "Sign in" above to accept Medium’s
               <Link to="/."><span className="text-dark">Terms of Service</span></Link> &  
               <Link to="/."><span className="text-dark">Privacy Policy</span></Link>.
             </p>
           </div>
         </div>
       </div>
       </div>

     </div>
   );
 }
}

export default Register;