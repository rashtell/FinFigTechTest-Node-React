import {
  getDashboard,
  getTransactions,
} from "actions/index.admin.actions";
import TransactionView from "components/Customs/TransactionView";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";
import React, { Component } from "react";
import { Col, Grid, Row } from "react-bootstrap";
import { connect } from "react-redux";
import Button from "../components/CustomButton/CustomButton";

const mapStateToProps = (state, props) => {
  const { getAdminDashboard: dashboard } = state.admin.response;
  const {
    getAdminTransactions: transactions,
  } = state.admin.response;
  return {
    customerCount: dashboard.customerCount,
    transactionCount: dashboard.transactionCount,
    unapprovedTransactions: dashboard.unapprovedTransactions,
    approvedTransactions: dashboard.approvedTransactions,
    disApprovedTransactions: dashboard.disApprovedTransactions,
    transactions,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onDashboard() {
    dispatch(getDashboard());
  },
  onGetTransactions() {
    dispatch(getTransactions());
  },
});

class Home extends Component {
  constructor(props) {
    
  }



  render() {
    const {
      
    } = this.props;

    return (
      <div className="content">
        <Grid fluid>
         
        </Grid>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
