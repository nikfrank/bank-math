import { paymentForAnnuity, paymentSchedule } from './';

test('payment amount', ()=>{
  const islamicLoanPayment = paymentForAnnuity( 1000, 0, 12, 100 );
  expect( islamicLoanPayment ).toEqual( 10 );
  
  const americanLoanPayment = paymentForAnnuity( 1000, .12, 12, 120 );
  expect( americanLoanPayment ).toBeGreaterThan( 14 );
  expect( americanLoanPayment ).toBeLessThan( 15 );
});

test('payment schedule', ()=>{
  const islamicSchedule = paymentSchedule( 1000, 0, 12, 100 );
  expect( islamicSchedule.reduce((p, c)=> p+c.amount, 0) ).toEqual( 0 );

  
  const americanSchedule = paymentSchedule( 1000, .12, 12, 120 );
  expect( americanSchedule.reduce((p, c)=> p+c.amount, 0) ).toBeLessThan( 1 );
  
});
