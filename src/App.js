import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    // var status;
    // fetch("http://localhost:8000/signup", {
    //   method: "post",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     email: "eyuyusy@hjdhd.jk",
    //     password: "123456",
    //   }),
    // })
    //   .then((response) => {
    //     status = response.status;
    //     return response.json();
    //   })
    //   .then((responseJson) => {
    //     console.log("data", responseJson);
    //     console.log("status", status);
    //   });
    // axios({
    //   url: "http://localhost:8000/signup",
    //   method: "post",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   data: {
    //     email: "eyuy",
    //     password: "1236",
    //   },
    //   timeout: 3000,
    // })
    //   .then((response) => {
    //     console.log("status", response.status);
    //     console.log("data", response.data);
    //   })
    //   .catch((e) => {
    //     console.log("status", e.response.status);
    //     console.log("data", e.response.data);
    //   });
  }, []);
  const getData = () => {
    setLoading(true);
    const controller = new AbortController();
    setTimeout(() => controller.abort(), 1000);

    var status;
    fetch("http://localhost:8000", { method: "get", signal: controller.signal })
      .then((response) => {
        status = response.status;
        return response.json();
      })
      .then((responseJson) => {
        if (status === 200) {
          setData(responseJson.data);
        }
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        console.log("error");
      });
  };
  return (
    <div className="App">
      <button onClick={getData}>getData</button>
      {loading ? <p>loading</p> : null}
      {data.map((item) => {
        return (
          <div key={item.title}>
            <p>{item.title}</p>
          </div>
        );
      })}
    </div>
  );
}

export default App;
