import * as React from 'react';
import { AnyAction, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import * as PropTypes from 'prop-types';

import { Grid, GridColumn } from '@progress/kendo-react-grid';

import { withStyles, WithStyles, createStyles, Theme } from '@material-ui/core/styles';

import { getArticlesThunk, executeSearchThunk } from '../actions/thunks';
import { AppState } from '../store';
import { IArticlesState } from '../actions';
import { NavLink, RouteComponentProps } from 'react-router-dom';
import { Button } from '@material-ui/core';

export interface IProps extends WithStyles<typeof styles> {
  items: IArticlesState;
  getArticlesThunk: typeof getArticlesThunk;
  executeSearchThunk: typeof executeSearchThunk;
}

interface IState {
  skip: number;
  take: number;
}

class Archive extends React.Component<IProps & RouteComponentProps, IState> {
  state: IState = {
    skip: 0,
    take: 10
  };

  componentWillMount () {
    this.props.items.articles = [];
    const params: any = this.props.match.params;
    const query: string = params.query;
    if (query) {
      this.props.executeSearchThunk(query);
    } else {
      this.props.getArticlesThunk();
    }
  }

  pageChange = (event: any) => {
    this.setState({
        skip: event.page.skip,
        take: event.page.take
    });
  }

  onRowClick = (event: any) => {
    window.location.href = `/article/${event.dataItem.id}`;
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
        <NavLink to="/article/new" style={{textDecoration:'none'}}>
          <Button color="inherit">Adauga</Button>
        </NavLink>
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

(Archive as React.ComponentClass<IProps, IState>).propTypes = {
  classes: PropTypes.object.isRequired
} as any;

const mapStateToProps = (state: AppState) => ({
  items: state.articles,
  auth: state.auth
});

const mapDispatchToProps = (dispatch: ThunkDispatch<IState, void, AnyAction>) => (
  bindActionCreators({ getArticlesThunk, executeSearchThunk }, dispatch)
);

export default withStyles(styles)((connect(mapStateToProps, mapDispatchToProps))(Archive));
