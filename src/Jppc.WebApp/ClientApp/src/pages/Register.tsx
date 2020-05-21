import * as React from 'react';
import { AnyAction, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import * as PropTypes from 'prop-types';

import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import Notification from '../components/Notification';

import { AppState } from '../store';
import { IAuthState } from '../actions/types';
import { registerThunk } from '../actions/thunks';
import { RegisterModel } from '../models';
import { grey } from '@material-ui/core/colors';

export interface Props extends WithStyles<typeof styles> {
  auth: IAuthState;
  registerThunk: typeof registerThunk;
}

interface IInputErrors {
  email: boolean;
  password: boolean;
  confirmPassword: boolean;
  firstName: boolean;
  lastName: boolean;
}

interface State {
  showPassword: boolean;
  showConfirmPassword: boolean;
  showNotification: boolean;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
  errors: IInputErrors;
}

class Register extends React.Component<Props, State> {
  state: State = {
    showPassword: false,
    showConfirmPassword: false,
    showNotification: false,
    errors: {
      email: false,
      password: false,
      confirmPassword: false,
      firstName: false,
      lastName: false
    },
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: ''
  };

  handleInputChange = (prop: 'email' | 'firstName' | 'lastName' | 'password' | 'confirmPassword') =>
   (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ [prop]: event.target.value } as Pick<State, 'email' | 'firstName' | 'lastName' | 'password' | 'confirmPassword'>);
  }

  handleClickShowPassword = (prop: 'showPassword' | 'showConfirmPassword') => () => {
    this.setState({ [prop]: !this.state[prop]} as Pick<State, 'showPassword' | 'showConfirmPassword'>);
  }

  handleCloseNotification = () => {
    this.setState({ showNotification: false });
  }

  register = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.preventDefault();

    const errors = { ...this.state.errors };
    this.state.email === '' ? errors.email = true : errors.email = false;
    this.state.password === '' ? errors.password = true : errors.password = false;
    this.state.confirmPassword === '' ? errors.confirmPassword = true : errors.confirmPassword = false;
    this.state.firstName === '' ? errors.firstName = true : errors.firstName = false;
    this.state.lastName === '' ? errors.lastName = true : errors.lastName = false;
    this.setState({ errors });

    if (this.state.email === '' || this.state.password === '' ||
     this.state.confirmPassword === '' || this.state.firstName === '' || this.state.lastName === '') {
       return;
     }

    if (this.state.password === this.state.confirmPassword) {
      const model = new RegisterModel(this.state.email, this.state.firstName, this.state.lastName, this.state.password, null);
      this.props.registerThunk(model);
    } else {
      this.setState({ showNotification: true });
    }
  }

  render () {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <form className={classes.container} noValidate autoComplete="off">
          <FormControl className={classes.formControl} error={this.state.errors.email}>
            <TextField
              required={true}
              id="email"
              label="Email"
              className={classes.textField}
              value={this.state.email}
              onChange={this.handleInputChange('email')}
            />
            {this.state.errors.email && <FormHelperText>This field is required!</FormHelperText>}
          </FormControl>
          <FormControl className={classes.formControl} error={this.state.errors.password}>
            <TextField
              required={true}
              id="password"
              label="Password"
              type={this.state.showPassword ? 'text' : 'password'}
              className={classes.textField}
              value={this.state.password}
              onChange={this.handleInputChange('password')}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Toggle password visibility"
                      onClick={this.handleClickShowPassword('showPassword')}
                    >
                      {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {this.state.errors.password && <FormHelperText>This field is required!</FormHelperText>}
          </FormControl>
          <FormControl className={classes.formControl} error={this.state.errors.confirmPassword}>
            <TextField
              required={true}
              id="confirm-password"
              label="Confirm password"
              type={this.state.showConfirmPassword ? 'text' : 'password'}
              className={classes.textField}
              value={this.state.confirmPassword}
              onChange={this.handleInputChange('confirmPassword')}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Toggle password visibility"
                      onClick={this.handleClickShowPassword('showConfirmPassword')}
                    >
                      {this.state.showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {this.state.errors.confirmPassword && <FormHelperText>This field is required!</FormHelperText>}
          </FormControl>
          <FormControl className={classes.formControl} error={this.state.errors.firstName}>
            <TextField
              required={true}
              id="first-name"
              label="First name"
              className={classes.textField}
              value={this.state.firstName}
              onChange={this.handleInputChange('firstName')}
            />
            {this.state.errors.firstName && <FormHelperText>This field is required!</FormHelperText>}
          </FormControl>
          <FormControl className={classes.formControl} error={this.state.errors.lastName}>
            <TextField
              required={true}
              id="last-name"
              label="Last name"
              className={classes.textField}
              value={this.state.lastName}
              onChange={this.handleInputChange('lastName')}
            />
            {this.state.errors.lastName && <FormHelperText>This field is required!</FormHelperText>}
          </FormControl>
          <Button
            type="submit"
            color="secondary"
            variant="contained"
            onClick={this.register}
            style={{width: 400, color: grey[50], textDecoration:'none'}}>
            Register
          </Button>
        </form>
        <Notification
          open={this.state.showNotification}
          message="Passwords don't match!"
          variant="warning"
          onClose={this.handleCloseNotification}
        />
      </React.Fragment>
    );
  }
}

const styles = (theme: Theme) => createStyles({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    textAlign: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  formControl: {
    margin: theme.spacing.unit * 3,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 400,
  }
});

(Register as React.ComponentClass<Props, State>).propTypes = {
  classes: PropTypes.object.isRequired,
} as any;

const mapStateToProps = (state: AppState) => ({
  auth: state.auth
});

const mapDispatchToProps = (dispatch: ThunkDispatch<State, void, AnyAction>) => (
  bindActionCreators({ registerThunk }, dispatch)
);

export default withStyles(styles)((connect(mapStateToProps, mapDispatchToProps))(Register));
