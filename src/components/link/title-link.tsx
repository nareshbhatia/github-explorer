import * as React from 'react';

import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import * as classNames from 'classnames';

const styles = createStyles({
    root: {
        margin: 0,
        fontSize: 20,
        fontWeight: 500,
        lineHeight: 1.5
    }
});

export interface TitleLinkProps extends WithStyles<typeof styles> {
    className?: string;
    children?: any;
}

export const TitleLink = withStyles(styles)(
    ({
        classes,
        className: classNameProp,
        children
    }: TitleLinkProps & React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
        const className = classNames(classes.root, classNameProp);
        return <h3 className={className}>{children}</h3>;
    }
);
