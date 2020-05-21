import * as React from 'react';
import { AnyAction, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import * as PropTypes from 'prop-types';
import { RouteComponentProps } from 'react-router';

import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';

import { AppState } from '../store';
import { getArticleThunk, downloadArticleThunk } from '../actions/thunks';
import { IArticlesState } from '../actions';
import { Card, CardActionArea, CardContent, Typography, CardActions, Button } from '@material-ui/core';

export interface IProps extends WithStyles<typeof styles> {
  items: IArticlesState;
  getArticleThunk: typeof getArticleThunk;
  downloadArticleThunk: typeof downloadArticleThunk;
}

interface IState {

}

class ViewArticle extends React.Component<IProps & RouteComponentProps, IState> {
  state: IState = {

  };

  componentWillMount () {
    const params: any = this.props.match.params;
    const id: string = params.id;
    this.props.getArticleThunk(id);
  }

  componentWillReceiveProps () {
    if (this.props.items.content) {

    }
  }

  download = (event: any) => {
    this.props.downloadArticleThunk(event.target.value);
  }

  render () {
    const { classes } = this.props;

    return(
      <Card className={classes.card}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {this.props.items.article.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Description: {this.props.items.article.description}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Price: {this.props.items.article.price}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Buy
          </Button>
          <Button size="small" color="primary" onClick={this.download}>
            Download
          </Button>
        </CardActions>
      </Card>
    );
  }
}

const styles = (theme: Theme) => createStyles({
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  }
});

(ViewArticle as React.ComponentClass<IProps, IState>).propTypes = {
  classes: PropTypes.object.isRequired,
} as any;

const mapStateToProps = (state: AppState) => ({
  auth: state.auth,
  items: state.articles
});

const mapDispatchToProps = (dispatch: ThunkDispatch<IState, void, AnyAction>) => (
  bindActionCreators({ getArticleThunk, downloadArticleThunk }, dispatch)
);

export default withStyles(styles)((connect(mapStateToProps, mapDispatchToProps))(ViewArticle));
