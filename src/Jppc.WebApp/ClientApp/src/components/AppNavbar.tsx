import * as React from 'react';
import { AnyAction, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import * as PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { grey } from '@material-ui/core/colors';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Search from '@material-ui/icons/Search';

import { AppState } from '../store';
import { IAuthState } from '../actions/types';
import { logoutThunk } from '../actions/thunks';

export interface IProps extends WithStyles<typeof styles> {
  auth: IAuthState;
  logoutThunk: typeof logoutThunk;
}

interface IState {
  isLoginModalOpen: boolean;
}

class AppNavbar extends React.Component<IProps, IState> {
  state: IState = {
    isLoginModalOpen: false,
  };

  handleLogout = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.preventDefault();
    this.props.logoutThunk();
    window.location.href = '/';
  }

  search = (event: any) => {
    if (event.key === 'Enter') {
      window.location.href = `/archive?q=${event.target.value}`;
    }
  }

  render () {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography className={classes.title} variant="h6" color="inherit" noWrap>
              JPPC
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <Search/>
              </div>
              <InputBase
                placeholder="Search…"
                onKeyDown={this.search}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
              />
            </div>
            <div className={classes.grow} />
            <NavLink to="/" style={{color: grey[50], textDecoration:'none'}}>
              <Button color="inherit" className={classes.button}>Despre</Button>
            </NavLink>
            <NavLink to="/" style={{color: grey[50], textDecoration:'none'}}>
              <Button color="inherit" className={classes.button}>Numar Curent</Button>
            </NavLink>
            <NavLink to="/" style={{color: grey[50], textDecoration:'none'}}>
              <Button color="inherit" className={classes.button}>Instructiuni pentru autori</Button>
            </NavLink>
            <NavLink to="/archive" style={{color: grey[50], textDecoration:'none'}}>
              <Button color="inherit" className={classes.button}>Arhiva</Button>
            </NavLink>
            <NavLink to="/" style={{color: grey[50], textDecoration:'none'}}>
              <Button color="inherit" className={classes.button}>Contact</Button>
            </NavLink>
            {
              this.props.auth.isAuthenticated && this.props.auth.role === 'moderator' && (
                <NavLink to="/admin/pendings" style={{color: grey[50], textDecoration:'none'}}>
                  <Button color="inherit" className={classes.button}>Pendings</Button>
                </NavLink>
              )
            }
            {
              this.props.auth.isAuthenticated && this.props.auth.role === 'admin' && (
                <NavLink to="/admin/users" style={{color: grey[50], textDecoration:'none'}}>
                  <Button color="inherit" className={classes.button}>Users</Button>
                </NavLink>
              )
            }
            {
              !this.props.auth.isAuthenticated ? (
                <NavLink
                  to="/login"
                  style={{color: grey[50], textDecoration:'none'}}
                >
                  <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    style={{color: grey[50], textDecoration:'none'}}
                  >
                    Login
                  </Button>
                </NavLink>
              ) : (
                <React.Fragment>
                  <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    onClick={this.handleLogout} style={{color: grey[50], textDecoration:'none'}}
                  >
                    Logout
                  </Button>
                </React.Fragment>
              )
            }
            {
              !this.props.auth.isAuthenticated &&
              <NavLink
                to="/register"
                style={{color: grey[50], textDecoration:'none'}}
              >
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  style={{color: grey[50], textDecoration:'none'}}
                >
                  Register
                </Button>
              </NavLink>
            }
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

const styles = (theme: Theme) => createStyles({
  root: {
    width: '100%',
  },
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
});

(AppNavbar as React.ComponentClass<IProps, IState>).propTypes = {
  classes: PropTypes.object.isRequired,
} as any;

const mapStateToProps = (state: AppState) => ({
  auth: state.auth
});

const mapDispatchToProps = (dispatch: ThunkDispatch<IState, void, AnyAction>) => (
  bindActionCreators({ logoutThunk }, dispatch)
);

export default withStyles(styles)((connect(mapStateToProps, mapDispatchToProps))(AppNavbar));
