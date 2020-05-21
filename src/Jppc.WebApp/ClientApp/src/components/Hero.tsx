import * as React from 'react';
import * as PropTypes from 'prop-types';

import { WithStyles, Theme, createStyles, withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

export interface Props extends WithStyles<typeof styles> {}

class Hero extends React.Component<Props> {
  public render () {
    const { classes } = this.props;
    return (
      <Paper className={classes.mainFeaturedPost} style={{ marginBottom: 20, marginTop:20 }}>
      <Grid container>
        <Grid item md={6}>
          <div className={classes.mainFeaturedPostContent}>
            <Typography component="h1" variant="h3" color="inherit" gutterBottom>
            Jurnalul Practicilor Pozitive Comunitare
            </Typography>
            <Typography variant="body1" color="inherit" paragraph>
            The Journal of Community Positive Practices invites original paper
             submissions for the issue 3/2013 (volume XIII) on “Social Inclusion of Vulnerable Groups ”.
            </Typography>
            <Typography variant="subtitle2" color="inherit">All submissions will be double blind peer reviewed.</Typography>
            <Typography variant="subtitle2" color="inherit">Deadline for submitting articles: September 25, 2013</Typography>
          </div>
        </Grid>
      </Grid>
    </Paper>
    );
  }
}

const styles = (theme: Theme) => createStyles({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
  mainFeaturedPost: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  mainFeaturedPostContent: {
    padding: `${theme.spacing.unit * 6}px`,
    [theme.breakpoints.up('md')]: {
      paddingRight: 0,
      paddingLeft: 16,
    },
  },
});

(Hero as React.ComponentClass<Props>).propTypes = {
  classes: PropTypes.object.isRequired,
} as any;

export default withStyles(styles)(Hero);
