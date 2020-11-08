import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const Comment = props => (
  <div >
    <p>{props.comment}</p>
    <hr className="line" />
  </div>
)




class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: this.props.post.comments,
      text: ''
    }

    this.handleText = this.handleText.bind(this);
    this.handleNewComment = this.handleNewComment.bind(this);

  }



  componentDidUpdate() {
    axios.get('http://localhost:4000/messageboard')
      .then(response => {
        this.setState({
          comments: this.props.post.comments
        })
      })
      .catch(function (error) {
        console.log(error)
      })
  }


  commentList() {



    return this.state.comments.map(function (currentComment, i) {
      return <Comment comment={currentComment} key={i} />
    })
  }


  handleText(event) {
    this.setState({
      text: event.target.value
    })
  }

  handleNewComment(event) {
    event.preventDefault();


    const editPost = {
      comments: this.state.comments.concat(this.state.text)
    }


    axios.post('http://localhost:4000/messageboard/update/' +
      this.props.post._id, editPost)


    this.setState({
      text: ''
    })

  }



  render() {

    let optionOne =
      <div>
        <h5>Comments: </h5>
      </div>
    let optionTwo =
      <div>

      </div>

    return (
      <div className="card post">
        <h4>{this.props.post.title}</h4>
        <hr className="line" />
        <p>{this.props.post.message}</p>
        <p>By: {this.props.post.author}</p>

        {/* ternary for comments section */}
        {(this.state.comments.length === 0) ? optionTwo : optionOne}
        <div>{this.commentList()}</div>



        <h6>Leave a New Comment: </h6>
        <form onSubmit={this.handleNewComment}>
          <textarea className="comment" value={this.state.text} onChange={this.handleText} />
          <br />
          <button type="submit">Submit</button>
        </form>

      </div>
    )
  }
}




export default class MessageBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      posts: [],
      newPost: '',
      title: '',
      passEdit: '',
      id: '',
    }
    this.handleNewPost = this.handleNewPost.bind(this);
    this.handleSubmitNew = this.handleSubmitNew.bind(this);
    this.handleTitle = this.handleTitle.bind(this);
    this.handlePassEdit = this.handlePassEdit.bind(this);
    this.editPassword = this.editPassword.bind(this);
    this.deleteAccount = this.deleteAccount.bind(this);
  }

  componentDidMount() {
    axios.get('http://localhost:4000/messageboard/' + this.props.match.params.id)
      .then(response => {
        this.setState({
          username: response.data.username,
          id: response.data._id,
          password: response.data.password
        })
        console.log(this.state.username, this.state.id, this.state.password)
      })
      .catch(function (error) {
        console.log(error)
      })

    axios.get('http://localhost:4000/messageboard')
      .then(response => {
        this.setState({
          posts: response.data
        })
      })
      .catch(function (error) {
        console.log(error)
      })

  }


  componentDidUpdate() {
    axios.get('http://localhost:4000/messageboard/' + this.props.match.params.id)
      .then(response => {
        this.setState({
          username: response.data.username,
        })
      })
      .catch(function (error) {
        console.log(error)
      })

    this.updatePosts()
  }

  componentDidUpdate() {
    axios.get('http://localhost:4000/messageboard')
      .then(response => {
        this.setState({
          posts: response.data
        })
      })
      .catch(function (error) {
        console.log(error)
      })
  }


  handleNewPost(event) {
    this.setState({
      newPost: event.target.value
    })
  }
  handlePassEdit(event) {
    this.setState({
      passEdit: event.target.value
    })
  }

  handleTitle(event) {
    this.setState({
      title: event.target.value
    })
  }


  editPassword(event) {
    event.preventDefault();

    this.setState({
      password: this.state.passEdit
    })

    const editPassword = {
      password: this.state.passEdit
    }

    axios.post('http://localhost:4000/messageboard/edit/' +
      this.props.match.params.id, editPassword)
      .then(res => console.log(res.data));

    this.setState({
      passEdit: ''
    })
  }



  deleteAction() {
    return (
      <Link to={'/'}></Link>
    )
  }


  handleSubmitNew(event) {
    event.preventDefault();

    const newPost = {
      title: this.state.title,
      message: this.state.newPost,
      author: this.state.username
    }

    axios.post('http://localhost:4000/messageboard/addPost', newPost)
      .then(res => console.log(res.data));

    this.setState({
      newPost: '',
      title: ''
    })



  }

  deleteAccount() {
    axios.delete('http://localhost:4000/messageboard/deleteAccount/' + this.state.id)
      .then(res => {

      })
      .catch(function (err) {
        console.log(err)
      })


  }

  postList() {

    return this.state.posts.map(function (currentPost, i) {
      return <Post post={currentPost} key={i} />
    })
  }

  render() {
    return (

      <div id="background">
        <nav className="navbar navbar-expand-sm sticky-top mynav">
          <h1>Perryville Persevere Class Message Board</h1>
          <ul className="navbar-nav navLinks">
          <li className="nav-item">
            <Link to={'/'} className="text-decoration-none linknav nav-link">Logout</Link>
          </li>
          <li className="nav-item">
          <div class="dropdown">
            <a type="button" className="dropdown-toggle options nav-link" data-toggle="dropdown">
              Options
  </a>
            <div class="dropdown-menu">
              <form id="area">
                <p className="label">Edit Password: </p>
                <input id="editPassword" type="password" value={this.state.passEdit} onChange={this.handlePassEdit} />
                <br />
                <button type="button" className="homePageButton text-white" onClick={this.editPassword}>Edit</button>
              </form>
              <form id="area">
                <p className="label">Delete Account: </p>
                < button type="button" className="text-white deleteB" onClick={this.deleteAccount}>
                  <Link to={'/'} className="text-white text-decoration-none">Delete</Link></button>
              </form>

            </div>
          </div>
          </li>
          </ul>
          
          

        </nav>


        <div className="card section top">
          <h2 id="greeting" className="text-center">Welcome Back, {this.state.username}!</h2>
        </div>

        <div className="card newPost">

          <h3 className="subTitles">Post to the Message Board</h3>

          <form id="commentForm" onSubmit={this.handleSubmitNew}>
            <p className="label">Title: </p>
            <input id="comTitle" value={this.state.title} onChange={this.handleTitle} />
            <p className="label">Message: </p>
            <textarea className="postText" value={this.state.newPost} onChange={this.handleNewPost} />
            <br />
            <button type="submit" className="homePageButton text-white">Submit</button>
          </form>
        </div>


        <div className="card section">
          <h3 id="greeting" className="text-center">Message Board</h3>
        </div>



        <div>
          {this.postList()}
        </div>





      </div>


    );
  }
}