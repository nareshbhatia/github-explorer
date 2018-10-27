import * as React from 'react';

import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';

const styles = createStyles({
    root: {
        listStyle: 'none',
        margin: 0,
        padding: 0
    }
});

export interface ListProps extends WithStyles<typeof styles> {
    children: any;
}

export const List = withStyles(styles)(({ classes, children }: ListProps) => {
    return <ul className={classes.root}>{children}</ul>;
});
