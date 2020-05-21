import * as React from 'react';
import { AnyAction, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import * as PropTypes from 'prop-types';

import { Grid, GridColumn } from '@progress/kendo-react-grid';

import { withStyles, WithStyles, createStyles, Theme } from '@material-ui/core/styles';

import { getPendingThunk, acceptThunk } from '../actions/thunks';
import { AppState } from '../store';
import { IArticlesState } from '../actions';

export interface IProps extends WithStyles<typeof styles> {
  items: IArticlesState;
  getPendingThunk: typeof getPendingThunk;
  acceptThunk: typeof acceptThunk;
}

interface IState {
  skip: number;
  take: number;
}

class AdminPendings extends React.Component<IProps, IState> {
  state: IState = {
    skip: 0,
    take: 10
  };

  componentWillMount () {
    this.props.getPendingThunk();
  }

  pageChange = (event: any) => {
    this.setState({
        skip: event.page.skip,
        take: event.page.take
    });
  }

  onRowClick = (event: any) => {
    this.props.acceptThunk(event.dataItem.id);
  }

  render () {
    return (
      <React.Fragment>
        <Grid
          style={{ height: '800px' }}
          data={this.props.items.articles.slice(this.state.skip, this.state.take + this.state.skip)}
          skip={this.state.skip}
          take={this.state.take}
          pageable={true}
          onPageChange={this.pageChange}
          onRowClick={this.onRowClick}
          total={this.props.items.articles.length}
        >
          <GridColumn field="name" title="Name" />
          <GridColumn field="description" title="Description" />
          <GridColumn field="price" title="Price" />
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

(AdminPendings as React.ComponentClass<IProps, IState>).propTypes = {
  classes: PropTypes.object.isRequired
} as any;

const mapStateToProps = (state: AppState) => ({
  items: state.articles,
  auth: state.auth
});

const mapDispatchToProps = (dispatch: ThunkDispatch<IState, void, AnyAction>) => (
  bindActionCreators({ getPendingThunk, acceptThunk }, dispatch)
);

export default withStyles(styles)((connect(mapStateToProps, mapDispatchToProps))(AdminPendings));
