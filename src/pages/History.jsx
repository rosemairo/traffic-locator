import React from "react";
import storage from "../helpers/storage";
import { Link } from 'react-router-dom';
class History extends React.Component {
  state = {};
  render() {
    const histories = storage.get("histories");
    return (
      <div>
        <table className="table table-dark">
          <thead>
            <tr>
              <th scope="col-3">Name</th>
              <th scope="col-3">Location</th>
              <th scope="col-3">Destination</th>
              <th scope="col-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {histories.map((history, i) => (
              <tr key={i}>
                <td>{history.name}</td>
                <td>{history.location}</td>
                <td>{history.destination}</td>
                <td>{history.date}</td>
              </tr>
            ))}
          </tbody>
          <div className="back-button">
          <small><button className="btn btn-default"><Link to="/app">Back</Link></button></small>
          </div>
        </table>
      </div>
    );
  }
}

export default History;
