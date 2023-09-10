import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { v4 as uuidv4 } from "uuid";
import { Taxes } from "../data/data";

export const CostCalculator = createContext(null);

export const COST_CALCULATION_CASES = {
  ADD_NEW_ROW: "ADD_NEW_ROW",
  UPDATE_ITEMS: "UPDATE_ITEMS",
  ADD_ITEM_FIELD: "ADD_ITEM_FIELD",
  ADD_RATE_FIELD: "ADD_RATE_FIELD",
  ADD_TAX_FIELD: "ADD_TAX_FIELD",
  ADD_TOTAL: "ADD_TOTAL",
  MESSAGE: "MESSAGE",
  RESET: "RESET",
};

export const FIELD_NAMES = {
  ITEM_VALUE: "itemValue",
  ITEM_TAX: "itemTax",
  TAX_NAME: "taxName",
  totalAmount: "totalAmount",
};

export const ItemObject = {
  itemDetails: {
    itemValue: 0,
    itemRate: "",
    taxName: "",
    itemTax: 0,
    totalAmount: 0,
  },
  trackingId: uuidv4(),

  subTotal: 0,
  total: 0,
};

const initialState = {
  items: [ItemObject],

  message: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case COST_CALCULATION_CASES.ADD_NEW_ROW:
      return { ...state, items: action.payload };

    case COST_CALCULATION_CASES.UPDATE_ITEMS:
      return { ...state, items: action.payload };
    case COST_CALCULATION_CASES.RESET:
      return initialState;
    default:
      return state;
  }
};

export const CostCalculatorContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const calculateRowTotalAmount = (itemsList, rowTrackingId, index) => {
    if (itemsList) {
      const currnetRow = itemsList.find(
        (eachRow) => eachRow.trackingId === rowTrackingId
      );

      if (currnetRow) {
        let rowTotal =
          parseFloat(currnetRow.itemDetails[FIELD_NAMES.ITEM_VALUE]) +
          parseFloat(currnetRow.itemDetails[FIELD_NAMES.ITEM_TAX]);

        return rowTotal ? rowTotal : 0;
      }
    } else {
      return [];
    }
  };
  const calculateRowData = (
    FIELDNAME,
    value,
    trackingId,
    itemsList,
    taxName
  ) => {
    for (let index = 0; index < itemsList.length; index++) {
      if (itemsList[index].trackingId === trackingId) {
        if (FIELDNAME !== FIELD_NAMES.totalAmount) {
          itemsList[index].itemDetails[FIELDNAME] = value;

          let rowTotal = calculateRowTotalAmount(itemsList, trackingId, index);
          itemsList[index].itemDetails[FIELD_NAMES.totalAmount] = rowTotal;

          if (taxName) {
            itemsList[index].itemDetails[FIELD_NAMES.TAX_NAME] = taxName;
          }
        }
        break;
      }
    }
    dispatch({
      type: COST_CALCULATION_CASES.UPDATE_ITEMS,
      payload: itemsList,
    });
  };

  const mainOnChangeMethod = (value, FIELDNAME, trackingId, taxIndex) => {
    let foundTax = null;
    if (taxIndex) {
      taxIndex = taxIndex - 1;
      foundTax = Taxes[taxIndex];
    }
    let parsedValue = 0;
    if (value) {
      parsedValue = parseFloat(value);
      if (state.items) {
        const itemsList = [...state.items];

        calculateRowData(
          FIELDNAME,
          value,
          trackingId,
          itemsList ? itemsList : [],
          foundTax ? foundTax?.name : "Item Tax"
        );
      }
    }
  };

  const handleNewRow = () => {
    if (state.items) {
      dispatch({
        type: COST_CALCULATION_CASES.ADD_NEW_ROW,
        payload: [
          ...state.items,
          {
            itemDetails: {
              itemValue: 0,
              itemRate: "",
              itemTax: 0,
              taxName: "",
              totalAmount: 0,
            },
            trackingId: uuidv4(),
          },
        ],
      });
    }
  };

  const handleNewRowDelete = (trackingId) => {
    const itemsList = [...state.items];
    const newItems = itemsList.filter(
      (eachItem) => eachItem.trackingId !== trackingId
    );

    dispatch({
      type: COST_CALCULATION_CASES.ADD_NEW_ROW,
      payload: newItems,
    });
  };

  const { total, subTotal } = useMemo(() => {
    if (state.items) {
      const itemsList = [...state.items];
      const total = itemsList.reduce((accumulator, object) => {
        return accumulator + object.itemDetails.totalAmount;
      }, 0);

      const subTotal = itemsList.reduce((accumulator, object) => {
        return accumulator + parseFloat(object.itemDetails.itemValue);
      }, 0);

      return { total: total ? total : 0, subTotal: subTotal ? subTotal : 0 };
    }
  }, [state.items]);


  

  return (
    <CostCalculator.Provider
      value={{
        ...state,
        total,
        subTotal,
        dispatch,
        handleNewRow,
        mainOnChangeMethod,
        handleNewRowDelete,
      }}
    >
      {children}
    </CostCalculator.Provider>
  );
};

export const CostCalculatorConsumer = () => {
  const data = useContext(CostCalculator);

  return data;
};
