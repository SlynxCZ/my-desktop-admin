import {NextResponse} from 'next/server';
import {queryEx, setConnection} from 'mysql-enhanced';

export async function POST(request: Request) {
  try {
    const { host, user, password, query } = await request.json();

    if (!query) {
      return NextResponse.json({ message: "SQL query is required." });
    }

    // ✅ Odstranění neviditelných znaků z SQL dotazu
    const cleanedQuery = query.replace(/\u00A0/g, " ").trim();

    // ✅ Nastavíme připojení k databázi
    setConnection({ host, user, password });

    // ✅ Spustíme dotaz s vyčištěným SQL
    const [results, errorResults] = await queryEx(cleanedQuery, []);

    if (!results || errorResults) {
      if (process.env.NODE_ENV === "development") console.log(errorResults);
      return NextResponse.json(
        { message: 'Failed to retrieve data.', error: errorResults },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: 'Successfully retrieved data.', data: results });
  } catch (error) {
    console.error('Database connection error:', error);

    return NextResponse.json(
      { message: 'Failed to retrieve data.', error: error instanceof Error ? error.message : 'Unknown error occurred' },
      { status: 500 }
    );
  }
}
