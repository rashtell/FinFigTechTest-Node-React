import React, { Component } from "react";
import { Navbar } from "react-bootstrap";

import NavbarLinks from "./NavbarLinks.jsx";
import { connect } from "react-redux";

const mapStateToProps = (state, props) => ({
  props
});

const mapDispatchToProps = () => ({});

class Header extends Component {
  constructor(props) {
    super(props);

    this.mobileSidebarToggle = this.mobileSidebarToggle.bind(this);

    this.state = {
      sidebarExists: false
    };
  }

  mobileSidebarToggle(e) {
    if (this.state.sidebarExists === false) {
      this.setState({
        sidebarExists: true
      });
    }

    e.preventDefault();

    document.documentElement.classList.toggle("nav-open");

    var node = document.createElement("div");
    node.id = "bodyClick";

    node.onclick = function () {
      this.parentElement.removeChild(this);

      document.documentElement.classList.toggle("nav-open");
    };

    document.body.appendChild(node);
  }

  render() {
    return (
      <Navbar fluid>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">{this.props.brandText}</a>
          </Navbar.Brand>

          <Navbar.Toggle onClick={this.mobileSidebarToggle} />
        </Navbar.Header>

        <Navbar.Collapse>
          <NavbarLinks />
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
