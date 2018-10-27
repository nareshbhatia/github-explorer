import * as React from 'react';

import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import Typography from '@material-ui/core/Typography/Typography';
import gql from 'graphql-tag';
import { InternalLink, LocationIcon, TitleLink } from '..';

interface UserProps {
    user: any;
}

export const User = ({ user }: UserProps) => <UserInner user={user} />;

User.fragment = gql`
    fragment User on User {
        id
        login
        name
        avatarUrl
        location
        followers {
            totalCount
        }
        following {
            totalCount
        }
    }
`;

// ----- UserInner (Pure Presentational Component) -----

const styles = (theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            alignItems: 'center'
        },
        avatar: {
            marginRight: theme.spacing.unit * 2,
            width: 90,
            height: 90,
            borderRadius: 6
        },
        stats: {
            marginTop: theme.spacing.unit,
            fontSize: 12,
            lineHeight: 1.5
        },
        icon: {
            marginRight: 3,
            verticalAlign: 'text-bottom'
        },
        stat: {
            marginRight: theme.spacing.unit * 2
        }
    });

interface UserInnerProps extends WithStyles<typeof styles> {
    user: any;
}

const UserInner = withStyles(styles)(({ classes, user }: UserInnerProps) => {
    return (
        <div className={classes.root}>
            <img
                className={classes.avatar}
                src={user.avatarUrl}
                alt={user.name}
            />
            <div>
                {user.login && (
                    <TitleLink>
                        <InternalLink
                            routeName="users"
                            params={{ login: user.login }}
                        >
                            {user.login}
                        </InternalLink>
                    </TitleLink>
                )}

                <Typography variant="subtitle1">{user.name}</Typography>

                <div className={classes.stats}>
                    {user.location && (
                        <React.Fragment>
                            <LocationIcon className={classes.icon} />
                            <span className={classes.stat}>
                                {user.location}
                            </span>
                        </React.Fragment>
                    )}

                    <span className={classes.stat}>
                        Followers:{' '}
                        {user.followers ? user.followers.totalCount : 0}
                    </span>

                    <span className={classes.stat}>
                        Following:{' '}
                        {user.following ? user.following.totalCount : 0}
                    </span>
                </div>
            </div>
        </div>
    );
});
