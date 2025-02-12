import {NextResponse} from 'next/server';
import {queryEx, setConnection} from 'mysql-enhanced';

export async function POST(request: Request) {
  try {
    const { host, user, password } = await request.json();

    // Nastavíme připojení k databázi
    setConnection({
      host,
      user,
      password,
    });

    // Získáme seznam databází
    const [results, errorResults] = await queryEx<{ Database: string }[]>("SHOW DATABASES", []);

    if (!results || errorResults) {
      if (process.env.NODE_ENV === "development") console.log(errorResults)
      return NextResponse.json({ message: 'Failed to retrieve schemas.', error: errorResults }, { status: 500 });
    }

    return NextResponse.json({ message: 'Successfully retrieved schemas.', data: results.map((db) => db.Database) });
  } catch (error) {
    console.error('Schema connection error:', error);

    // Zajištění správného typu pro error (instance Error)
    if (error instanceof Error) {
      return NextResponse.json({ message: 'Failed to retrieve schemas.', error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Failed to retrieve schemas.', error: 'Unknown error occurred' }, { status: 500 });
  }
}
