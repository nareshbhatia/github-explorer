import * as React from 'react';

import {
    createStyles,
    Theme,
    withStyles,
    WithStyles
} from '@material-ui/core/styles';

const styles = (theme: Theme) =>
    createStyles({
        root: {
            paddingTop: theme.spacing.unit * 2,
            paddingBottom: theme.spacing.unit * 2,
            borderBottom: `1px solid ${theme.palette.divider}`
        }
    });

export interface ListItemProps extends WithStyles<typeof styles> {
    children: any;
}

export const ListItem = withStyles(styles)(
    ({ classes, children }: ListItemProps) => {
        return <li className={classes.root}>{children}</li>;
    }
);
