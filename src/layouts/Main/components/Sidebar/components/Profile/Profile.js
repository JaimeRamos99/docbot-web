import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Avatar, Typography } from '@material-ui/core';
import logo from '../../../../../../assets/logos/logo.png';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content'
  },
  avatar: {
    width: 80,
    height: 80
  },
  name: {
    marginTop: theme.spacing(1)
  }
}));

const Profile = props => {
  const { doctor, className,  ...rest } = props;

  const classes = useStyles();


  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Avatar
        alt="Person"
        className={classes.avatar}
        component={RouterLink}
        src={logo}
        to="/pacientes"
      />
      <Typography
        className={classes.name}
        variant="h4"
      >

        {localStorage.getItem('name')+" "+localStorage.getItem('lastName')} 
      </Typography>
      <Typography variant="body2">
        {localStorage.getItem("medicalCenter")}
      </Typography>
      
    </div>
  );
};

Profile.propTypes = {
  className: PropTypes.string,
};

export default Profile;
