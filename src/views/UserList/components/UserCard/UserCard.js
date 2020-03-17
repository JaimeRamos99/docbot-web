import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, CardActions, Typography, Grid, Divider, CardActionArea, Popper, Button, Fade, Paper } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import logo from '../../../../assets/logos/logo.png';
import { getMedicalInfos, detelePatient } from '../../../../services/api';
const useStyles = makeStyles(theme => ({
  root: {},
  typography: {
    padding: theme.spacing(2),
  },
  imageContainer: {
    height: 64,
    width: 64,
    margin: '0 auto',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '5px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: '100%'
  },
  statsItem: {
    display: 'flex',
    alignItems: 'center'
  },
  statsIcon: {
    color: theme.palette.icon,
    marginRight: theme.spacing(1)
  },
  quote: {
    color: '#1438A6'
  }
}));

const UserCard = props => {
  const { className, history, user, ...rest } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState();


  const handleClick = newPlacement => event => {
    setAnchorEl(event.currentTarget);
    setOpen(prev => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };
  const eliminarPaciente = newPlacement => async (event, idx) => {
    let id = idx
    await detelePatient(id)
    setAnchorEl(event.currentTarget);
    setOpen(prev => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
    localStorage.removeItem('p_id');
    localStorage.removeItem('p_Name');
    localStorage.removeItem('p_lName');
    localStorage.removeItem('p_medicalCenter');
    localStorage.removeItem('p_dateAssociation');
    localStorage.removeItem('p_birthdate');
    localStorage.removeItem('p_documentType');
    localStorage.removeItem('p_documentNumber');
    localStorage.removeItem('p_weight');
    localStorage.removeItem('p_height');
    localStorage.removeItem('p_clinicalContext');
    localStorage.removeItem('p_sex');
    localStorage.removeItem('p_vtf');
    localStorage.removeItem('p_clinicalC');
    localStorage.removeItem('p_mecialC');
    localStorage.removeItem('p_isDiabetic');
    localStorage.removeItem('p_smoking');
    localStorage.removeItem('p_wold');
  }
  const classes = useStyles();

  /**
   * Esto debe ser cambiado!!
   * @param {*} userr 
   */
  const handleUser = userr => {
    localStorage.removeItem('p_id');
    localStorage.removeItem('p_Name');
    localStorage.removeItem('p_lName');
    localStorage.removeItem('p_medicalCenter');
    localStorage.removeItem('p_dateAssociation');
    localStorage.removeItem('p_birthdate');
    localStorage.removeItem('p_documentType');
    localStorage.removeItem('p_documentNumber');
    localStorage.removeItem('p_weight');
    localStorage.removeItem('p_height');
    localStorage.removeItem('p_clinicalContext');
    localStorage.removeItem('p_sex');
    localStorage.removeItem('p_vtf');
    localStorage.removeItem('p_clinicalC');
    localStorage.removeItem('p_mecialC');
    localStorage.removeItem('p_isDiabetic');
    localStorage.removeItem('p_smoking');
    localStorage.removeItem('p_wold');
    localStorage.setItem('p_id', userr._id);
    localStorage.setItem('p_Name', userr.name);
    localStorage.setItem('p_lName', userr.lastName);
    localStorage.setItem('p_age', userr.age);
    localStorage.setItem('p_email', userr.email);
    localStorage.setItem('p_dateAssociation', userr.dateAssociation);
    localStorage.setItem('p_birthdate', userr.birthdate);
    localStorage.setItem('p_documentType', userr.documentType);
    localStorage.setItem('p_documentNumber', userr.documentNumber);
    localStorage.setItem('p_sex', userr.sex);
    localStorage.setItem('p_smoking', userr.smoking);

    setTimeout(function () {
      console.log(userr._id)
      getMedicalInfos(userr._id)
        .then(response => {
          return response.json();
        })
        .then(json => {
          console.log(json)
          var l = json.weight.length
          var w = json.weight[l - 1]
          var oldv = 0

          if (l > 1) {
            var old = json.weight[l - 2];
            oldv = old.value
          }
          if (l <= 1) {
            oldv = 0

          }
          localStorage.setItem('p_vtf', json.testFindRisk);
          localStorage.setItem('p_clinicalC', json.clinicalContext);
          localStorage.setItem('p_mecialC', json.medicalCenter);
          localStorage.setItem('p_isDiabetic', json.isDiabetic);
          localStorage.setItem('p_abdperm', json.abdominalperimeter[json.abdominalperimeter.length - 1].value)
          localStorage.setItem('p_wold', oldv);
          localStorage.setItem('p_height', json.height);
          localStorage.setItem('p_weight', w.value);
          history.push('/menu')
        })
        .catch(error => {
          console.log(error.message);
        });

    }, 500);

  }

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardActionArea onClick={() => handleUser(user)}>
        <CardContent>
          <div className={classes.imageContainer}>
            <img
              alt="Product"
              className={classes.image}
              src={logo}
            />
          </div>
          <Typography
            align="center"
            gutterBottom
            variant="h4"
            className={classes.quote}
          >
            {user.name} {user.lastName}
          </Typography>
          <Typography
            align="center"
            variant="body1"
          >
            Correo electronico: {user.email}
          </Typography>

        </CardContent>
      </CardActionArea>
      <Divider />
      <CardActions>
        <Grid
          container
          justify="space-between"
        >
          <Grid
            className={classes.statsItem}
            item
          >
            <AccessTimeIcon className={classes.statsIcon} />
            <Typography
              display="inline"
              variant="body2"
            >
              Ingresado el: {user.dateAssociation}
            </Typography>

          </Grid>
          <Grid>
            <IconButton style={{ WebkitBoxShadow: '3px 3px 16px 3px rgba(236,235,232,1)', MozBoxShadow: '3px 3px 16px 3px rgba(236,235,232,1)', boxShadow: ' 3px 3px 16px 3px rgba(236,235,232,1)' }} onClick={handleClick('bottom')}>
              <DeleteIcon style={{ color: 'red' }} />
            </IconButton >
          </Grid>

        </Grid>
        <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Paper>
                <Typography className={classes.typography}>¿Está seguro que desea eliminar a este paciente?</Typography>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 10 }}>
                  <div style={{ marginLeft: 10 }}>
                    <Button variant="contained" color="primary" onClick={eliminarPaciente('bottom', user._id)}>Confirmar</Button>
                  </div>
                  <div style={{ marginRight: 10 }}>
                    <Button variant="contained" color="primary" onClick={handleClick('bottom')}>Cancelar</Button>
                  </div>

                </div>
              </Paper>
            </Fade>
          )}
        </Popper>
      </CardActions>
    </Card>
  );
};

UserCard.propTypes = {
  className: PropTypes.string,
  product: PropTypes.object.isRequired,
  user: PropTypes.any.isRequired
};
export default withRouter(UserCard);