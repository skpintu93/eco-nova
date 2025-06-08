import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export async function generateMetadata(): Promise<Metadata> {
  redirect('/en/');
}

export default async function HomePage() {
  redirect('/en/');
}
