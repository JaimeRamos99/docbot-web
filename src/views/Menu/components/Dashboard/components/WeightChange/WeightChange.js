import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import AccessibilityNew from '@material-ui/icons/AccessibilityNew';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  content: {
    alignItems: 'center',
    display: 'flex'
  },
  title: {
    fontWeight: 700
  },
  avatar: {
    backgroundColor: theme.palette.success.main,
    height: 56,
    width: 56
  },
  icon: {
    height: 32,
    width: 32
  },
  difference: {
    marginTop: theme.spacing(2),
    display: 'flex',
    alignItems: 'center'
  },
  differenceIcon: {
    color: theme.palette.error.dark
  },
  differenceSucess: {
    color: theme.palette.success.dark
  },
  differenceValue: {
    color: theme.palette.success.dark,
    marginRight: theme.spacing(1)
  }
}));

const WeightChange = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent>
        <Grid
          container
          justify="space-between"
        >
          <Grid item>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
              variant="body2"
            >
              Cambio de peso
            </Typography>
            <Typography variant="h3">{localStorage.getItem("p_weight")}kg</Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <AccessibilityNew className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>
        <div className={classes.difference}>
          { parseInt(localStorage.getItem('p_weight'),10) > parseInt(localStorage.getItem('p_wold'),10) ?
            <ArrowUpwardIcon className={classes.differenceIcon} />
            :
            <ArrowDownwardIcon className={classes.differenceSucess} />
          }
          { parseInt(localStorage.getItem('p_weight'),10) > parseInt(localStorage.getItem('p_wold'),10) ?
            <Typography
              className={classes.caption}
              variant="caption"
            >
              Subió desde la última vez
            </Typography>
            :
            <Typography
              className={classes.caption}
              variant="caption"
            >
              Bajó desde la última vez
            </Typography>
          }
          
        </div>
      </CardContent>
    </Card>
  );
};

WeightChange.propTypes = {
  className: PropTypes.string
};

export default WeightChange;
