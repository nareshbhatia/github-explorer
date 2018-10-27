import * as React from 'react';

import Typography from '@material-ui/core/Typography';
import gql from 'graphql-tag';
import { RepoHeader } from './repo-header';
import { RepoStats } from './repo-stats';

interface RepoProps {
    repo: any;
}

export const Repo = ({ repo }: RepoProps) => (
    <div>
        <RepoHeader repo={repo} />
        <Typography>{repo.description}</Typography>
        <RepoStats repo={repo} />
    </div>
);

Repo.fragment = gql`
    fragment Repo on Repository {
        id
        description
        ...RepoHeader
        ...RepoStats
    }

    ${RepoHeader.fragment}
    ${RepoStats.fragment}
`;
