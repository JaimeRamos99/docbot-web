import React, { useState, useEffect } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import {
  Button,
  TextField,
  Link,
  Typography,
} from '@material-ui/core';
import { connect } from 'react-redux';
import getDoctor from '../../../../redux/actions/getDoctor';
import { getCode } from '../../../../services/api';


const schema = {
  email: {
    presence: { allowEmpty: false, message: 'es obligatorio' },
    email: true,
    length: {
      maximum: 64
    }
  },
};

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100%'
  },
  grid: {
    height: '100%'
  },
  quoteContainer: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  quote: {
    backgroundColor: theme.palette.neutral,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: 'url(./bgImage/logo.png)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },
  quoteInner: {
    textAlign: 'center',
    flexBasis: '600px'
  },
  quoteText: {
    color: '#3F51B5',
    fontWeight: 300
  },
  
  contentContainer: {},
  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  contentHeader: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(5),
    paddingBototm: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  logoImage: {
    marginLeft: theme.spacing(4)
  },
  contentBody: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center'
    }
  },
  form: {
    paddingLeft: 100,
    paddingRight: 100,
    paddingBottom: 125,
    flexBasis: 700,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  },
  title: {
    marginTop: theme.spacing(3),
    color: '#1438A6',
  },
  socialButtons: {
    marginTop: theme.spacing(3)
  },
  socialIcon: {
    marginRight: theme.spacing(1)
  },
  sugestion: {
    marginTop: theme.spacing(2),
    color: '#D92588',
  },
  textField: {
    marginTop: theme.spacing(2),
    color: '#D92588',
  },
  signInButton: {
    margin: theme.spacing(2, 0),
  }
}));

const EmailForm = props => {
  const { history} = props;

  const classes = useStyles();

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);


  /***************Esta funcioón toma los valores en los textfields****************/
  const handleChange = event => {
    event.persist();

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };
  
  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;





  const handleCode = event =>{
    event.preventDefault();

    getCode(formState.values.email)
    .then(response => {
      return response.json();
    })
    .then(json => {
      localStorage.setItem("token", json.token)
      history.push('./cambiar-contraseña')
      
    })
    .catch(error => {
      console.log(error.message);
    });
  }

  return (
    <div>
        <form
            className={classes.form}
            onSubmit={handleCode}
        >
            <Typography
                className={classes.title}
                variant="h2"
            >
                Cambiar Contraseña
            </Typography>
            
            <TextField
                className={classes.textField}
                error={hasError('email')}
                fullWidth
                
                label="Email"
                name="email"
                onChange={handleChange}
                type="text"
                value={formState.values.email || ''}
                variant="outlined"
            />
            <Button
                className={classes.signInButton}
                color="primary"
                disabled={!formState.isValid}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
            >
                Obtener código de verificación
            </Button>
            <Typography
                color="#D92588"
                variant="body1"
            >
                ¿Nuevo en DocBot?{' '}
                <Link
                    component={RouterLink}
                    to="/sign-up"
                    variant="h6"
                >
                    Registrarme
                </Link>
            </Typography>
            <Typography
                color="#D92588"
                variant="body1"
            >
                ¿Ya tienes una cuenta?{' '}
                <Link
                    component={RouterLink}
                    to="/sign-in"
                    variant="h6"
                >
                    Inicia sesión
                </Link>
            </Typography>
        </form>
    </div>
  );
};

EmailForm.propTypes = {
  history: PropTypes.object
};

/**
 * Regresa funciones que son acciones
 * @param {*} dispatch 
 */
const mapDispatchToProps = (dispatch) =>{
  return{
    getDoctor : (doctor) => dispatch(getDoctor(doctor)),
  }
}

const mapStateToProps = (state) =>{
  return{
    doctor: state.doctor,
  };
}

const wrapper = connect(mapStateToProps, mapDispatchToProps);
const component = wrapper(EmailForm)

export default withRouter(component);
