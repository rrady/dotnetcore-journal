import * as React from 'react';
import * as PropTypes from 'prop-types';

import { WithStyles, Theme, createStyles, withStyles, Card, CardContent, Hidden, CardMedia, } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

export interface Props extends WithStyles<typeof styles> {}

class Arhiva extends React.Component<Props> {
  public render () {
    const { classes } = this.props;
    return (
      <div>
        <Card className={classes.card}>
          <Hidden xsDown>
            <CardMedia
              className={classes.cardMedia}
              image="http://jppc.ro/reviste/JCPP%20Nr.%201%202018/coperta.jpg"
              title="Image title"
            />
          </Hidden>
          <div className={classes.cardDetails}>
            <CardContent>
              <Typography component="h2" variant="h5">
              Titlu
              </Typography>
              <Typography variant="subtitle1" color="primary">
                Vezi issue
              </Typography>
            </CardContent>
          </div>
        </Card>
      </div>
    );
  }
}

const styles = (theme: Theme) => createStyles({
  root: {
    flexGrow: 1,
  },
  card: {
    display: 'flex',
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 150,
    height: 214,
  },
});

(Arhiva as React.ComponentClass<Props>).propTypes = {
  classes: PropTypes.object.isRequired,
} as any;

export default withStyles(styles)(Arhiva);
