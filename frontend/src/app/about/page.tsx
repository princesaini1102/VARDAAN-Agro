import { Metadata } from 'next';
import { AboutPage } from '@/components/pages/AboutPage';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about VARDAAN Agro Farm - our story, mission, values, and commitment to sustainable organic farming.',
};

export default function About() {
  return <AboutPage />;
}