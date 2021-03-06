import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
class Form extends Component {
  constructor(props){
    super(props);

    this.state = {
      title: '',
      description: '',
      author: ''
    }

    this.handleChangeField = this.handleChangeField.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.articleToEdit) {
      this.setState({
        title: nextProps.articleToEdit.title,
        description: nextProps.articleToEdit.description,
        author: nextProps.articleToEdit.author
      })
    }
  }

  handleSubmit() {
    const { onSubmit, articleToEdit, onEdit } = this.props;
    const { title, description, author } = this.state;

    if(!articleToEdit) {
      return axios.post('http://localhost:8000/api/articles/', {
        title,
        description,
        author
      })
        .then((res) => onSubmit(res.data))
        .then(() => this.setState({ title: '', body: '', author: '' }));
    } else {
      return axios.patch(`http://localhost:8000/api/articles/${articleToEdit._id}`, {
        title,
        description,
        author
      })
        .then((res) => onEdit(res.data))
        .then(() => this.setState({ title: '', body: '', author: '' }));
    }

  }

  handleChangeField(key, event) {
    this.setState({
      [key]: event.target.value
    })
  }

  render() {
    const { articleToEdit } = this.props;
    const { title, description, author } = this.state;

    return (
      <div className="col-12 col-lg-6 offset-lg-3">
        <input 
          onChange={(event) => this.handleChangeField('title', event)}
          value={title}
          className="form-control my-3" 
          placeholder="Article Title" 
        />
        <textarea 
          onChange={(event) => this.handleChangeField('description', event)}
          value={description}
          className="form-control my-3" 
          placeholder="Article Description">
        </textarea>
        <input 
          onChange={(event) => this.handleChangeField('author', event)}
          value={author}
          className="form-control my-3" 
          placeholder="Article Author" 
        />
        <button 
          onClick={this.handleSubmit}
          className="btn btn-primary float-right">{articleToEdit ? 'Update' : 'Submit'}</button>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  onSubmit: data => dispatch({ type: 'SUBMIT_ARTICLE', data }),
  onEdit: data => dispatch({ type: 'EDIT_ARTICLE', data }),
})

const mapStateToProps = state => ({
  articleToEdit: state.home.articleToEdit,
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);