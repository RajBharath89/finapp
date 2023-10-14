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

    const { id } = request.body

    console.log(id)
    if (!id) throw new Error('Fields required');
    await sql`DELETE FROM Payments WHERE PaymentID=${id}`;
  } catch (error) {
    return response.status(500).json({ error });
  }
 
  const residents = await sql`SELECT * FROM Residents;`;
  return response.status(200).json({ residents });
}