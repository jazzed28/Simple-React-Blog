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

  handleSubmit() {
    const { onSubmit } = this.props;
    const { title, description, author } = this.state;

    return axios.post('http://localhost:8000/api/articles/', {
      title,
      description,
      author
    })
      .then((res) => onSubmit(res.data));
  }

  handleChangeField(key, event) {
    this.setState({
      [key]: event.target.value
    })
  }

  render() {
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
          className="btn btn-primary float-right">Submit</button>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  onSubmit: data => dispatch({ type: 'SUBMIT_ARTICLE', data }),
})
export default connect(null, mapDispatchToProps)(Form);