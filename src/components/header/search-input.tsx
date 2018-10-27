import * as React from 'react';

import Input from '@material-ui/core/Input';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import SearchIcon from '@material-ui/icons/Search';
import { inject } from 'mobx-react';
import { RootStore } from '../../stores';

const styles = (theme: Theme) =>
    createStyles({
        root: {
            fontFamily: theme.typography.fontFamily,
            position: 'relative',
            marginLeft: theme.spacing.unit,
            borderRadius: theme.shape.borderRadius,
            backgroundColor: fade(theme.palette.common.white, 0.15),
            '&:hover': {
                backgroundColor: fade(theme.palette.common.white, 0.25)
            },
            '& $inputInput': {
                transition: theme.transitions.create('width'),
                width: 130,
                '&:focus': {
                    width: 170
                }
            }
        },
        search: {
            width: theme.spacing.unit * 7,
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        inputRoot: {
            color: 'inherit'
        },
        inputInput: {
            padding: `${theme.spacing.unit}px ${theme.spacing.unit}px ${
                theme.spacing.unit
            }px ${theme.spacing.unit * 7}px`
        }
    });

export interface SearchInputProps extends WithStyles<typeof styles> {
    rootStore?: RootStore;
}

const initialState = { searchKey: '' };
type State = Readonly<typeof initialState>;

export const SearchInput = withStyles(styles)(
    inject('rootStore')(
        class extends React.Component<SearchInputProps> {
            readonly state: State = initialState;

            public render() {
                const { classes } = this.props;

                return (
                    <div className={classes.root}>
                        <div className={classes.search}>
                            <SearchIcon />
                        </div>
                        <form onSubmit={this.handleSubmit}>
                            <Input
                                disableUnderline={true}
                                placeholder="Search user…"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput
                                }}
                                value={this.state.searchKey}
                                onChange={this.handleChange}
                            />
                        </form>
                    </div>
                );
            }

            handleChange = (event: any) => {
                this.setState({ searchKey: event.target.value });
            };

            handleSubmit = (event: any) => {
                event.stopPropagation();
                event.preventDefault();

                const { rootStore } = this.props;
                const { routerStore } = rootStore!;
                routerStore.goTo(
                    'searchResults',
                    {},
                    { q: this.state.searchKey }
                );
            };
        }
    )
);
