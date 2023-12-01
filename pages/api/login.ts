import { sql } from '@vercel/postgres';
import { NextApiResponse, NextApiRequest } from 'next';

const users = [
  { username: 'admin', password: 'admin@sk123' },
];
 
export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  if (request.method === 'POST') {
    const { username, password } = request.body;
    const user = users.find((u) => u.username === username && u.password === password);

    if (user) {
      // Authentication successful
      // Redirect the user to a different page, like the dashboard
      response.status(200).json({ success: true });
      

    } else {
      // Authentication failed
      response.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } else {
    response.status(405).end(); // Method not allowed
  }
}