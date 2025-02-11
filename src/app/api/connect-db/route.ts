import {NextResponse} from 'next/server';
import {queryEx, setConnection} from 'mysql-enhanced'; // Ujistěte se, že jste importovali správné funkce pro připojení

export async function POST(request: Request) {
  try {
    const { host, user, password } = await request.json();

    // Nastavení připojení na základě předaných údajů
    setConnection({
      host,
      user,
      password,
    });

    // Pokusíme se provést jednoduchý dotaz, abychom ověřili připojení
    const [results, errorResults] = await queryEx("SELECT * FROM servers.admins", []); // Tohle ověří, že připojení funguje

    console.log(results, errorResults);

    return NextResponse.json({ message: 'Successfully connected to the database.' });
  } catch (error) {
    console.error('Database connection error:', error);
    // @ts-ignore
    return NextResponse.json({ message: 'Failed to connect to the database.', error: error.message }, { status: 500 });
  }
}
