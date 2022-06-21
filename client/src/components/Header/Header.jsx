import React from "react";
import { Button, Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logoutAdmin } from "../../redux/actions/fetch/admin/admin.actions";

const mapStateToProps = (state, props) => {
  return {
    authenticated: state.app.isAuthenticated,
    adminLogoutResponseLoading: state.fetch.admin.admin.logoutAdmin.loading,
  };
};

const mapDispatchToProps = (dispatch) => ({
  invokeLogoutAdmin() {
    dispatch(logoutAdmin());
  },
});

class Header extends React.Component {
  /**
   * This method renders the Logout button label
   * @returns JSX
   */
  renderLogoutButtonLabel() {
    const { adminLogoutResponseLoading } = this.props;

    return adminLogoutResponseLoading ? (
      <span>
        <span className="text-primary me-2">Logout...</span>
        <Spinner animation="grow" variant="primary" size="sm" />
      </span>
    ) : (
      <span>Logout</span>
    );
  }

  render() {
    const { authenticated, invokeLogoutAdmin } = this.props;

    return (
      <div className="d-flex align-items-end justify-content-end">
        {authenticated ? (
          <Button
            variant="light"
            type="button"
            className="mb-2"
            onClick={invokeLogoutAdmin}
          >
            {this.renderLogoutButtonLabel()}
          </Button>
        ) : (
          <p className="text-end text-muted font-monospace">
            <Link to="/login">Signup or Login</Link>
          </p>
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
