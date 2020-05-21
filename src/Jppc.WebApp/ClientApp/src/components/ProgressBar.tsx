import * as React from 'react';
import * as PropTypes from 'prop-types';

import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

export interface IProps extends WithStyles<typeof styles> {
  percentage: number;
}

class ProgressBar extends React.Component<IProps> {
  render () {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <LinearProgress variant="determinate" value={this.props.percentage} />
      </div>
    );
  }
}

const styles = (theme: Theme) => createStyles({
  root: {
    flexGrow: 1,
  }
});

(ProgressBar as React.ComponentClass<IProps>).propTypes = {
  classes: PropTypes.object.isRequired,
  percentage: PropTypes.number.isRequired
} as any;

export default withStyles(styles)(ProgressBar);
