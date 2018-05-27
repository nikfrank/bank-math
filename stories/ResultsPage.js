import React, { Component } from 'react';
import { paymentSchedule, formatMoney } from '../src/';

import './index.css';

export default class ResultsPage extends Component {
  state = {
    transactions: [],
    totalInterest: 0,
    totalBalance: 0,

    amount: 1000000,
    rate: 0.05,
    paymentsPerYear: 12,
    totalPayments: 240,
  }
  
  load = ()=>{
    const {
      amount,
      rate,
      paymentsPerYear,
      totalPayments,
    } = this.state;

    const schedule =
      paymentSchedule( amount, rate, paymentsPerYear, totalPayments )
        .sort( (a, b)=> a.date > b.date ? 1 : -1 )
        .map( transaction => ({
          ...transaction, date: new Date(transaction.date).toISOString().split('T')[0]
        }) )

    const totalInterest = schedule.filter( t=> t.type === 'interest' )
                                  .reduce((p, c)=> p + c.amount, 0);

    const totalBalance = schedule.reduce((p, c)=> p + c.amount, 0);

    this.setState({ transactions: schedule, totalInterest, totalBalance });
  }

  setAmount = ({ target: { value } })=> this.setState({ amount: value })
  setRate = ({ target: { value } })=> this.setState({ rate: value })
  setPaymentsPerYear = ({ target: { value } })=> this.setState({ paymentsPerYear: value })
  setTotalPayments = ({ target: { value } })=> this.setState({ totalPayments: value })
  
  render(){
    const {
      transactions=[],
      totalInterest,
      totalBalance,

      amount,
      rate,
      paymentsPerYear,
      totalPayments,
    } = this.state;
    
    return (
      <div>
        <div className='annuity-form'>
          <label>
            Loan Amount
            <input onChange={this.setAmount} value={amount} type='number'/>
          </label>

          <label>
            Yearly Interest (deicmal)
            <input onChange={this.setRate} value={rate} type='number' step={0.001}/>
          </label>

          <label>
            Payments Per Year
            <input onChange={this.setPaymentsPerYear} value={paymentsPerYear} type='number'/>
          </label>

          <label>
            Total Payments
            <input onChange={this.setTotalPayments} value={totalPayments} type='number'/>
          </label>
          
          <button onClick={this.load}>Calculate</button>
        </div>
        
        <table className='transactions'>
          {!transactions.length ? null: (
             <thead>
               <th>Date</th>
               <th>Amount</th>
               <th>Type</th>
             </thead>
           )}
          <tbody>
            {transactions.map( ({ date, amount, type }, ti)=> (
               <tr key={ti}>
                 <td>{date}</td>
                 <td style={{ color: amount > 0 ? 'black' : 'red'}}>
                   {formatMoney(amount)}
                 </td>
                 <td>{type}</td>
               </tr>
             ) )}
          </tbody>
        </table>

        <p>Total Interest: {formatMoney(totalInterest)}</p>
        <p>Total Balance: {formatMoney(totalBalance)}</p>
      </div>
    );
  }
}
