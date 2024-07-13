import { NextResponse } from 'next/server';

export async function POST(request: any) {
  const formData = await request.formData();
  const file = formData.get('file');
  const collectionName = formData.get('collection_name');

  const backendResponse = await fetch('http://127.0.0.1:8000/upload', {
    method: 'POST',
    body: formData,
  });

  const data = await backendResponse.json();
  return NextResponse.json(data);
}
