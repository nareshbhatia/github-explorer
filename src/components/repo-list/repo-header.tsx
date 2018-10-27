import * as React from 'react';

import gql from 'graphql-tag';
import { ExternalLink, HorizontalContainer, TitleLink } from '..';

interface RepoHeaderProps {
    repo: any;
}

export const RepoHeader = ({ repo }: RepoHeaderProps) => (
    <HorizontalContainer>
        <TitleLink>
            <ExternalLink href={repo.url}>{repo.name}</ExternalLink>
        </TitleLink>
    </HorizontalContainer>
);

RepoHeader.fragment = gql`
    fragment RepoHeader on Repository {
        id
        url
        name
    }
`;
