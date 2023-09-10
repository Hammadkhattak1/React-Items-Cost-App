import { Fragment, useState } from "react";
import ButtonTemplate from "../common/button";

import {
  COST_CALCULATION_CASES,
  CostCalculatorConsumer,
  FIELD_NAMES,
} from "../context/costcalculatorcontext";
import { Items, Taxes } from "../data/data";
import Table from "./table";
const TableBody = () => {
  const data = CostCalculatorConsumer();

  const { items, dispatch, mainOnChangeMethod, handleNewRowDelete } = data;

  return (

   
    <tbody>
      {items && items.length > 0 ? (
        items.map((eachItem) => {
          return (
            <tr key={eachItem.trackingId}  >
              <td>
                <select
                  className="form-select"
                  onChange={(e) => {
                    mainOnChangeMethod(
                      e.target.value,
                      FIELD_NAMES.ITEM_VALUE,
                      eachItem.trackingId
                    );
                  }}
                  value={eachItem?.itemDetails?.itemValue}
                >
                  <option value={""}>Select Item</option>
                  {Items &&
                    Items.map((eachItem) => {
                      return (
                        <option value={eachItem.rate} key={eachItem.id}>
                          {eachItem.name}
                        </option>
                      );
                    })}
                </select>
              </td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Rate"
                  value={parseFloat(eachItem?.itemDetails?.itemValue).toFixed(
                    2
                  )}
                  readOnly
                  disabled
                />
              </td>
              <td>
                <select
                  className="form-select"
                  onChange={(e) => {
                    mainOnChangeMethod(
                      e.target.value,
                      FIELD_NAMES.ITEM_TAX,
                      eachItem.trackingId,
                      e.nativeEvent.target.selectedIndex
                    );
                  }}
                  value={eachItem?.itemDetails?.itemTax}
                >
                  <option value={""}>Select Tax</option>

                  {Taxes &&
                    Taxes.map((eachTax) => {
                      return (
                        <option value={eachTax.value} key={eachTax.id}>
                          {eachTax.name}
                        </option>
                      );
                    })}
                </select>
              </td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Amount"
                  value={eachItem?.itemDetails?.totalAmount?.toFixed(2)}
                  readOnly
                />
              </td>
              <td>
                <ButtonTemplate
                  buttonProps={{
                    text: "Remove",
                    buttonType: "danger",
                    handleClick: () => {
                      handleNewRowDelete(eachItem.trackingId);
                    },
                  }}
                />
              </td>
            </tr>
          );
        })
      ) : (
        <p className="text-danger py-2">Add a Row to Calculate Cost!</p>
      )}
    </tbody>
  );
};

export default TableBody;
