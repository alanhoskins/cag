import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';

export const metadata: Metadata = {
	title: 'Chicago Artist Guide',
	description:
		"Diversifying theater one connection at a time. Diversifying Chicago Theatre by providing more equitable casting and hiring opportunities. At Chicago Artist Guide, we're reimagining how theatres find, audition, and cast artists for their productions. We envision a more equitable, accessible way for local theatres to connect directly with the diverse actors, artists, and backstage crew they represent, all in an easy-to-use online network.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<ClerkProvider>
			<html lang="en">
				<body>{children}</body>
			</html>
		</ClerkProvider>
	);
}
