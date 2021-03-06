import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { FormParaclinicos, 
    Hemoglobina, 
    Trigliceridos, 
    Glicemia, 
    Colesterol,
    Charts
 } from './components';



const Paraclinicos = props => {
    const { user, p1, p2,  p4, p5, c1, c2, c3, c4 } = props;


    return(
        <div>
            <Grid
                container
                spacing={3}
            >
                <Grid
                    item
                    xs={12}
                >
                    <FormParaclinicos user={user}/>
                </Grid>
                <Grid
                    item
                    lg={3}
                    sm={6}
                    xl={3}
                    xs={12}
                >
                    <Hemoglobina hg={p4}/>
                </Grid>
                <Grid
                    item
                    lg={3}
                    sm={6}
                    xl={3}
                    xs={12}
                >
                    <Trigliceridos tri={p1}/>
                </Grid>
                <Grid
                    item
                    lg={3}
                    sm={6}
                    xl={3}
                    xs={12}
                >
                    <Glicemia gl={p2}/>
                </Grid>
                <Grid
                    item
                    lg={3}
                    sm={6}
                    xl={3}
                    xs={12}
                >
                    <Colesterol clt={p5}/>
                </Grid>
                <Grid
                    item
                    lg={12}
                    sm={12}
                    xl={12}
                    xs={12}
                >
                    <Charts dataC={c1} dataHG={c2} dataT={c3} dataG={c4}/>
                </Grid>
            </Grid>
        </div>
    );
}
Paraclinicos.propTypes = {
    user: PropTypes.isRequired
    
};

export default Paraclinicos;

