import React, { useEffect, useState } from "react";
import axios from 'axios';
import "./App.css";
import Spinner from "./Spinner";
import logo from "./logo.jpg";
const App = () => {
  const [Data, setData] = useState([]);/*useState hook returns the state value and a function for updating that state*/
  const [visibility, setVisibility] = useState(false);
  const [loading, setLoading] = useState(false);
  const allData = async () => {
    if (visibility) {
      const res = await axios.get("https://reqres.in/api/users?page=1");
      const delay = 2000;
      await new Promise((resolve) => setTimeout(resolve, delay));
      setData(res.data.data);
    }
    setLoading(false);
  };
  const display = () => {
    setVisibility(true);
    setLoading(true);
  };
  useEffect(() => {
    if (visibility) {
      allData();
    }
  }, [loading]);
  const renderCard = (user) => {
    if (loading) return Spinner;
    else {
      return (
        <div className="card">
          <img src={user.avatar} alt="" className="square-img" style={{ width: "100px" }}/>
          <div class="caption">
          <h3>First Name:{user.first_name}</h3>
          <h3>Last Name:{user.last_name}</h3>
          <h3>Email:{user.email}</h3>
          <h3>Id:{user.id}</h3>
          </div>
        </div>
      );
    }
  };
  return (
    <div className="App">
      <nav className="top">I-N-F-O-M-A-N-I-A-C
        <img src={logo} alt="" style={{ height: "40px", width: "40px" }} />
        <button className="btn" onClick={display}>
          Get Users
        </button>
      </nav>

      {loading ? <Spinner /> : null}
      <div className="container" style={userStyle}>
        {loading ? null : Data.map(renderCard)}
      </div>
    </div>
  );
};

const userStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3,1fr)",
  gridGap: "5rem",
  margin:"40px",
};

export default App;