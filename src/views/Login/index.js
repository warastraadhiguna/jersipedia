import { cekLogin } from "actions/AuthAction";
import { loginUser } from "actions/AuthAction";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  FormGroup,
  Input,
  Label,
  Row,
  Spinner,
} from "reactstrap";
import swal from "sweetalert";
import Logo from "../../assets/img/logoUtama.svg";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
  }

  componentDidMount() {
    this.props.dispatch(cekLogin(this.props.history));
  }

  componentDidUpdate(prevProps) {
    const { loginResult, cekLoginResult } = this.props;
    if (loginResult && prevProps.loginResult !== loginResult) {
      swal("Success!", "Selamat datang", "success");
      this.props.history.push("/admin/dashboard");
    }
    if (cekLoginResult && prevProps.cekLoginResult !== cekLoginResult) {
      this.props.history.push("/admin/dashboard");
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    const { email, password } = this.state;
    event.preventDefault();
    if (email && password) {
      this.props.dispatch(loginUser(email, password));
    } else {
      swal("Error", "Isi semua field", "error");
    }
  };

  render() {
    const { email, password } = this.state;
    const { loginLoading } = this.props;
    return (
      <Row className="justify-content-center mt-5">
        <Col md="4" className="mt-5">
          <img
            src={Logo}
            className="rounded mx-auto d-block"
            alt="Logo Utama"
          />
          <Card>
            <CardHeader tag="h4">Login</CardHeader>
            <CardBody>
              <form onSubmit={(event) => this.handleSubmit(event)}>
                <FormGroup>
                  <Label for="email">Email Address</Label>
                  <Input
                    type="email"
                    name="email"
                    value={email}
                    placeholder="Email Address"
                    onChange={(event) => this.handleChange(event)}
                  ></Input>
                </FormGroup>
                <FormGroup>
                  <Label for="password">Password</Label>
                  <Input
                    type="password"
                    name="password"
                    value={password}
                    placeholder="Password"
                    onChange={(event) => this.handleChange(event)}
                  ></Input>
                </FormGroup>

                {loginLoading ? (
                  <Button color="primary" disabled>
                    <Spinner size="sm" color="light" /> Loading
                  </Button>
                ) : (
                  <Button color="primary" type="submit">
                    Login
                  </Button>
                )}
              </form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = (state) => ({
  loginLoading: state.AuthReducer.loginLoading,
  loginResult: state.AuthReducer.loginResult,
  loginError: state.AuthReducer.loginError,

  cekLoginLoading: state.AuthReducer.cekLoginLoading,
  cekLoginResult: state.AuthReducer.cekLoginResult,
  cekLoginError: state.AuthReducer.cekLoginError,
});

export default connect(mapStateToProps, null)(Login);
