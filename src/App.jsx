import React from 'react';
import './App.css';

function App() {
  return (
    <div>
      <div className='mb-3'>
        <table className='table'>
          <thead>
            <tr>
              <th>Select Item</th>
              <th>Rate</th>
              <th>Select Tax</th>
              <th>Total Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <select className='form-select'>
                  <option>Item 1</option>
                  <option>Item 2</option>
                  <option>Item 3</option>
                  <option>Item 4</option>
                </select>
              </td>
              <td>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Rate'
                />
              </td>
              <td>
                <select className='form-select'>
                  <option>Tax 1</option>
                  <option>Tax 2</option>
                  <option>Tax 3</option>
                  <option>Tax 4</option>
                </select>
              </td>
              <td>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Amount'
                />
              </td>
              <td>
                <button className='btn btn-danger'>Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
        <button className='btn btn-primary'>Add Row</button>
      </div>
      <div className='row'>
        <div className='col-6'></div>
        <div className='col-6'>
          <div className='card'>
            <div className='card-body'>
              <div className='row my-1'>
                <div className='col-6 fw-bold'>Sub Total:</div>
                <div className='col-6 text-end'>5000$</div>
              </div>
              <div className='row my-1'>
                <div className='col-6 fw-bold'>Tax 1:</div>
                <div className='col-6 text-end'>20$</div>
              </div>
              <div className='row my-1'>
                <div className='col-6 fw-bold'>Tax 2:</div>
                <div className='col-6 text-end'>30$</div>
              </div>
              <div className='row my-1'>
                <div className='col-6 fw-bold'>Total:</div>
                <div className='col-6 text-end'>5050$</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

const Items = [
  {
    id: 1,
    name: 'Item 1',
    rate: '100',
    tax_id: 1
  },
  {
    id: 2,
    name: 'Item 2',
    rate: '100',
    tax_id: 2
  },
  {
    id: 3,
    name: 'Item 3',
    rate: '100',
    tax_id: 1
  },
  {
    id: 4,
    name: 'Item 4',
    rate: '100',
    tax_id: 3
  },
  {
    id: 5,
    name: 'Item 5',
    rate: '100',
    tax_id: 2
  }
];

const Taxes = [
  {
    id: 1,
    name: 'Tax 1',
    value: 5
  },
  {
    id: 2,
    name: 'Tax 2',
    value: 5.5
  },
  {
    id: 3,
    name: 'Tax 4',
    value: 7
  }
];
