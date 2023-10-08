import { sql } from '@vercel/postgres';
import { NextApiResponse, NextApiRequest } from 'next';
 
export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  try {
    // const payments = await sql`SELECT * FROM Payments ORDER BY Status DESC;`;
    const payments = await sql`SELECT Payments.amount, Payments.duedate, Payments.house, Payments.notes, Payments.paymentid, Payments.paymenttype, Payments.status, Residents.name
    FROM Payments
    INNER JOIN Residents
    ON Payments.house=Residents.house;`;
  return response.status(200).json({ payments });
  } catch (error) {
    return response.status(500).json({ error });
  }
 
  
}

