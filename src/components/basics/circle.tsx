import * as React from 'react';

import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';

const styles = createStyles({
    root: {
        borderRadius: '50%',
        display: 'inline-block',
        height: '0.75em',
        marginRight: '0.25em',
        width: '0.75em'
    }
});

export interface CircleProps extends WithStyles<typeof styles> {
    color: string;
}

export const Circle = withStyles(styles)(({ classes, color }: CircleProps) => {
    return <span className={classes.root} style={{ backgroundColor: color }} />;
});
