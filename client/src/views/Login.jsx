import React from "react";
import {
  Alert,
  Button,
  Card,
  Container,
  FloatingLabel,
  Form,
  Spinner,
} from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  createAdmin,
  loginAdmin,
} from "../redux/actions/fetch/admin/admin.actions";
import {
  clearCreateAdminResponseMessage,
  clearLoginAdminResponseMessage,
  setCreateAdminRequestParams,
  setLoginAdminRequestParams,
} from "../redux/actions/index.actions";

const mapStateToProps = (state, props) => {
  return {
    createAdminRequest: state.fetch.admin.admin.createAdmin.request,
    createAdminResponseLoading: state.fetch.admin.admin.createAdmin.loading,
    createAdminResponse: state.fetch.admin.admin.createAdmin.response.data,
    createAdminResponseMessage:
      state.fetch.admin.admin.createAdmin.response.message,

    loginAdminRequest: state.fetch.admin.admin.loginAdmin.request,
    loginAdminResponseLoading: state.fetch.admin.admin.loginAdmin.loading,
    loginAdminResponse: state.fetch.admin.admin.loginAdmin.response.data,
    loginAdminResponseMessage:
      state.fetch.admin.admin.loginAdmin.response.message,
  };
};

const mapDispatchToProps = (dispatch, props) => ({
  invokeSetCreateAdminRequestParams(payload) {
    dispatch(setCreateAdminRequestParams(payload));
  },
  invokeCreateAdmin(payload) {
    dispatch(createAdmin(payload));
  },
  invokeClearCreateAdminResponseMessage() {
    dispatch(clearCreateAdminResponseMessage());
  },

  invokeSetLoginAdminRequestParams(payload) {
    dispatch(setLoginAdminRequestParams(payload));
  },
  invokeLoginAdmin(payload) {
    dispatch(loginAdmin(payload));
  },
  invokeClearLoginAdminResponseMessage() {
    dispatch(clearLoginAdminResponseMessage());
  },
});

class Login extends React.Component {
  state = {
    isNewUser: true,
  };

  changeToLoginPage = () => {
    this.setState({ isNewUser: false });
  };

  changeToSignupPage = () => {
    this.setState({ isNewUser: true });
  };

  /**
   * This method renders the back button
   * @returns JSX
   */
  renderBack() {
    return (
      <div>
        <p className="text-start text-muted font-monospace">
          <Link to="/home">Back</Link>
        </p>
      </div>
    );
  }

  /**
   * This method handles error message rendering for create and login admin
   * @returns JSX
   */
  renderMessage() {
    const { isNewUser } = this.state;
    const {
      createAdminResponseMessage,
      createAdminResponse,

      loginAdminResponseMessage,
      loginAdminResponse,

      invokeClearCreateAdminResponseMessage,
      invokeClearLoginAdminResponseMessage,
    } = this.props;

    //select params and methods based on the current mode (new or existing)
    const responseMessage = isNewUser
      ? createAdminResponseMessage
      : loginAdminResponseMessage;
    const response = isNewUser ? createAdminResponse : loginAdminResponse;
    const invokeClearAction = isNewUser
      ? invokeClearCreateAdminResponseMessage
      : invokeClearLoginAdminResponseMessage;

    //check if response message is an error
    if (responseMessage && !response.username) {
      //clear response message after 3 seconds
      setTimeout(() => {
        invokeClearAction();
      }, 3000);

      return (
        <Alert key="danger" variant="danger">
          {responseMessage}
        </Alert>
      );
    }

    //check if response message is a success message
    if (responseMessage && !response.username) {
      //clear response message after 3 seconds
      setTimeout(() => {
        invokeClearAction();
        this.changeToLoginPage();
      }, 3000);

      return (
        <Alert key="success" variant="success">
          {responseMessage}
        </Alert>
      );
    }

    return <></>;
  }

