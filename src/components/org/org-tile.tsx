import * as React from 'react';

import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import gql from 'graphql-tag';
import { ExternalLink } from '..';

interface OrgTileProps {
    org: any;
    className?: string;
}

export const OrgTile = ({ org, ...others }: OrgTileProps) => (
    <OrgTileInner org={org} {...others} />
);

OrgTile.fragment = gql`
    fragment OrgTile on Organization {
        id
        name
        avatarUrl
        url
    }
`;

// ----- OrgTileInner (Pure Presentational Component) -----

const styles = (theme: Theme) =>
    createStyles({
        avatar: {
            width: 35,
            height: 35,
            borderRadius: 3,
            verticalAlign: 'middle'
        }
    });

interface OrgTileInnerProps extends WithStyles<typeof styles> {
    org: any;
    className?: string;
}

const OrgTileInner = withStyles(styles)(
    ({ classes, org, ...others }: OrgTileInnerProps) => {
        return (
            <ExternalLink href={org.url} {...others}>
                <img
                    className={classes.avatar}
                    src={org.avatarUrl}
                    alt={org.name}
                    title={org.name}
                />
            </ExternalLink>
        );
    }
);
