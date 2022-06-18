import Card from "components/Card/Card";
import React from "react";
import { Table } from "react-bootstrap";

const TransactionView = (props) => {
  let { transactions } = props;
  transactions =
    transactions.length > 0 && transactions.sort((a, b) => b.id - a.id);

  const transactionHeaders = [
    "S/N",
    "ReferenceID",
    "Weight (grams)",
    "Point",
    "Rate (Weight (grams)/Point)",
    "Approval Status",
    "Trasnsaction Date",
    "Customer Firstname",
    "Customer Lastname",
    "Customer Phone",
    "Customer Email",
  ];

  return (
    <Card
      title="Your Transactions"
      category=""
      ctTableFullWidth
      ctTableResponsive
      content={
        <div style={{ overflowX: "scroll" }}>
          <Table striped hover>
            <thead>
              <tr>
                {transactionHeaders.map((prop, key) => {
                  return <th key={key + 1}>{prop}</th>;
                })}
              </tr>
            </thead>

            <tbody>
              {transactions &&
                transactions.map((prop, key) => {
                  return (
                    <tr key={key}>
                      <td>{key}</td>
                      <td>{prop.referenceID}</td>
                      <td>{prop.weight}</td>
                      <td>{prop.point}</td>
                      <td>{1 / prop.pointRatio}</td>
                      <td
                        className={`bg-${
                          prop.approved == 0
                            ? "primary"
                            : prop.approved == 1
                            ? "success"
                            : prop.approved == 2
                            ? "danger"
                            : "light"
                        }`}
                        style={{}}
                      >
                        {prop.approved == 0
                          ? "Pending"
                          : prop.approved == 1
                          ? "Approved"
                          : prop.approved == 2
                          ? "Rejected"
                          : ""}
                      </td>
                      <td>{new Date(prop.dateCreated).toDateString()}</td>
                      <td>{prop.customer?.firstname}</td>
                      <td>{prop.customer?.lastname}</td>
                      <td>{prop.customer?.phone}</td>
                      <td>{prop.customer?.email}</td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </div>
      }
    />
  );
};

export default TransactionView;
