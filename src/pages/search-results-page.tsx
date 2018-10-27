import * as React from 'react';

import gql from 'graphql-tag';
import { inject, observer } from 'mobx-react';
import { Query } from 'react-apollo';
import { Page, PageTitle, User, UserList } from '../components';
import { RootStore } from '../stores';

export interface SearchResultsProps {
    rootStore?: RootStore;
}

export const SearchResultsPage = inject('rootStore')(
    observer(({ rootStore }: SearchResultsProps) => {
        const { routerStore } = rootStore!;
        const searchKey = (routerStore.routerState.queryParams as any).q;

        return (
            <Query query={QUERY} variables={{ login: searchKey }}>
                {({ loading, error, data }) => {
                    if (loading) {
                        return <p>Loading...</p>;
                    }
                    if (error) {
                        return <p>Error :(</p>;
                    }

                    const userCount = data.search.userCount;
                    const userLabel = userCount === 1 ? 'User' : 'Users';
                    const users = data.search.edges.map(
                        (edge: any) => edge.user
                    );

                    return (
                        <Page>
                            <PageTitle>
                                {userCount} {userLabel}
                            </PageTitle>
                            <UserList users={users} />
                        </Page>
                    );
                }}
            </Query>
        );
    })
);

const QUERY = gql`
    query UserSearch($login: String!) {
        search(query: $login, type: USER, first: 20) {
            userCount
            edges {
                user: node {
                    ... on User {
                        id
                        ...User
                    }
                }
            }
        }
    }

    ${User.fragment}
`;
