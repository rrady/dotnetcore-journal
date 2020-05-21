import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import * as PropTypes from 'prop-types';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';

export interface Props extends WithStyles<typeof styles> {

}

class Contact extends React.Component {
  public render () {
    return (
      <div>
        <Typography variant="h5" gutterBottom>Colegiul de redactie:</Typography>

        <Typography variant="body1" gutterBottom>
        Cristina TOMESCU<br />
        Radu MIRCEA <br />
        Andreia-Nicoleta ANTON<br />
        Daniela DANDARA<br />

        Email: office@jppc.ro
        </Typography>

        <Typography variant="h5" gutterBottom>Redactie:</Typography>
        <Typography variant="body1" gutterBottom>
        Paula NEACSU - redactor<br />
        Luminita LOGIN - machetare si tehnoredactare<br />
        Nicolae LOGIN - coperta
        </Typography>

        <Typography variant="h5" gutterBottom>Adresa:</Typography>
        <Typography variant="body1" gutterBottom>
        Strada Simetriei nr. 18A, Sector 2, Bucuresti<br />
        Telefon: 0040 21 2401410<br />
        Fax: 0040 31 4381006<br />
        Email: office@jppc.ro
        </Typography>
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

(Contact as React.ComponentClass<Props>).propTypes = {
  classes: PropTypes.object.isRequired,
} as any;

export default withStyles(styles)(Contact);
