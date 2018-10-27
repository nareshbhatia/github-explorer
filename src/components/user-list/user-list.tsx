import * as React from 'react';

import { List, ListItem } from '..';
import { User } from './user';

export interface UserListProps {
    users: any[];
}

export const UserList = ({ users }: UserListProps) => {
    // Note: eliminate organizations returned by the query
    return (
        <List>
            {users.map((user: any) => {
                return (
                    user.login && (
                        <ListItem key={user.id}>
                            <User user={user} />
                        </ListItem>
                    )
                );
            })}
        </List>
    );
};
