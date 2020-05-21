import * as React from 'react';
import * as PropTypes from 'prop-types';
import classnames from 'classnames';

import CheckCircle from '@material-ui/icons/CheckCircle';
import Error from '@material-ui/icons/Error';
import Info from '@material-ui/icons/Info';
import Close from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Warning from '@material-ui/icons/Warning';
import { withStyles, Theme, createStyles, WithStyles } from '@material-ui/core/styles';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions/transition';

const variantIcon = {
  success: CheckCircle,
  warning: Warning,
  error: Error,
  info: Info,
};

interface IState {
  showNotification: boolean;
}

export interface IProps extends WithStyles<typeof styles> {
  open: boolean;
  message: string;
  variant: 'success' | 'warning' | 'error' | 'info';
  onClose: () => void;
}

class Notification extends React.Component<IProps, IState> {
  handleClose = () => {
    this.props.onClose();
  }

  render () {
    const { classes } = this.props;
    const Icon: React.ComponentType<SvgIconProps> = variantIcon[this.props.variant];

    return (
      <Slide direction="right">
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          open={this.props.open}
          TransitionComponent={SlideRight}
          autoHideDuration={6000}
          onClose={this.handleClose}
        >
          <SnackbarContent
            className={classes[this.props.variant]}
            aria-describedby="notification-snackbar"
            message={
              <span id="notification-snackbar" className={classes.message}>
                <Icon className={classnames(classes.icon, classes.iconVariant)} />
                {this.props.message}
              </span>
            }
            action={[
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                className={classes.close}
                onClick={this.props.onClose}
              >
                <Close className={classes.icon} />
              </IconButton>,
            ]}
          />
        </Snackbar>
      </Slide>
    );
  }
}

class SlideRight extends React.Component<TransitionProps> {
  render () {
    return (
      <Slide {...this.props} direction="right" />
    );
  }
}

const styles = (theme: Theme) => createStyles({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
  close: {
    padding: theme.spacing.unit / 2,
  },
});

(Notification as React.ComponentClass<IProps, IState>).propTypes = {
  classes: PropTypes.object.isRequired,
  message: PropTypes.string,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
} as any;

export default withStyles(styles)(Notification);
