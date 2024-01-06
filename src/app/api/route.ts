import { NextResponse } from 'next/server'
import { redirect } from 'next/navigation'
 
export async function GET(request: Request) {
    console.log('\x1b[42m%s\x1b[0m', 'Hello route.ts line:5');
    redirect("/video")
  return NextResponse.json({ msg: 'Hello from server' })
}