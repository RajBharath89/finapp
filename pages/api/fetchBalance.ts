import { sql } from '@vercel/postgres';
import { NextApiResponse, NextApiRequest } from 'next';
 
export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  try {
    const data = await sql`SELECT json_build_object(
      'total_balance', json_build_object(
          'income', (
              SELECT SUM(Amount)
              FROM Transactions
              WHERE Txntype = 'Income'
          ),
          'expense', (
              SELECT SUM(Amount)
              FROM Transactions
              WHERE Txntype = 'Expense'
          )
      ),
      'maint_balance', json_build_object(
          'income', (
              SELECT SUM(Amount)
              FROM Transactions
              WHERE Txntype = 'Income' AND Paymenttype = 'Maintenance'
          ),
          'expense', (
              SELECT SUM(Amount)
              FROM Transactions
              WHERE Txntype = 'Expense' AND Paymenttype = 'Maintenance'
          )
      ),
      'misc_balance', json_build_object(
          'income', (
              SELECT SUM(Amount)
              FROM Transactions
              WHERE Txntype = 'Income' AND Paymenttype = 'Miscellaneous'
          ),
          'expense', (
              SELECT SUM(Amount)
              FROM Transactions
              WHERE Txntype = 'Expense' AND Paymenttype = 'Miscellaneous'
          )
      )
  ) AS data`;
  return response.status(200).json({ data });
  } catch (error) {
    return response.status(500).json({ error });
  }
 
  
}


