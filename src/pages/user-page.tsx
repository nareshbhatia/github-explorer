import * as React from 'react';

import Divider from '@material-ui/core/Divider';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import Typography from '@material-ui/core/Typography/Typography';
import gql from 'graphql-tag';
import { inject, observer } from 'mobx-react';
import { Query } from 'react-apollo';
import {
    FullHeightVerticalContainer,
    Header,
    OrgTile,
    Repo,
    RepoList,
    ScrollingContent,
    UserDetail
} from '../components';
import { RootStore } from '../stores';

export interface UserPageProps {
    rootStore?: RootStore;
}

export const UserPage = inject('rootStore')(
    observer(({ rootStore }: UserPageProps) => {
        const { routerStore } = rootStore!;
        const login = (routerStore.routerState.params as any).login;

        return (
            <Query query={QUERY} variables={{ login }}>
                {({ loading, error, data }) => {
                    if (loading) {
                        return <p>Loading...</p>;
                    }
                    if (error) {
                        return <p>Error :(</p>;
                    }

                    return <UserPageLayout user={data.user} />;
                }}
            </Query>
        );
    })
);

const QUERY = gql`
    query UserQuery($login: String!) {
        user(login: $login) {
            ...UserDetail

            organizations(first: 10) {
                nodes {
                    ...OrgTile
                }
            }

            repositories(
                first: 100
                isFork: false
                orderBy: { field: NAME, direction: ASC }
            ) {
                nodes {
                    ... on Repository {
                        ...Repo
                    }
                }
            }
        }
    }

    ${OrgTile.fragment}
    ${UserDetail.fragment}
    ${Repo.fragment}
`;

// ----- UserPageLayout (Pure Presentational Component) -----

const styles = (theme: Theme) =>
    createStyles({
        content: {
            paddingLeft: theme.spacing.unit * 2,
            paddingRight: theme.spacing.unit * 2,
            display: 'flex'
        },
        lhs: {
            flex: '0 0 250px',
            marginRight: theme.spacing.unit * 3
        },
        rhs: {
            flex: 1
        },
        divider: {
            marginTop: theme.spacing.unit * 2,
            marginBottom: theme.spacing.unit
        },
        orgTile: {
            marginRight: 4
        }
    });

interface UserPageLayoutProps extends WithStyles<typeof styles> {
    user: any;
}

const UserPageLayout = withStyles(styles)(
    ({ classes, user }: UserPageLayoutProps) => {
        return (
            <FullHeightVerticalContainer>
                <Header />
                <div className={classes.content}>
                    <div className={classes.lhs}>
                        <UserDetail user={user} />
                        <Divider className={classes.divider} />

                        <Typography variant="h6" gutterBottom={true}>
                            Organizations
                        </Typography>
                        <div>
                            {user.organizations.nodes.map((org: any) => (
                                <OrgTile
                                    key={org.id}
                                    org={org}
                                    className={classes.orgTile}
                                />
                            ))}
                        </div>
                    </div>
                    <ScrollingContent className={classes.rhs}>
                        <RepoList repos={user.repositories.nodes} />
                    </ScrollingContent>
                </div>
            </FullHeightVerticalContainer>
        );
    }
);
