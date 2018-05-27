import BankMath from './';

test('math', ()=>{
  expect( 1 + 2 ).toEqual( 3 );
  expect( BankMath.add(1,2,3,4) ).toEqual( 10 );
});
