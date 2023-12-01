import { sql } from '@vercel/postgres';
import { NextApiResponse, NextApiRequest } from 'next';
 
export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  try {
    const residents = await sql`SELECT * FROM Unattended ORDER BY Paymentid DESC;`;
  return response.status(200).json({ residents });
  } catch (error) {
    return response.status(500).json({ error });
  }
 
  
}