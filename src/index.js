const paymentForAnnuity = ( A, j, m, N )=>
  !j ? (A/N) : (j*A/m) / ( 1 - Math.pow(1 + j/m, -N) );

const paymentSchedule = ( A, j, m, N, startDate=(new Date()).getTime() )=> {
  const payment = paymentForAnnuity( A, j, m, N );

  const payments =
    Array(1*N).fill(0).map((o, i)=> ({
      amount: payment, date: startDate + i* (86400000 * 365.25 / m), type: 'payment'
    }) )

  let interest = [];
  let compoundedInterest = 0;
  
  Array(N-1).fill(0).forEach((o, i)=> {
    const interestPayment = (A - payment*i + compoundedInterest) * (j/m);
    compoundedInterest += interestPayment;
    
    interest.push({
      amount: -interestPayment,
      date: startDate + (i+1)* (86400000 * 365.25 / m) - 30, type: 'interest'
    });
  });
  
  return [
    { amount: -A, date: startDate, type: 'loan' },
    ...payments, ...interest,
  ];
};

const formatMoney = n => {
  const number = ''+parseFloat(Math.round(n * 100) / 100).toFixed(2).replace('-','');
  let numberWithCommas = number;
  
  for( let i=number.length-6; i>0; i -= 3)
    numberWithCommas = numberWithCommas.slice(0, i)+','+numberWithCommas.slice(i);
    
  return '$'+numberWithCommas;
}

export {
  paymentForAnnuity,
  paymentSchedule,
  formatMoney,
};
