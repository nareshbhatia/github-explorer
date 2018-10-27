import * as React from 'react';

import Button from '@material-ui/core/Button';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

interface ToggleStarButtonProps {
    repo: any;
}

export const ToggleStarButton = ({ repo }: ToggleStarButtonProps) =>
    repo.viewerHasStarred ? (
        <BaseToggleButton
            title="UnStar"
            mutation={UNSTAR_MUTATION}
            repoId={repo.id}
        />
    ) : (
        <BaseToggleButton
            title="Star"
            mutation={STAR_MUTATION}
            repoId={repo.id}
        />
    );

interface BaseToggleButtonProps {
    title: string;
    mutation: any;
    repoId: string;
}

const BaseToggleButton = ({
    title,
    mutation,
    repoId
}: BaseToggleButtonProps) => (
    <Mutation mutation={mutation} variables={{ repoId }}>
        {(triggerMutation, { loading }) => (
            <Button
                onClick={triggerMutation as any}
                variant="outlined"
                disabled={loading}
            >
                {title}
            </Button>
        )}
    </Mutation>
);

// stargazers.totalCount is needed to make sure that the count is updated
// after a mutation (see the two mutation queries below)
ToggleStarButton.fragment = gql`
    fragment ToggleStarButton on Repository {
        id
        viewerHasStarred
        stargazers {
            totalCount
        }
    }
`;

const STAR_MUTATION = gql`
    mutation StarRepo($repoId: ID!) {
        addStar(input: { starrableId: $repoId }) {
            starrable {
                ...ToggleStarButton
            }
        }
    }
    ${ToggleStarButton.fragment}
`;

const UNSTAR_MUTATION = gql`
    mutation UnstarRepo($repoId: ID!) {
        removeStar(input: { starrableId: $repoId }) {
            starrable {
                ...ToggleStarButton
            }
        }
    }
    ${ToggleStarButton.fragment}
`;
