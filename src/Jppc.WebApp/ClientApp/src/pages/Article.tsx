import * as React from 'react';
import { AnyAction, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import * as PropTypes from 'prop-types';
import { RouteComponentProps } from 'react-router';

import classnames from 'classnames';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { AppState } from '../store';
import { createArticleThunk, getArticleThunk } from '../actions/thunks';
import { ArticleModel } from '../models';
import { InputLabel } from '@material-ui/core';

export interface IProps extends WithStyles<typeof styles> {
  createArticleThunk: typeof createArticleThunk;
}

interface IState {
  article: ArticleModel;
}

class Article extends React.Component<IProps & RouteComponentProps, IState> {
  state: IState = {
    article: new ArticleModel()
  };

  setName = (event: any) => {
    const model = this.state.article;
    model.name = event.target.value;
    this.setState({ article: model });
  }

  setDescription = (event: any) => {
    const model = this.state.article;
    model.description = event.target.value;
    this.setState({ article: model });
  }

  setLang = (event: any) => {
    const model = this.state.article;
    model.language = event.target.value;
    this.setState({ article: model });
  }

  setPrice = (event: any) => {
    const model = this.state.article;
    model.price = event.target.value;
    this.setState({ article: model });
  }

  setFile = (event: any) => {
    const model = this.state.article;
    model.file = event.target.files[0];
    this.setState({ article: model });
  }

  create = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.preventDefault();
    this.props.createArticleThunk(this.state.article);
  }

  render () {
    const { classes } = this.props;

    return(
      <React.Fragment>
        <form className={classes.container} noValidate autoComplete="off">
          <FormControl className={classes.formControl}>
            <TextField
              id="outlined-adornment-weight"
              className={classnames(classes.margin, classes.textField)}
              type="name"
              label="Name"
              value={this.state.article.name}
              onChange={this.setName}
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <TextField
              id="outlined-adornment-weight"
              className={classnames(classes.margin, classes.textField)}
              type="description"
              label="Description"
              value={this.state.article.description}
              onChange={this.setDescription}
            />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="lang">Language</InputLabel>
            <Select
              value={this.state.article.language}
              onChange={this.setLang}
              inputProps={{
                name: 'lang',
                id: 'lang',
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="en">English</MenuItem>
              <MenuItem value="ro">Romanian</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <TextField
              id="outlined-adornment-weight"
              className={classnames(classes.margin, classes.textField)}
              type="price"
              label="Price"
              value={this.state.article.price}
              onChange={this.setPrice}
            />
          </FormControl>
        </form>
        <Button
          variant="contained"
          component="label"
        >
          Upload
          <input
            type="file"
            onChange={this.setFile}
            style={{ display: 'none' }}
          />
        </Button>
        <Button
          type="submit"
          variant="contained"
          fullWidth
          color="secondary"
          onClick={this.create}>
          Create
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

(Article as React.ComponentClass<IProps, IState>).propTypes = {
  classes: PropTypes.object.isRequired,
} as any;

const mapStateToProps = (state: AppState) => ({
  auth: state.auth,
  items: state.articles
});

const mapDispatchToProps = (dispatch: ThunkDispatch<IState, void, AnyAction>) => (
  bindActionCreators({ createArticleThunk, getArticleThunk }, dispatch)
);

export default withStyles(styles)((connect(mapStateToProps, mapDispatchToProps))(Article));
