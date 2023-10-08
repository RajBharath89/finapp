import { sql } from '@vercel/postgres';
import { NextApiResponse, NextApiRequest } from 'next';
 
export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  try {
    const resName = request.query.resName as string;
    const resHouse = request.query.resHouse as string;
    const resType = request.query.resType as string;
    if (!resName || !resHouse || !resType) throw new Error('All fields required');
    await sql`INSERT INTO Residents (Name, House, Type) VALUES (${resName}, ${resHouse}, ${resType});`;
  } catch (error) {
    return response.status(500).json({ error });
  }
 
  const residents = await sql`SELECT * FROM Residents;`;
  return response.status(200).json({ residents });
}