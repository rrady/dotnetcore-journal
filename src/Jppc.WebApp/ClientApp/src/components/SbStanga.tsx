import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import * as PropTypes from 'prop-types';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';

export interface IProps extends WithStyles<typeof styles> {}

class Home extends React.Component {
  public render () {
    return (
      <div>
        <img src="http://jppc.ro/img/logo_jppc_ro.png"></img><br /><br />
            <Typography variant="h6" gutterBottom><b>Director</b></Typography>
            <Typography><i>Dr. </i><b>Sorin CACE</b></Typography>
            <Typography variant="h6" gutterBottom><b>Consiliul Stiintific</b></Typography>
            <Typography><i>Prof. univ. dr. </i><b>Catalin ZAMFIR</b>, Membru Corespondent al Academiei Romane</Typography>
            <Typography><i>Prof. univ. dr. </i><b>Asher BEN-ARIEH</b>, Director Institutul Haruv, Ierusalim, Israel</Typography>
            <Typography><i>Prof. univ. dr. </i><b>Gary B. MELTON</b>, Universitatea Colorado, Denver, SUA</Typography>
            <Typography><i>Prof. univ. dr. </i><b>John LUTZKER</b>, Universitatea Georgia State, Atlanta, SUA</Typography>
            <Typography><i>Prof. univ. dr. </i><b>Michael J. PALMIOTTO</b>, Universitatea Wichita State, Kansas, SUA</Typography>
            <Typography><i>Prof. univ. dr. </i><b>Jill KORBIN</b>, Universitatea Case Western Reserve, Cleveland, SUA</Typography>
            <Typography><i>Prof. univ. </i><b>Keith HALEY</b>, Universitatea Tiffin, Ohio, SUA</Typography>
            <Typography><i>Prof. univ. dr. </i><b>Jimmy TAYLOR</b>, Universitatea Ohio, Zanesville, Ohio, SUA</Typography>
            <Typography><i>Prof. univ. dr. </i><b>Andrea WIGFIELD</b>, Universitatea din Leeds, Leeds, Marea Britanie</Typography>
            <Typography><i>Prof. univ. dr. </i><b>Elizabeth  ECKERMANN</b>, Deakin University, Victoria, Australia</Typography>
            <Typography><i>Prof. univ. dr. </i><b>Renwu TANG</b>,
            Decan al Facultăţii de Management şi al Academiei Guvernului din Bejing Normal University, Beijing, China</Typography>
            <Typography><i>Prof. univ. dr. </i><b>Amitabh KUNDU</b>, Universitatea Jawaharlal Nehru, New Delhi , India</Typography>
            <Typography><i>Prof. univ. dr. </i><b>Claude MARTIN</b>, Director Cercetare CNRS, Universitatea din Rennes, Franta</Typography>
            <Typography><i>Prof. univ. dr. </i><b>Munyae M. MULINGE</b>, Universitatea United States International (USIU), Nairobi, Kenya</Typography>
            <Typography><i>Prof. univ. dr. </i><b>Manuel Antonio GARRETON</b>, Universitatea din Chile, Santiago de Chile, Chile</Typography>
            <Typography><i>Dr. </i><b>Renata FRANC</b>, Institutul de Stiinte Sociale "Ivo Pilar", Zagreb, Croatia</Typography>
            <Typography><i>Prof. univ. dr. </i><b>Asun LLENA BERNE</b>, Universitatea din Barcelona, Barcelona, Spania</Typography>
            <Typography><i>Prof. univ. dr. </i><b>Nawab Ali KHAN</b>, Universitatea Saman bin Abduaziz, Al Kharj, Regatul Arabiei Saudite</Typography>
            <Typography><i>Conf. univ. dr. </i><b>Mihaela TOMIŢĂ</b>, Universitatea de Vest, Timisoara</Typography>
            <Typography><i>Prof. univ. dr. </i><b>Valeriu IOAN-FRANC</b>,
            Director Adjunct al Institutului National de Cercetari Economice</Typography>
            <Typography><i>Prof. univ. dr. </i><b>Corina CACE</b>, Academia de Studii Economice</Typography>
            <Typography><i>Conf. univ. dr. </i><b>Mircea ALEXIU</b>, Universitatea de Vest Timisoara</Typography>
            <Typography><i>Prof. univ. dr. </i><b>Stefan COJOCARU</b>, Universitatea "Alexandru Ioan Cuza" Iasi</Typography>
            <Typography variant="h6" gutterBottom><b>ISSN</b></Typography>
            <Typography>Print: 1582-8344</Typography>
            <Typography>Electronic: 2247-6571</Typography>
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
