import * as React from 'react';
import * as PropTypes from 'prop-types';

import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

export interface IProps extends WithStyles<typeof styles> {}

class Home extends React.Component {
  public render () {
    return (
      <div>
        <Typography variant="h4" gutterBottom>Despre Revista</Typography>

        <Typography variant="body1" gutterBottom>
          JPPC a fost fondat in anul 2001 in cadrul unui proiect finantat de Banca Mondiala cu privire la
          dezvoltarea serviciilor in comunitate. JPPC ofera un mediu stiintific de inalt nivel, pentru dezbaterea
          problemelor sociale contemporane si publicarea articolelor stiintifice originale privind gandirea si
          cercetarea sociala. Avand patru aparitii pe an, jurnalul se adreseaza cercetatorilor, profesorilor si
          studentilor in stiinte sociale, practicienilor, decidentilor si publicului larg din intreaga lume.
        </Typography>

        <Typography variant="h4" gutterBottom>
          Domeniile de interes
        </Typography>

        <Typography variant="body1" gutterBottom>
          Cercetare sociala fundamentala si aplicata, de dezvoltare si inovare, bazate pe utilizarea unor
          metodologii cantitative, calitative sau hibrid.
          Prezentarea de activitati profesionale specifice pentru beneficiari locali si internationali, organizatii
          neguvernamentale, companii private, structuri ale administratiei publice centrale si locale;
          Reliefarea expertizei si expertilor competenti in producerea de cunoastere sociala;
          Expunerea de actiuni si proiecte interne al caror scop este cresterea capacitatilor de interventie
          dezvoltarea profesionala, generarea de know-how si producerea unor materiale suport pentru cresterea
          eficientei activitatilor si maximizarea impactului.
        </Typography>

        <Typography variant="h4" gutterBottom>
          Acces
        </Typography>

        <Typography variant="body1" gutterBottom>
          Jurnalul Practicilor Pozitive Comunitare este revistă ştiinţifică cu open access.
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

(Home as React.ComponentClass<IProps>).propTypes = {
  classes: PropTypes.object.isRequired,
} as any;

export default withStyles(styles)(Home);
