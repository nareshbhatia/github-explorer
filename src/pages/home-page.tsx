import * as React from 'react';

import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Page, PageTitle, Repo, RepoList } from '../components';

export const HomePage = () => (
    <Query query={QUERY}>
        {({ loading, error, data }) => {
            if (loading) {
                return <p>Loading...</p>;
            }
            if (error) {
                return <p>Error :(</p>;
            }

            const repos = data.search.edges.map((edge: any) => edge.node);

            return (
                <Page>
                    <PageTitle>Top 10 JavaScript Repos</PageTitle>
                    <RepoList repos={repos} />
                </Page>
            );
        }}
    </Query>
);

const QUERY = gql`
    {
        search(
            query: "language:JavaScript stars:>10000"
            type: REPOSITORY
            first: 10
        ) {
            edges {
                node {
                    ... on Repository {
                        id
                        ...Repo
                    }
                }
            }
        }
    }

    ${Repo.fragment}
`;
