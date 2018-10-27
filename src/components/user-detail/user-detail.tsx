import * as React from 'react';

import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import Typography from '@material-ui/core/Typography/Typography';
import gql from 'graphql-tag';
import { LocationIcon } from '..';

interface UserDetailProps {
    user: any;
}

export const UserDetail = ({ user }: UserDetailProps) => (
    <UserDetailInner user={user} />
);

UserDetail.fragment = gql`
    fragment UserDetail on User {
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

// ----- UserDetailInner (Pure Presentational Component) -----

const styles = (theme: Theme) =>
    createStyles({
        root: {
            marginTop: theme.spacing.unit * 2,
            display: 'flex',
            flexDirection: 'column'
        },
        avatar: {
            width: 230,
            height: 230,
            borderRadius: 6
        },
        title: {
            marginTop: theme.spacing.unit * 2,
            fontWeight: theme.typography.fontWeightMedium,
            lineHeight: 1
        },
        subtitle: {
            fontSize: 18,
            lineHeight: 1.2,
            marginBottom: theme.spacing.unit,
            color: theme.palette.text.secondary
        },
        stats: {
            marginTop: theme.spacing.unit,
            fontSize: 14,
            lineHeight: 1.3
        },
        icon: {
            marginRight: 3,
            verticalAlign: 'text-bottom'
        },
        stat: {
            marginRight: theme.spacing.unit * 2
        }
    });

interface UserDetailInnerProps extends WithStyles<typeof styles> {
    user: any;
}

const UserDetailInner = withStyles(styles)(
    ({ classes, user }: UserDetailInnerProps) => {
        return (
            <div className={classes.root}>
                <img
                    className={classes.avatar}
                    src={user.avatarUrl}
                    alt={user.name}
                />
                <Typography variant="h5" className={classes.title}>
                    {user.name}
                </Typography>

                {user.login && (
                    <Typography
                        variant="subtitle1"
                        className={classes.subtitle}
                    >
                        {user.login}
                    </Typography>
                )}

                {user.location && (
                    <div className={classes.stats}>
                        <React.Fragment>
                            <LocationIcon className={classes.icon} />
                            <span className={classes.stat}>
                                {user.location}
                            </span>
                        </React.Fragment>
                    </div>
                )}

                <div className={classes.stats}>
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
        );
    }
);
