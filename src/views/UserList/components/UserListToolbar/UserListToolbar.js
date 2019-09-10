import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';
import { SearchInput } from '../../../../components';



const useStyles = makeStyles(theme => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
  spacer: {
    flexGrow: 1
  },
  addButton: {
    backgroundColor: '#1438A6',
    color: '#F2F2F2',
  },
  searchInput: {
    marginRight: theme.spacing(1)
  }
}));

const UserListToolbar = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.row}>
        <span className={classes.spacer} />
        <RouterLink to="/account">
          <Button
            className={classes.addButton}
            variant="contained"
          >
            Crear Usuario
          </Button>
        </RouterLink>
      </div>
      <div className={classes.row}>
        <SearchInput
          className={classes.searchInput}
          placeholder="Search product"
        />
      </div>
    </div>
  );
};

UserListToolbar.propTypes = {
  className: PropTypes.string
};

export default UserListToolbar;