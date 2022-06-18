import {
  createTransaction,
  getTransactions,
  saveCreatetTransaction,
} from "../redux/actions/index.actions";
import Card from "../components/Card/Card.jsx";
import Button from "../components/CustomButton/CustomButton.jsx";
import TransactionView from "../components/Customs/TransactionView";
import { FormInputs } from "../components/FormInputs/FormInputs.jsx";
import React, { Component } from "react";
import { Col, Grid, Row, ControlLabel } from "react-bootstrap";
import { connect } from "react-redux";

const mapStateToProps = (state, props) => {
  const {
    getAdminTransactions: transactions,
    loginAdmin: login,
  } = state.admin.response;
  const {
    createAdminTransaction: createTransaction,
  } = state.transaction.request;
  return {
    props,
    transactions,
    adminID: login.id,
    organizationID: login.organizationID,
    weight: createTransaction.weight,
    cardID: createTransaction.cardID,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onGetTransactions() {
    dispatch(getTransactions());
  },
  onCardIDInput(cardID) {
    dispatch(saveCreatetTransaction({ cardID }));
  },
  onWeightInput(weight) {
    dispatch(saveCreatetTransaction({ weight }));
  },
  onCreateTransaction({
    cardID,
    adminID,
    organizationID,
    deviceID,
    weight,
  }) {
    dispatch(
      createTransaction({
        cardID,
        adminID,
        organizationID,
        deviceID,
        weight,
      })
    );
  },
});

class Events extends Component {
  constructor(props) {
    super(props);

    this.props.onGetTransactions();
  }

  render() {
    const {
      onCardIDInput,
      onWeightInput,
      onCreateTransaction,
      onGetTransactions,
      transactions,
      adminID,
      organizationID,
      weight,
      cardID,
    } = this.props;

    const pointRatio = 0.1;

    const deviceID = "WEB_EXTERNAL_AGENT_" + adminID;

    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Create a transaction"
                content={
                  <form>
                    <h4>
                      The curent rate is {pointRatio * 100}gramms for 1 point
                    </h4>
                    <FormInputs
                      ncols={["col-md-6", "col-md-6"]}
                      properties={[
                        {
                          label: "Card Serial",
                          type: "number",
                          bsClass: "form-control",
                          placeholder: "Card Serial",
                          value: cardID,
                          onChange: (e) => {
                            let value = e.currentTarget.value;
                            onCardIDInput(value);
                          },
                        },
                        {
                          label: "Weight (gramms)",
                          type: "number",
                          bsClass: "form-control",
                          placeholder: "Weight (gramms)",
                          value: weight,
                          onChange: (e) => {
                            let value = e.currentTarget.value;
                            onWeightInput(value);
                          },
                        },
                      ]}
                    />

                    <Button
                      bsStyle="info"
                      fill
                      type="submit"
                      onClick={(e) => {
                        e.preventDefault();

                        if (
                          window.confirm(
                            "The points for this transaction in " +
                              weight * pointRatio +
                              ". Are you sure you want to proceed ?"
                          )
                        ) {
                          onCreateTransaction({
                            cardID,
                            adminID,
                            organizationID,
                            deviceID,
                            weight,
                          });
                        }
                      }}
                    >
                      Create Transaction
                    </Button>

                    <div className="clearfix" />
                  </form>
                }
              />

              <div>
                <Button pullRight simple onClick={onGetTransactions}>
                  <img
                    src="/images/refresh.png"
                    alt="refresh transactions"
                    width="20"
                    height="20"
                  />
                </Button>
              </div>
              <TransactionView transactions={transactions} />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Events);
