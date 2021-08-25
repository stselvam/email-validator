import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Col, Container, Row, Spinner, Table } from 'react-bootstrap';
import axios from 'axios';
function App() {
  const [email, setEmail] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const emailTextBoxChangeHandler = (e) => {
    setEmail(e.target.value);
  }
  async function submitButtonHandler(e) {
    e.preventDefault();
    document.querySelector(".loader").style.display = "flex";
    var url = `http://apilayer.net/api/check?access_key=d98750e6347d6be15ccbbea662820af6&email=${email}.com&smtp=1&format=1`;
    try {
      const response = await axios.get(url);
      if(response.data.error) {
        if(response.data.error.info) {
          if(response.data.error.type==="invalid_access_key") alert("Invalid access!"); else {
            alert(response.data.error.info);
          }
        }
      }
      if(response.data.email) document.querySelector("#response__email").innerHTML = response.data.email.slice(0, -4); else {
        document.querySelector("#response__email").innerHTML = "-";
      }
      if(response.data.domain) document.querySelector("#response__domain").innerHTML = response.data.domain.slice(0, -4); else {
        document.querySelector("#response__domain").innerHTML = "-";
      }
      if(response.data.user) document.querySelector("#response__username").innerHTML = response.data.user; else {
        document.querySelector("#response__username").innerHTML = "-";
      }
      if(response.data.mx_found === true) {
        response.data.free ? document.querySelector("#response__free").innerHTML = "Email address is free" : document.querySelector("#response__free").innerHTML = "Paid for this email";
        response.data.format_valid ? document.querySelector("#response__validformat").innerHTML = "Email address is valid" : document.querySelector("#response__validformat").innerHTML = "Email address is invalid";
        document.querySelector("#response__emailexists").innerHTML = "Email address exists!";
      } else {
        document.querySelector("#response__free").innerHTML = "Invalid email!";
        document.querySelector("#response__validformat").innerHTML = "Not a valid email address!";
        document.querySelector("#response__emailexists").innerHTML = "Email address does not exists!";
      }
    } catch (error) {
      alert("Unhandled error occured!");
    }
    document.querySelector(".loader").style.display = "none";
  }
  useEffect(() => {
    window.addEventListener('resize', () => {
      if(window.innerWidth < 980) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
  }, false);
  }, []);
  return (
    <Container id="mainApp" className={isMobile ? "app" : "app d-flex align-items-center justify-content-center"}>
      <div className="loader">
        <div className="inner">
          <Spinner size="lg" animation="border" variant="primary" />
        </div>
      </div>
      <Row>
        <Col lg={6} md={12} xs={12} className="left">
          <h1 className="intro__title">Email Validation &amp; Verification JSON API for Developers</h1>
          <div className="intro__line"></div>
          <span className="intro__subtitle">Simple REST API measuring email deliverability &amp; quality</span>
          <div className="input__holder">
            <input placeholder="Enter email address" id="email" onKeyUp={(e) => emailTextBoxChangeHandler(e)} onChange={(e) => emailTextBoxChangeHandler(e)} value={email} type="text" />
            <button onClick={(e) => submitButtonHandler(e)}>Verify</button>
          </div>
        </Col>
        <Col lg={6} md={12} xs={12} className="right">
          <Table responsive="md">
            <thead>
              <tr>
                <th>Left</th>
                <th>Right</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Email address</td>
                <td id="response__email">-</td>
              </tr>
              <tr>
                <td>Domain</td>
                <td><span id="response__domain">-</span></td>
              </tr>
              <tr>
                <td>Username</td>
                <td><span id="response__username">-</span></td>
              </tr>
              <tr>
                <td>Is Email free?</td>
                <td id="response__free">-</td>
              </tr>
              <tr>
                <td>Valid format</td>
                <td id="response__validformat">-</td>
              </tr>
              <tr>
                <td>Is email exists?</td>
                <td id="response__emailexists">-</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
