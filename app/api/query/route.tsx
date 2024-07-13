import { NextResponse } from 'next/server';

export async function POST(request: any) {
  const body = await request.json();

  const backendResponse = await fetch('http://127.0.0.1:8000/query', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const data = await backendResponse.json();
  return NextResponse.json(data);
}
