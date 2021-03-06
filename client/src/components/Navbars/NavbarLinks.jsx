import React, { Component } from "react";
import { Nav, NavItem } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import RingLoader from "react-spinners/RingLoader";

const mapStateToProps = (state, props) => ({
  ...props,
  loading: false
});

const mapDispatchToProps = dispatch => ({
  onLogout() {
  }
});

class NavbarLinks extends Component {
  render() {

    const { onLogout, loading } = this.props;

    // const notification = (
    //   <div>
    //     <i className="fa fa-globe" />
    //     <b className="caret" />
    //     <span className="notification">5</span>
    //     <p className="hidden-lg hidden-md">Notification</p>
    //   </div>
    // );

    return (
      <div>
        <Nav>
          <NavItem eventKey={1} href="#">
            <i className="fa fa-dashboard" />
            <p className="hidden-lg hidden-md">Dashboard</p>
          </NavItem>



          {/* <NavDropdown
            eventKey={2}
            title={notification}
            noCaret
            id="basic-nav-dropdown"
          >
            <MenuItem eventKey={2.1}>Notification 1</MenuItem>
            
            <MenuItem eventKey={2.2}>Notification 2</MenuItem>
            
            <MenuItem eventKey={2.3}>Notification 3</MenuItem>
            
            <MenuItem eventKey={2.4}>Notification 4</MenuItem>
            
            <MenuItem eventKey={2.5}>Another notifications</MenuItem>

          </NavDropdown> */}

          {/* <NavItem eventKey={3} href="#">
            <i className="fa fa-search" />
            <p className="hidden-lg hidden-md">Search</p>
          </NavItem> */}

          <NavItem eventKey={4} >
            <RingLoader
              size={30}
              loading={loading}
            />
          </NavItem>

        </Nav>

        <Nav pullRight>
          <NavItem eventKey={1}>
            <Link to="/user" >Account</Link>
            </NavItem>

          {/* <NavDropdown
            eventKey={2}
            title="Dropdown"
            id="basic-nav-dropdown-right"
          >
          
            <MenuItem eventKey={2.1}>Action</MenuItem>
          
            <MenuItem eventKey={2.2}>Another action</MenuItem>
          
            <MenuItem eventKey={2.3}>Something</MenuItem>
          
            <MenuItem eventKey={2.4}>Another action</MenuItem>
          
            <MenuItem eventKey={2.5}>Something</MenuItem>
          
            <MenuItem divider />
          
            <MenuItem eventKey={2.5}>Separated link</MenuItem>
          </NavDropdown> */}

          <NavItem
            eventKey={3}
            onClick={e => {
              e.preventDefault();
              onLogout();
            }}
          >
            Log out
          </NavItem>
        </Nav>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavbarLinks);
