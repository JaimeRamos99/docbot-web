import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
  Divider,
  CardActionArea,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogActions,
  Button,
  DialogContent,
} from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import moment from 'moment';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import ChartGoal from './ChartGoal';
import palette from '../../../../../../../theme/palette';

const useStyles = makeStyles(theme => ({
    root: {},
    imageContainer: {
        height: 90,
        width: 90,
        margin: '0 auto',
        border: `1px solid ${theme.palette.divider}`,
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
    },
    circular: {
        height: '100px'
    },
    
    media: {
        height: 0,
        paddingTop: '10px', // 16:9
    },
}));

const SingleGoal = props => {
    const { className, goal, ...rest } = props;

    const [state] = React.useState({
        goalss: [],
    });
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
  
    const handleClickOpen = () => {
        console.log(goal)
        const labels=[];
        const data=[];
        const color=[ palette.success.main, palette.error.main, palette.secondary.main,  palette.warning.main,  palette.valueH.main];
        var randomItem = color[Math.floor(Math.random()*color.length)]

        for(var x = 0; x < goal.progress.length; x++){
            var i = goal.progress[x]
            if(x === 0){
                
                labels.push(goal.creationDate)
                data.push(i.value)
            }else {    
                
                labels.push(i.date)
                data.push(i.value)
            }
        }

        const info = {
            labels: labels,
            datasets:[
                {
                    borderColor: randomItem,
                    data: data,
                    fill: false,
                }   
            ]
        }
        state.goalss = info
        setTimeout(function(){
            
            setOpen(true);
            
  
        }, 1000);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
  return (
    <div>
        <Card
        {...rest}
        className={clsx(classes.root, className)}
        > 
            <CardActionArea onClick={handleClickOpen}>
                <CardContent>
                    <div className={classes.imageContainer}>
                        <CircularProgressbar
                            strokeWidth={3}
                            className={classes.circular}
                            value={((goal.progress[goal.progress.length-1].value/goal.quantity)*100).toFixed(1)}
                            text={`${((goal.progress[goal.progress.length-1].value/goal.quantity)*100).toFixed(1)}%`}
                            circleRatio={0.75}
                            styles={buildStyles({
                                rotation: 1 / 2 + 1 / 8,
                                strokeLinecap: 'butt',
                                trailColor: '#eee',
                                pathColor: 'green',
                                textColor: 'grey'
                            })}
                        />
                    </div>
                    <Typography 
                        align="center"
                        gutterBottom
                        variant="h4"
                        className={classes.quote}
                    >
                        {goal.description}
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
                    Vence el: {goal.dueDate}
                    </Typography>
                </Grid>
                </Grid>
            </CardActions>
        </Card>
        <Dialog
            fullWidth={true}
            maxWidth='lg'
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
           
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                <ChartGoal infor={goal.description} data={state.goalss}/>
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button 
                onClick={handleClose}
                color="primary" 
                variant="contained"  
                autoFocus
            >
                Aceptar
            </Button>
            </DialogActions>
      </Dialog>
    </div>
  );
};

SingleGoal.propTypes = {
  className: PropTypes.string,
  product: PropTypes.object.isRequired,
  goal: PropTypes.any.isRequired
};

export default SingleGoal;