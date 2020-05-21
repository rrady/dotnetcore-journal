import * as React from 'react';
import * as PropTypes from 'prop-types';

import { WithStyles, Theme, createStyles, withStyles, } from '@material-ui/core';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import { grey } from '@material-ui/core/colors';

export interface Props extends WithStyles<typeof styles> {}

class Current extends React.Component<Props> {
  public render () {
    const { classes } = this.props;
    return (
      <div>
        <Typography variant="h5" gutterBottom>JCPP Nr. 1 2018</Typography>
        <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMore />}>
          <Typography className={classes.heading}>ANALYSIS OF THE IMPACT AND
           EFFECTIVENESS OF SUPPORT MEASURES AND INTERVENTIONS ON PEOPLE WITH DISABILITIES
           <Typography variant="caption">Alin CROITORU, Flavius MIHALACHE</Typography>
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails style={{flexDirection: 'column'}}>
        <Typography variant="h5" gutterBottom>Abstract</Typography>
        <Typography variant="body1" gutterBottom>
        The article analyses the employment structure in Romania’s
        rural areas during the post-transition period, focusing
        on entrepreneurship and public policies designed to suppo
        rt economic development within rural settings. These two m
        </Typography>
        <Typography variant="h5" gutterBottom>Cuvinte cheie</Typography>
        <Typography variant="body1" gutterBottom>
        asd
        </Typography>
        <Typography variant="h5" gutterBottom>Autori</Typography>
        <Typography variant="body1" gutterBottom>
        asd
        </Typography>
        <Typography variant="h5" gutterBottom>Cum citez</Typography>
        <Typography variant="body1" gutterBottom>
        asd
        </Typography>
        <Button
                variant="contained"
                color="secondary"
                style={{color: grey[50], textDecoration:'none'}}>
                Descarca articol
        </Button>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      </div>
    );
  }
}

const styles = (theme: Theme) => createStyles({
  root: {
    flexGrow: 1,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
});

(Current as React.ComponentClass<Props>).propTypes = {
  classes: PropTypes.object.isRequired,
} as any;

export default withStyles(styles)(Current);
