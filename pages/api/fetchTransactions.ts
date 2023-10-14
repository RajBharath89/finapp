import { sql } from '@vercel/postgres';
import { NextApiResponse, NextApiRequest } from 'next';
 
export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  try {
    const txn = await sql`SELECT * FROM Transactions ORDER BY Txnid DESC;`;
  return response.status(200).json({ txn });
  } catch (error) {
    return response.status(500).json({ error });
  }
 
  
}