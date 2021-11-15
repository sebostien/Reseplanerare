import Head from 'next/head';
import Main from '../components/MainLayout';

export default function Home() {
	return (
		<>
			<Head>
				<title>Reseplanerare</title>
				<meta name="description" content="Reseplanerare" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Main />
		</>
	);
}
