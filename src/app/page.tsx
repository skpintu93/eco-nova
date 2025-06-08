import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getLandingPageMetadata, getLandingPageSections } from '@/lib/contentful';
import { DynamicSection } from '@/components/sections/DynamicSection';

export async function generateMetadata(): Promise<Metadata> {
  redirect('/en/');
}

export default async function HomePage() {
  redirect('/en/');
}
