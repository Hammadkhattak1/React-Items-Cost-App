import TableHeader from "../components/tableheader";
import TableBody from "../components/tablebody";
import Row from "../common/row";
import CardHeader from "../common/cardheader";
import CardBody from "../common/cardbody";
import CardFooter from "../common/cardfooter";
import Col from "../common/col";
import Table from "../components/table";
import ButtonTemplate from "../common/button";
import CardLayout from "../common/cardlayout";
import {
  COST_CALCULATION_CASES,
  CostCalculatorConsumer,
} from "../context/costcalculatorcontext";
import { Fragment, useState } from "react";

const CostCalculator = () => {
  const data = CostCalculatorConsumer();

  const { items, dispatch, message, handleNewRow, total, subTotal } = data;
  return (
    <>
      {/* <div className="mb-3"> */}
        <Table>
          <TableHeader />
          <TableBody />
        </Table>

        <div className="mb-3">
          <p className="text-danger">{message}</p>
        </div>

        <ButtonTemplate
          buttonProps={{
            text: "Add Row",
            buttonType: "primary",
            handleClick: handleNewRow,
          }}
        />
      {/* </div> */}
      <Row>
        <Col colProps={{ extraColClasses: "fw-bold" }}></Col>
        <Col>
          <CardLayout>
            <CardHeader text={"Results:"} />
            <CardBody>
              <Row rowProps={{ extraRowClasses: "my-1" }}>
                <Col colProps={{ extraColClasses: "fw-bold" }}>Sub Total:</Col>
                <Col colProps={{ extraColClasses: "text-end" }}>
                  ${subTotal?.toFixed(2)}
                </Col>
              </Row>
              <Row rowProps={{ extraRowClasses: "my-1" }}>
                {items && items.length > 0
                  ? items.map((eachItem, index) => {
                      return (
                        <Fragment key={eachItem.trackingId}>
                          <Col colProps={{ extraColClasses: "fw-bold" }}>
                            {" "}
                            {eachItem?.itemDetails?.taxName
                              ? eachItem?.itemDetails?.taxName
                              : "Tax"}
                          </Col>
                          <Col colProps={{ extraColClasses: "text-end" }}>
                            {eachItem?.itemDetails?.itemTax ? (
                              parseFloat(eachItem.itemDetails.itemTax).toFixed(
                                2
                              )
                            ) : (
                              <span className="text-danger">No Data!</span>
                            )}
                          </Col>
                        </Fragment>
                      );
                    })
                  : null}
              </Row>

              <Row rowProps={{ extraRowClasses: "my-1" }}>
                <Col colProps={{ extraColClasses: "fw-bold" }}>Total:</Col>
                <Col colProps={{ extraColClasses: "text-end" }}>
                  ${total?.toFixed(2)}
                </Col>
              </Row>
            </CardBody>

            <CardFooter text={"Best React Ever !"} />
          </CardLayout>
        </Col>
      </Row>
    </>
  );
};

export default CostCalculator;
