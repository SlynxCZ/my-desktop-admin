import {NextResponse} from 'next/server';
import {getSession} from "next-auth/react";
import {query, setConnection} from 'mysql-enhanced';

export async function POST(request: Request) {
  try {
    const session = await getSession({ req: request });

    const { host, user, password } = session;
    const { database } = await request.json();

    // Nastavíme připojení k databázi
    setConnection({
      host,
      user,
      password,
    });

    // Pokud je zadaná databáze, připojíme se k ní
    if (database) {
      await query(`USE ${database}`, []);
    }

    return NextResponse.json({ message: 'Successfully connected to the database.', success: true });
  } catch (error) {
    console.error('Database connection error:', error);

    // Zajištění správného typu pro error (instance Error)
    if (error instanceof Error) {
      return NextResponse.json({ message: 'Failed to connect to the database.', error: error.message }, { status: 500 });
    }

    // Pokud error není instance Error, vracíme obecnou chybu
    return NextResponse.json({ message: 'Failed to connect to the database.', error: 'Unknown error occurred' }, { status: 500 });
  }
}
