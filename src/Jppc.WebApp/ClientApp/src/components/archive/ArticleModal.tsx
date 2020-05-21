import * as React from 'react';
import { AnyAction, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import * as PropTypes from 'prop-types';

import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';

import ProgressBar from '../ProgressBar';

import { AppState } from '../../store';
import { createArticleThunk } from '../../actions';
import { ArticleModel } from '../../models';

export interface IProps extends WithStyles<typeof styles> {
  open: boolean;
  article: ArticleModel;
  onClose: () => void;
  createArticleThunk: typeof createArticleThunk;
}

interface IState {
  uploadPercentage: number;
  article: ArticleModel;
  isDropdownOpen: boolean;
}

class ArticleModal extends React.Component<IProps, IState> {
  state: IState = {
    uploadPercentage: 0,
    article: null,
    isDropdownOpen: false
  };

  componentDidMount = () => {
    const article = this.props.article;
    this.setState({ article });
  }

  handleClose = () => {
    this.props.onClose();
  }

  handleDropdownClose = () => {
    this.setState({ isDropdownOpen: false });
  }

  handleDropdownOpen = () => {
    this.setState({ isDropdownOpen: true });
  }

  setArticleName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const article = this.state.article;
    article.name = event.target.value;
    this.setState({ article });
  }

  setArticleLanguage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const article = this.state.article;
    article.language = event.target.value;
    this.setState({ article });
  }

  onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const article = this.state.article;
    article.file = event.target.files[0];
    this.setState({ article });
  }

  onSubmit = () => {
    this.props.createArticleThunk(this.state.article);
  }

  render () {
    const { classes } = this.props;

    return(
      <React.Fragment>
        <Dialog
          maxWidth="md"
          open={this.props.open}
          onClose={this.handleClose}
        >
          <DialogTitle id="center max-width-dialog-title">
            Article
            <IconButton aria-label="Close" className={classes.closeButton} onClick={this.handleClose}>
              <Close />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <form className={classes.container} noValidate autoComplete="off">
              <FormControl className={classes.formControl}>
                <TextField
                  required={true}
                  id="article-name"
                  label="Name"
                  className={classes.textField}
                  value={this.props.article.name}
                  onChange={this.setArticleName}
                />
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="article-language">
                  Language
                </InputLabel>
                <Select
                  required={true}
                  className={classes.textField}
                  open={this.state.isDropdownOpen}
                  onClose={this.handleDropdownClose}
                  onOpen={this.handleDropdownOpen}
                  value={this.props.article.language}
                  onChange={this.setArticleLanguage}
                  inputProps={{
                    name: 'language',
                    id: 'article-language',
                  }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={'ro'}>ro</MenuItem>
                  <MenuItem value={'en'}>en</MenuItem>
                </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
                <input
                  accept="application/pdf"
                  className={classes.input}
                  id="input-button-file"
                  type="file"
                  onChange={this.onFileChange}
                />
                <label htmlFor="input-button-file">
                  <Button variant="contained" component="span" className={classes.button}>
                    Browse
                  </Button>
                </label>
                <ProgressBar percentage={this.state.uploadPercentage} />
              </FormControl>
            </form>
          </DialogContent>
          <DialogActions>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              color="secondary"
              onClick={this.onSubmit}>
              Submit
            </Button>
          </DialogActions>
        </Dialog>
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
    minWidth: 120,
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
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

(ArticleModal as React.ComponentClass<IProps, IState>).propTypes = {
  classes: PropTypes.object.isRequired,
} as any;

const mapStateToProps = (state: AppState) => ({
  auth: state.auth
});

const mapDispatchToProps = (dispatch: ThunkDispatch<IState, void, AnyAction>) => (
  bindActionCreators({ createArticleThunk }, dispatch)
);

export default withStyles(styles)((connect(mapStateToProps, mapDispatchToProps))(ArticleModal));
