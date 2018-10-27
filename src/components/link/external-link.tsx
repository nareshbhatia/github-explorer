import * as React from 'react';

import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

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

export interface ExternalLinkProps extends WithStyles<typeof styles> {
    className?: string;
    children?: any;
}

export const ExternalLink = withStyles(styles)(
    ({
        classes,
        children,
        ...others
    }: ExternalLinkProps & React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
        return (
            <a className={classes.root} {...others}>
                {children}
            </a>
        );
    }
);
