import * as React from 'react';
import { connect } from 'react-redux';
import { RouteProps, Redirect } from 'react-router';
import { Route, RouteComponentProps } from 'react-router-dom';

import { AppState } from '../store';
import { IAuthState } from '../actions/types';

interface IPrivateRouteProps extends RouteProps {
  component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
  auth: IAuthState;
}

type RenderComponent = (props: RouteComponentProps<any>) => React.ReactNode;

class PrivateRoute extends Route<IPrivateRouteProps> {
  render () {
    const {component: Component, ...rest}: IPrivateRouteProps = this.props;
    const renderComponent: RenderComponent = (props) => (
      this.props.auth.isAuthenticated ?
        <Component {...props} /> :
        <Redirect to="/login" />
    );

    return (
      <Route {...rest} render={renderComponent} />
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
