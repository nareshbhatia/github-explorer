import * as React from 'react';

import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { RouterLink, RouterLinkProps } from 'mobx-state-router';

const styles = (theme: Theme) =>
    createStyles({
        root: {
            color: theme.palette.primary.dark,
            textDecoration: 'none',
            '&:hover': {
                textDecoration: 'underline'
            }
        }
    });

export interface InternalLinkProps extends WithStyles<typeof styles> {}

export const InternalLink = withStyles(styles)(
    ({ classes, children, ...others }: InternalLinkProps & RouterLinkProps) => {
        return (
            <RouterLink className={classes.root} {...others}>
                {children}
            </RouterLink>
        );
    }
);
