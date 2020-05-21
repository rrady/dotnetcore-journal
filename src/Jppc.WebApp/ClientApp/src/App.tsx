import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import * as PropTypes from 'prop-types';

import { CssBaseline, WithStyles, Theme, createStyles, withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import AppNavbar from './components/AppNavbar';
import PrivateRoute from './components/PrivateRoute';
import SbStanga from './components/SbStanga';
import SbDreapta from './components/SbDreapta';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Archive from './pages/Archive';
import Article from './pages/Article';
import ViewArticle from './pages/ViewArticle';

import './style/index.sass';
import './style/kendo.all.css';
import './style/kendo.variables.scss';
import AdminRoute from './components/AdminRoute';
import AdminRoles from './pages/AdminRoles';
import AdminPending from './pages/AdminPending';
import ModeratorRoute from './components/ModeratorRoute';

export interface IProps extends WithStyles<typeof styles> {}

class App extends React.Component<IProps> {
  public render () {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Router>
          <React.Fragment>
            <AppNavbar />
            <CssBaseline />
            <div style={{ padding: 20 }}>
              <Grid container>
                <Grid item xs>
                  <Paper className={classes.paper}>
                    <SbStanga />
                  </Paper>
                </Grid>
                <Grid item xs={8} style={{ padding: 20, paddingTop: 0}}>
                  <Paper className={classes.paper}>
                    <Switch>
                      <Route exact path="/" component={Home} />
                      <Route exact path="/login" component={Login} />
                      <Route exact path="/register" component={Register} />
                      <Route exact path="/archive" component={Archive} />
                      <PrivateRoute exact path="/article/new" component={Article} />
                      <PrivateRoute exact path="/article/:id" component={ViewArticle} />
                      <AdminRoute exact path="/admin/users" component={AdminRoles} />
                      <ModeratorRoute exact path="/admin/pendings" component={AdminPending} />
                    </Switch>
                  </Paper>
                </Grid>
                <Grid item xs>
                  <Paper className={classes.paper}>
                    <SbDreapta />
                  </Paper>
                </Grid>
              </Grid>
            </div>
          </React.Fragment>
        </Router>
      </div>
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
});

(App as React.ComponentClass<IProps>).propTypes = {
  classes: PropTypes.object.isRequired,
} as any;

export default withStyles(styles)(App);
