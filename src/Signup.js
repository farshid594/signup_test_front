import React, { useState, useEffect } from "react";
import "./signup.css";

export default function Signup() {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmialError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(true);
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const [succsess, setSuccess] = useState("");

  useEffect(() => {
    if (
      emailRegex.test(email) &&
      password.length > 5 &&
      /[a-z]/.test(password) &&
      /[A-Z]/.test(password) &&
      /[0-9]/.test(password)
    ) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  }, [email, password]);

  const signupProccess = () => {
    var status;
    fetch("http://localhost:8000/signup", {
      method: "post",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        status = response.status;
        return response.json();
      })
      .then((responseJSon) => {
        if (status === 201) {
          setSuccess(responseJSon.message);
        } else if (status === 400) {
          responseJSon.errors.forEach((error) => {
            console.log(error);
            if (error.key === "email") {
              setEmialError(error.message);
            } else if (error.key === "password") {
              setPasswordError(error.message);
            } else {
              setError("server error");
            }
          });
        }
        // localStorage.setItem("token","dkdjdk")
        // localStorage.getItem("token")
      });
  };

  return (
    <div className="root">
      {succsess.length > 0 ? <p className="success">{succsess}</p> : null}
      {error.length > 0 ? <p className="error">{error}</p> : null}
      <input
        value={email}
        onChange={(e) => {
          if (/^[0-9a-z\._@]*$/i.test(e.target.value)) {
            setEmialError("");
            setEmail(e.target.value);
          } else {
            setEmialError("invalid char");
          }
        }}
        placeholder="email"
        className="input"
        onFocus={() => {
          setEmialError("");
        }}
        onBlur={() => {
          if (!emailRegex.test(email)) {
            setEmialError("ivalid email");
          }
        }}
      />
      {emailError.length > 0 ? <p className="error">{emailError}</p> : null}
      <input
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        onBlur={() => {
          if (
            password.length < 6 ||
            !/[a-z]/.test(password) ||
            !/[A-Z]/.test(password) ||
            !/[0-9]/.test(password)
          ) {
            setPasswordError("ivalid password");
          }
        }}
        onFocus={() => {
          setPasswordError("");
        }}
        placeholder="password"
        className="input"
        type="password"
      />
      {passwordError.length > 0 ? (
        <p className="error">{passwordError}</p>
      ) : null}
      <button
        // disabled={btnDisabled}
        className="input"
        onClick={signupProccess}
      >
        signup
      </button>
      <button
        className="input"
        onClick={() => {
          fetch(
            "https://google-translate1.p.rapidapi.com/language/translate/v2",
            {
              method: "POST",
              headers: {
                "content-type": "application/x-www-form-urlencoded",
                "accept-encoding": "application/gzip",
                "x-rapidapi-key": "3e1f7a79c7msh57754da6c3b05cap12b559jsn134bf9ed8895",
                "x-rapidapi-host": "google-translate1.p.rapidapi.com",
              },
              body: {
                q: "Hello, world!",
                source: "en",
                target: "es",
              },
            }
          )
            .then((response) => {
              console.log(response);
            })
            .catch((err) => {
              console.error(err);
            });
        }}
      >
        translate
      </button>
    </div>
  );
}