  /**
   * This function renders the signup and login forms
   * @returns JSX
   */
  renderForm = () => {
    const {
      createAdminRequest,
      createAdminResponseLoading,
      createAdminResponse,
      createAdminResponseMessage,

      loginAdminRequest,
      loginAdminResponseLoading,
      loginAdminResponse,
      loginAdminResponseMessage,

      invokeSetCreateAdminRequestParams,
      invokeCreateAdmin,

      invokeSetLoginAdminRequestParams,
      invokeLoginAdmin,
    } = this.props;
    const { isNewUser } = this.state;

    //select params and methods based on the current mode (new or existing)
    const request = isNewUser ? createAdminRequest : loginAdminRequest;
    const responseLoading = isNewUser
      ? createAdminResponseLoading
      : loginAdminResponseLoading;
    const response = isNewUser ? createAdminResponse : loginAdminResponse;
    const responseMessage = isNewUser
      ? createAdminResponseMessage
      : loginAdminResponseMessage;

    const invokeSetParams = isNewUser
      ? invokeSetCreateAdminRequestParams
      : invokeSetLoginAdminRequestParams;
    const invokeAction = isNewUser ? invokeCreateAdmin : invokeLoginAdmin;

    return (
      <div className="d-flex align-items-center justify-content-center">
        <Card style={{ width: "24rem" }}>
          <Card.Body>
            <div className="mb-3">
              <div className="d-flex justify-content-end align-items-center">
                <span className="fs-6 me-3 text-muted">
                  {isNewUser
                    ? "Already have an account ? "
                    : "Dont have an account ? "}
                </span>
                <Button
                  variant="info"
                  type="button"
                  size="sm"
                  onClick={() => {
                    this.setState({ isNewUser: !isNewUser });
                  }}
                >
                  {isNewUser ? "Login" : "Create account"}
                </Button>
              </div>

              <h3 className="text-center mb-2">
                {isNewUser ? "Create account" : "Login"}
              </h3>

              {this.renderMessage()}
            </div>

            <Form>
              <FloatingLabel
                controlId="username"
                label="Username"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="e.g john_wick"
                  onChange={(e) => {
                    const value = e.currentTarget.value;
                    invokeSetParams({ username: value });
                  }}
                  value={request.username}
                />
              </FloatingLabel>

              <FloatingLabel
                controlId="password"
                label="Password"
                className="mb-3"
              >
                <Form.Control
                  type="password"
                  placeholder="**********"
                  onChange={(e) => {
                    const value = e.currentTarget.value;
                    invokeSetParams({ password: value });
                  }}
                  value={request.password}
                />
              </FloatingLabel>

              <FloatingLabel
                controlId="name"
                label="Name"
                className="mb-3"
                hidden={!isNewUser}
              >
                <Form.Control
                  type="text"
                  placeholder="e.g Adele Enoeasy"
                  onChange={(e) => {
                    const value = e.currentTarget.value;
                    invokeSetParams({ name: value });
                  }}
                  value={request.name ?? ""}
                />
              </FloatingLabel>

              <FloatingLabel
                controlId="email"
                label="Email address"
                className="mb-3"
                hidden={!isNewUser}
              >
                <Form.Control
                  type="email"
                  placeholder="e.g shivers@edsheeran.music"
                  onChange={(e) => {
                    const value = e.currentTarget.value;
                    invokeSetParams({ email: value });
                  }}
                  value={request.email ?? ""}
                />

                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </FloatingLabel>

              <Button
                variant="primary"
                type="button"
                onClick={(e) => {
                  invokeAction(request);
                }}
                disabled={responseLoading}
              >
                {responseLoading ? (
                  <span>
                    <span className="text-primary me-2">Submitting</span>
                    <Spinner animation="grow" variant="primary" size="sm" />
                  </span>
                ) : (
                  <span>Submit</span>
                )}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    );
  };

  render() {
    const {} = this.props;
    return (
      <div className="content">
        <Container className="">
          {this.renderBack()}
          {this.renderForm()}
        </Container>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
