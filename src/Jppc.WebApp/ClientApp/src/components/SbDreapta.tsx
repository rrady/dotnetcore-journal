import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import * as PropTypes from 'prop-types';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';

export interface IProps extends WithStyles<typeof styles> {

}

class Home extends React.Component {
  public render () {
    return (
      <div>
        <Typography variant="h6" gutterBottom>Numar Curent</Typography>
        <Typography>JCPP Nr. 1 2018</Typography>
        <img src="http://jppc.ro/reviste/JCPP%20Nr.%201%202018/coperta.jpg" width="160/"></img><br /><br />
        <Typography variant="h6" gutterBottom>Cele mai citite</Typography>
        <Typography>1. asd</Typography>
        <Typography>2. asd</Typography>
        <Typography>3. asd</Typography>
        <Typography>4. asd</Typography>
        <Typography>5. asd</Typography>

        <Typography variant="h6" gutterBottom>Resurse</Typography>
        <Typography><a href="http://www.rtsa.ro">Transilvanian Review of Administrative Sciences</a></Typography>
        <Typography><a href="http://www.arsociologie.ro/sociologieromaneasca">Revista de Sociologie Romaneasca</a></Typography>
        <Typography><a href="http://www.rcis.ro/">Revista de Cercetare si Interventie sociala</a></Typography>
        <Typography><a href="http://www.inovatiasociala.ro">Revista Inovatia Sociala</a></Typography>
        <Typography><a href="http://www.revistacalitateavietii.ro">Revista Calitatea Vietii</a></Typography>
        <Typography><a href="http://www.ipe.ro/rjef.htm">Romanian Journal of Economic Forecasting </a></Typography>
      </div>
    );
  }
}

const styles = (theme: Theme) => createStyles({
  root: {
    width: '100%',
    maxWidth: 500,
  },
});

(Home as React.ComponentClass<IProps>).propTypes = {
  classes: PropTypes.object.isRequired,
} as any;

export default withStyles(styles)(Home);
