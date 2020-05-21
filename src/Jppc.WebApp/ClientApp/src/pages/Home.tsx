import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import * as PropTypes from 'prop-types';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

export interface Props extends WithStyles<typeof styles> {

}

class Home extends React.Component {
  public render () {
    return (
      <div>
        <Typography variant="h5" gutterBottom>Despre Revista</Typography>

        <Typography variant="body1" gutterBottom>
        JPPC a fost fondat in anul 2001 in cadrul unui proiect finantat de Banca Mondiala cu privire la
        dezvoltarea serviciilor in comunitate. JPPC ofera un mediu stiintific de inalt nivel, pentru dezbaterea
        problemelor sociale contemporane si publicarea articolelor stiintifice originale privind gandirea si
        cercetarea sociala. Avand patru aparitii pe an, jurnalul se adreseaza cercetatorilor, profesorilor si
        studentilor in stiinte sociale, practicienilor, decidentilor si publicului larg din intreaga lume.
        </Typography>

        <Typography variant="h5" gutterBottom>Domeniile de interes</Typography>
        <Typography variant="body1" gutterBottom>
        Cercetare sociala fundamentala si aplicata, de dezvoltare si inovare, bazate pe utilizarea unor
        metodologii cantitative, calitative sau hibrid.<br />
        Prezentarea de activitati profesionale specifice pentru beneficiari locali si internationali, organizatii
        neguvernamentale, companii private, structuri ale administratiei publice centrale si locale;<br />
        Reliefarea expertizei si expertilor competenti in producerea de cunoastere sociala;<br />
        Expunerea de actiuni si proiecte interne al caror scop este cresterea capacitatilor de interventie
        dezvoltarea profesionala, generarea de know-how si producerea unor materiale suport pentru cresterea
        eficientei activitatilor si maximizarea impactului.
        </Typography>

        <Typography variant="h5" gutterBottom>Acces</Typography>
        <Typography variant="body1" gutterBottom>
        Jurnalul Practicilor Pozitive Comunitare este revistă ştiinţifică cu open access.
        </Typography>
        <Typography variant="body1" gutterBottom>JPPC publica articole in limba engleza, care respecta conventiile editoriale internationale.
        </Typography>

        <Typography variant="h5" gutterBottom>Prin articolele publicate:
        </Typography>
        <Typography variant="body1" gutterBottom>
        Crestem capacitatea de cunoastere si de intelegere a individului si a vietii sociale;<br />
        Integram experientele de cercetare si rezultatele acestora in programe, proiecte sau activitati relevante si semnificative,
        cu finalitate si de impact;<br />
        Facilitam circulatia ideilor si procesul de producere a acestora, de valorizare si de valorificare a cunoasterii.<br />
        </Typography>
        <Typography variant="h5" gutterBottom>Jurnal indexat in:</Typography>
        <Grid container>
          <Grid item xs>
          <a href="http://www.doaj.org/doaj?func=openurl&amp;genre=journal&amp;issn=15828344">
            <img src="http://jppc.ro/img/doaj.png"></img>
          </a>
          </Grid>
          <Grid item xs>
          <Typography variant="body1" gutterBottom>EBSCO</Typography>
          </Grid>
          <Grid item xs>
          <Typography variant="body1" gutterBottom>PROQUEST</Typography>
          </Grid>
          <Grid item xs>
          <Typography variant="body1" gutterBottom>CEEOL</Typography>
          </Grid>
          <Grid item xs>
          <Typography variant="body1" gutterBottom>REPEC</Typography>
          </Grid>
          <Grid item xs>
          <Typography variant="body1" gutterBottom>SCIPIO</Typography>
          </Grid>
          <Grid item xs>
          <Typography variant="body1" gutterBottom>QUESTIA</Typography>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const styles = (theme: Theme) => createStyles({
  root: {
    width: '100%',
    maxWidth: 500,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'left',
    color: theme.palette.text.secondary,
    marginBottom: 20,
  },
});

(Home as React.ComponentClass<Props>).propTypes = {
  classes: PropTypes.object.isRequired,
} as any;

export default withStyles(styles)(Home);
