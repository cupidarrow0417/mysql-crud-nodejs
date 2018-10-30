// eslint-disable-next-line
import React, { Component } from "react";
import {
  Container,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from "reactstrap";
import { Redirect } from "react-router-dom";
import "./login.css";

class LoginForm extends Component {
  state = {
    email: "",
    password: "",
    redirect: false
  };

  handleChange = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onClick = () => {
    fetch("http://localhost:8080/user/login", {
      method: "post",
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },

      credentials: "include" // send cookies, even in CORS
    })
      .then(res => {
        return res.json();
      })
      .then(() => this.setState({ logined: !this.state.logined }))
      .then(
        data => console.log(data),
        error => {
          console.log("error");
        }
      );
  };

  render() {
    const { logined } = this.state;

    return (
      <Container className="App">
        <h2>Sign In</h2>
        {logined && (
          <Form className="form">
            <Col>
              <FormGroup>
                <Label>Email</Label>
                <Input
                  onChange={this.handleChange}
                  type="email"
                  name="email"
                  id="exampleEmail"
                  placeholder="myemail@email.com"
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="examplePassword">Password</Label>
                <Input
                  onChange={this.handleChange}
                  type="password"
                  name="password"
                  id="examplePassword"
                  placeholder="********"
                />
              </FormGroup>
            </Col>
            <Button onClick={this.onClick}>Submit</Button>
          </Form>
        )}
      </Container>
    );
  }
}

export default LoginForm;
