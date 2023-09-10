import React from "react";
import "./App.css";
import CostCalculator from "./pages/costcalculator";
import { CostCalculatorContext } from "./context/costcalculatorcontext";
function App() {
  return (
    <CostCalculatorContext>
      <CostCalculator />
    </CostCalculatorContext>
  );
}

export default App;
