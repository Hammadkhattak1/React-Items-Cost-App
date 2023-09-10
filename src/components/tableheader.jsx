import { Taxes } from "../data/data";
import Table from "./table";
const TableHeader = () => {
  return (

    <thead>
      <tr>
        <th>Select Item</th>
        <th>Rate</th>
        <th>Select Tax</th>
        <th>Total Amount</th>
        <th>Actions</th>
      </tr>
    </thead>

  );
};

export default TableHeader;
