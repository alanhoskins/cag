'use client';

import { useMemo } from 'react';
import { ApolloProvider, ApolloClient, HttpLink, from, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { useAuth } from '@clerk/nextjs';

type Props = {
	children: React.ReactNode;
};

export function ApolloProviderWrapper({ children }: Props) {
	const { getToken } = useAuth();
	const apolloClient = useMemo(() => {
		const authMiddleware = setContext(async (req, { headers }) => {
			const token = await getToken({ template: 'cag-hasura' });
			return {
				headers: {
					...headers,
					authorization: `Bearer ${token}`,
				},
			};
		});

		const httpLink = new HttpLink({
			uri: process.env.GRAPHQL_URL,
		});

		return new ApolloClient({
			link: from([authMiddleware, httpLink]),
			cache: new InMemoryCache(),
		});
	}, [getToken]);

	return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
}
