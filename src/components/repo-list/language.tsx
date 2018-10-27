import * as React from 'react';

import gql from 'graphql-tag';
import { Circle } from '..';

interface LanguageProps {
    language: any;
    className?: string;
}

export const Language = ({ language, className }: LanguageProps) => (
    <span className={className}>
        <Circle color={language.color} />
        {language.name}
    </span>
);

Language.fragment = gql`
    fragment Language on Language {
        id
        name
        color
    }
`;
