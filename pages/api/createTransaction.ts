import { sql } from '@vercel/postgres';
import { NextApiResponse, NextApiRequest } from 'next';
 
export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  try {
    // const resName = request.query.name as string;
    // const resId = request.query.id as string;
    // const resHouse = request.query.resHouse as string;
    // const resType = request.query.type as string;

    const { txnType, notes, amount,paymentType } = request.body

    console.log()
    if (!txnType || !notes || !amount || !paymentType) throw new Error('Fields required');
    
      try {
        // const query = {
        //   text: 'INSERT INTO payment (payment_type, notes, amount, assigned_house) VALUES ($1, $2, $3, $4)',
        //   values: [paymentType, notes, amount, house],
        // };
        await sql`INSERT INTO Transactions (Txntype,Amount,Notes,Paymenttype) VALUES (${txnType},${amount},${notes},${paymentType})`;

  
      } catch (error) {
        console.error(`Error inserting new transaction:`, error);
      }

    // await sql`UPDATE Residents SET Name = ${name}, Type= ${type} WHERE Resid=${id};`;
  } catch (error) {
    return response.status(500).json({ error });
  }
 
  const residents = await sql`SELECT * FROM Residents;`;
  return response.status(200).json({ residents });
}