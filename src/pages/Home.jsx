import React, { Component } from "react";
import { Link } from "react-router-dom";
import Register from '../pages/Register';
class Home extends Component {
  state = {};
  render() {
    return (
      <div>
        <header>
          <div className="container">
            <nav className="navbar navbar-expand-md navbar-light">
              <a className="navbar-brand" href="#">
                <img src="" alt="logo" />
              </a>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
              </button>
              {/* <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto" style={{color: '#6b95e0'}}>
                  <li className="nav-item active">
                    <a href="#" className="nav-link">Home </a>
                  </li>
                  <li className="nav-item"> 
                    <a className="nav-link" href="#">Sign Up</a>
                  </li>
                  <li className="nav-item"> 
                    <a className="nav-link" href="#">Login</a>
                  </li>
                </ul>
              </div> */}
            </nav>
          </div>
        </header>
        <main className="main">
          <div className="container text-center">
            <p className="lead pt-4">get traffic reports from wherever you are</p>
            <h1 className="display-4 mb-4 py-4">All Things Traffic, Get All The Informations Here</h1>
            <button className="btn my-3"><Link to="/register">Get started</Link></button>
          </div>
        </main>

      </div>
    );
  }
}

export default Home;
 