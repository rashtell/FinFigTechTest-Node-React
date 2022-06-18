import { Card } from "components/Card/Card.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import FormInputs from "components/FormInputs/FormInputs";
import React, { Component } from "react";
import { Col, Grid, Row } from "react-bootstrap";
import { connect } from "react-redux";
import RingLoader from "react-spinners/RingLoader";
import { login, saveLoginDetails } from "../redux/actions/index.actions";

const mapStateToProps = (state, props) => {
  const { request, } = state.admin;
  return {
    username: request.loginAdmin.username,
    password: request.loginAdmin.password,
    fetching: state.fetching
  };
};

const mapDispatchToProps = (dispatch, props) => ({
  onTextChange(input) {
    dispatch(saveLoginDetails(input));
  },
  onLogin(username, password) {
    dispatch(login(username, password));
  }
});

class Login extends Component {
  render() {
    const { onTextChange, onLogin, username, password, fetching } = this.props;
    return (
      <div className="content">

        <Grid fluid>
          <div className="card">
            <div className="header">
              <h4 className="title">
                <RingLoader
                  size={30}
                  loading={fetching}
                />
                Admin
              </h4>

              <p className="category">
              Agents
              </p>
            </div>

            <div className="content">
              <Grid fluid>
                <Row>
                  <Col md={8}>
                    <Card
                      title="Login"
                      content={
                        <form>
                          <FormInputs
                            ncols={["col-md-12"]}
                            properties={[
                              {
                                label: "Username",
                                type: "text",
                                bsClass: "form-control",
                                placeholder: "Username",
                                value: username,

                                onChange: e => {
                                  let value = e.currentTarget.value;
                                  onTextChange({ username: value });
                                }
                              }
                            ]}
                          />
                          <FormInputs
                            ncols={["col-md-12"]}
                            properties={[
                              {
                                label: "Password",
                                type: "password",
                                bsClass: "form-control",
                                placeholder: "Password",
                                value: password,
                                onChange: e => {
                                  let value = e.currentTarget.value;
                                  onTextChange({ password: value });
                                }
                              }
                            ]}
                          />

                          <Button
                            bsStyle="primary"
                            fill
                            type="submit"
                            onClick={e => {
                              e.preventDefault();
                              onLogin(username, password);
                            }}
                          >
                            Login
                          </Button>
                          <div className="clearfix" />
                        </form>
                      }
                    />
                  </Col>
                </Row>
              </Grid>
            </div>
          </div>
        </Grid>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
