import * as React from 'react';
import { AnyAction, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import * as PropTypes from 'prop-types';

import { Grid, GridColumn } from '@progress/kendo-react-grid';

import { withStyles, WithStyles, createStyles, Theme } from '@material-ui/core/styles';

import { getUsersThunk, setModeratorThunk } from '../actions/thunks';
import { AppState } from '../store';
import { IAdminState } from '../actions';

export interface IProps extends WithStyles<typeof styles> {
  admin: IAdminState;
  getUsersThunk: typeof getUsersThunk;
  setModeratorThunk: typeof setModeratorThunk;
}

interface IState {
  skip: number;
  take: number;
}

class AdminRoles extends React.Component<IProps, IState> {
  state: IState = {
    skip: 0,
    take: 10
  };

  componentWillMount () {
    this.props.getUsersThunk();
  }

  componentDidUpdate (prevProps: IProps) {
    if (this.props.admin.users.length !== prevProps.admin.users.length) {
      this.forceUpdate();
    }
  }

  pageChange = (event: any) => {
    this.setState({
        skip: event.page.skip,
        take: event.page.take
    });
  }

  onRowClick = (event: any) => {
    this.props.setModeratorThunk(event.dataItem.id);
    this.props.admin.users = [];
    this.props.getUsersThunk();
    this.setState({
      skip: 0,
      take: 10
    });
  }

  render () {
    return (
      <React.Fragment>
        <Grid
          style={{ height: '800px' }}
          data={this.props.admin.users.slice(this.state.skip, this.state.take + this.state.skip)}
          skip={this.state.skip}
          take={this.state.take}
          pageable={true}
          onPageChange={this.pageChange}
          onRowClick={this.onRowClick}
          total={this.props.admin.users.length}
        >
          <GridColumn field="email" title="Email" />
          <GridColumn field="firstName" title="First Name" />
          <GridColumn field="lastName" title="Last Name" />
          <GridColumn field="role" title="Role" />
        </Grid>
      </React.Fragment>
    );
  }
}

const styles = (theme: Theme) => createStyles({
  fab: {
    margin: theme.spacing.unit,
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

(AdminRoles as React.ComponentClass<IProps, IState>).propTypes = {
  classes: PropTypes.object.isRequired
} as any;

const mapStateToProps = (state: AppState) => ({
  items: state.articles,
  auth: state.auth,
  admin: state.admin
});

const mapDispatchToProps = (dispatch: ThunkDispatch<IState, void, AnyAction>) => (
  bindActionCreators({ getUsersThunk, setModeratorThunk }, dispatch)
);

export default withStyles(styles)((connect(mapStateToProps, mapDispatchToProps))(AdminRoles));
