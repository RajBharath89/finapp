import { sql } from '@vercel/postgres';
import { NextApiResponse, NextApiRequest } from 'next';
 
export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  try {
    const data = await sql`SELECT json_build_object(
      
          'tot_income', (
              SELECT SUM(Amount)
              FROM Transactions
              WHERE Txntype = 'Income'
          ),
          'tot_expense', (
              SELECT SUM(Amount)
              FROM Transactions
              WHERE Txntype = 'Expense'
          ),      
          'mt_income', (
              SELECT SUM(Amount)
              FROM Transactions
              WHERE Txntype = 'Income' AND Paymenttype = 'Maintenance'
          ),
          'mt_expense', (
              SELECT SUM(Amount)
              FROM Transactions
              WHERE Txntype = 'Expense' AND Paymenttype = 'Maintenance'
          ),      
          'ms_income', (
              SELECT SUM(Amount)
              FROM Transactions
              WHERE Txntype = 'Income' AND Paymenttype = 'Miscellaneous'
          ),
          'ms_expense', (
              SELECT SUM(Amount)
              FROM Transactions
              WHERE Txntype = 'Expense' AND Paymenttype = 'Miscellaneous'
          )
  ) AS data`;
  return response.status(200).json({ data });
  } catch (error) {
    return response.status(500).json({ error });
  }
 
  
}


