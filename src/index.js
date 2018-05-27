const paymentForAnnuity = ( A, j, m, N )=> A/N;

const paymentSchedule = ( A, j, m, N, startDate )=> {
  const payment = paymentForAnnuity( A, j, m, N );

  const payments = [];
  const interest = [];
  
  return [
    { amount: -A, date: startDate, type: 'loan' },
    ...payments, ...interest,
  ];
};

const formatMoney = n => '$' + n;

export {
  paymentForAnnuity,
  paymentSchedule,
  formatMoney,
};
