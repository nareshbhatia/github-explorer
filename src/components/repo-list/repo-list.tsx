import * as React from 'react';

import { List, ListItem } from '..';
import { Repo } from './repo';

export interface RepoListProps {
    repos: any[];
}

export const RepoList = ({ repos }: RepoListProps) => {
    return (
        <List>
            {repos.map((repo: any) => (
                <ListItem key={repo.id}>
                    <Repo repo={repo} />
                </ListItem>
            ))}
        </List>
    );
};
