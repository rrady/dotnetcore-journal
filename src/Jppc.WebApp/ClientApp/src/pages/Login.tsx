import * as React from 'react';
import { AnyAction, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import * as PropTypes from 'prop-types';

import classnames from 'classnames';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import { AppState } from '../store';
import { loginThunk } from '../actions/thunks';
import { IAuthState } from '../actions/types';
import { LoginModel } from '../models';

export interface IProps extends WithStyles<typeof styles> {
  auth: IAuthState;
  loginThunk: typeof loginThunk;
}

interface IInputErrors {
  email: boolean;
  password: boolean;
}

interface IState {
  showPassword: boolean;
  email: string;
  password: string;
  errors: IInputErrors;
}

class Login extends React.Component<IProps, IState> {
  state: IState = {
    showPassword: false,
    email: '',
    password: '',
    errors: {
      email: false,
      password: false
    }
  };

  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  }

  handleInputChange = (prop: 'email' | 'password') => (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ [prop]: event.target.value } as Pick<IState, 'email' | 'password'>);
  }

  login = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.preventDefault();

    const errors = { ...this.state.errors };
    this.state.email === '' ? errors.email = true : errors.email = false;
    this.state.password === '' ? errors.password = true : errors.password = false;
    this.setState({ errors });

    if (this.state.email === '' || this.state.password === '') {
      return;
    }

    const model = new LoginModel(this.state.email, this.state.password);
    this.props.loginThunk(model);
    window.location.href = '/';
  }

  render () {
    const { classes } = this.props;

    return(
      <React.Fragment>
        <form className={classes.container} noValidate autoComplete="off">
          <FormControl className={classes.formControl} error={this.state.errors.email}>
            <TextField
              id="outlined-adornment-weight"
              className={classnames(classes.margin, classes.textField)}
              type="email"
              label="Email"
              value={this.state.email}
              onChange={this.handleInputChange('email')}
            />
            {this.state.errors.email && <FormHelperText>This field is required!</FormHelperText>}
          </FormControl>
          <FormControl className={classes.formControl} error={this.state.errors.password}>
            <TextField
              id="outlined-adornment-password"
              className={classnames(classes.margin, classes.textField)}
              type={this.state.showPassword ? 'text' : 'password'}
              label="Password"
              value={this.state.password}
              onChange={this.handleInputChange('password')}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Toggle password visibility"
                      onClick={this.handleClickShowPassword}
                    >
                      {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {this.state.errors.password && <FormHelperText>This field is required!</FormHelperText>}
          </FormControl>
        </form>
        <Button
          type="submit"
          variant="contained"
          fullWidth
          color="secondary"
          onClick={this.login}>
          Login
        </Button>
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
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit * 2,
  },
  margin: {
    margin: theme.spacing.unit,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing.unit,
    top: theme.spacing.unit,
    color: theme.palette.grey[500],
  },
});

(Login as React.ComponentClass<IProps, IState>).propTypes = {
  classes: PropTypes.object.isRequired,
} as any;

const mapStateToProps = (state: AppState) => ({
  auth: state.auth
});

const mapDispatchToProps = (dispatch: ThunkDispatch<IState, void, AnyAction>) => (
  bindActionCreators({ loginThunk }, dispatch)
);

export default withStyles(styles)((connect(mapStateToProps, mapDispatchToProps))(Login));
