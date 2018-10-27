import * as React from 'react';

import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import gql from 'graphql-tag';
import { HorizontalContainer, RepoForkedIcon, StarIcon } from '..';
import { Language } from './language';
import { ToggleStarButton } from './toggle-star-button';

export interface RepoStatsProps {
    repo: any;
}

export const RepoStats = ({ repo }: RepoStatsProps) => (
    <RepoStatsInner repo={repo} />
);

RepoStats.fragment = gql`
    fragment RepoStats on Repository {
        id
        forkCount
        stargazers {
            totalCount
        }
        primaryLanguage {
            ...Language
        }
        ...ToggleStarButton
    }

    ${Language.fragment}
    ${ToggleStarButton.fragment}
`;

// ----- RepoStatsInner (Pure Presentational Component) -----

const styles = (theme: Theme) =>
    createStyles({
        root: {
            marginTop: theme.spacing.unit * 2,
            alignItems: 'center'
        },
        icon: {
            marginRight: 3
        },
        stat: {
            marginRight: theme.spacing.unit * 3
        },
        statStars: {
            marginRight: theme.spacing.unit * 2
        }
    });

interface RepoStatsInnerProps extends WithStyles<typeof styles> {
    repo: any;
}

const RepoStatsInner = withStyles(styles)(
    ({ classes, repo }: RepoStatsInnerProps) => {
        return (
            <HorizontalContainer className={classes.root}>
                {repo.primaryLanguage && (
                    <Language
                        className={classes.stat}
                        language={repo.primaryLanguage}
                    />
                )}

                <RepoForkedIcon className={classes.icon} />
                <span className={classes.stat}>{repo.forkCount}</span>

                <StarIcon className={classes.icon} />
                <span className={classes.statStars}>
                    {repo.stargazers.totalCount}
                </span>
                <ToggleStarButton repo={repo} />
            </HorizontalContainer>
        );
    }
);
