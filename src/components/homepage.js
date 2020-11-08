import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';





export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newUsername: '',
            newPassword: '',
            username: '',
            password: '',
            login: false,
            id: '',
            userInput: '',
            passInput: ''
        }
        this.handleCreate = this.handleCreate.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleNewUsername = this.handleNewUsername.bind(this);
        this.handleNewPassword = this.handleNewPassword.bind(this);
        this.handleUsername = this.handleUsername.bind(this);
        

    }

    // create account function
    handleCreate(event) {
        event.preventDefault();

        const newAccount = {
            username: this.state.newUsername,
            password: this.state.newPassword,
        }

        axios.post('http://localhost:4000/messageboard/addAccount', newAccount)
            .then(res => console.log(res.data));

        this.setState({
            newUsername: '',
            newPassword: '',
            login: false
        })
    }



    handleDirect(event) {

        axios.get('http://localhost:4000/messageboard/username/' + this.state.username + '/password/' +
            this.state.password)
            .then(response => {
                this.setState({
                    login: true,
                    id: response.data._id,
                    password: '',
                    username: ''
                })
                console.log(this.state.id)
            })
            .catch(function (error) {
                console.log(error)
            })


        if (this.state.login === true) {
            console.log(this.state.id)
            return (
                <div>
                <button className="btn homePageButton"><Link id="link"
                    className="text-decoration-none"
                    to={'/' + this.state.id}>
                    Login
         </Link>
         </button>
              
         </div>
            )
        }
        if(this.state.login === false) {
            return (
                <div>
                <button className="btn homePageButton" data-toggle="modal" data-target="#myModal">
                    <span className="text-white">Login</span></button>


                <div className="modal" id="myModal">
                <div className="modal-dialog">
                    <div className="modal-content">


                        <div className="modal-header">
                            <h4 className="modal-title">Oops!</h4>

                        </div>

                        <div className="modal-body">
                            Your username or password was incorrect. Please try again or create an account.
                        </div>


                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>

                    </div>
                </div>
            </div>

            </div>
            )
        }
        this.setState({
            login: false
        })

    }



    handleNewUsername(event) {
        this.setState({
            newUsername: event.target.value
        })
    }

    handleNewPassword(event) {
        this.setState({
            newPassword: event.target.value
        })
    }

    handleUsername(event) {
        this.setState({
            userInput: event.target.value,
            username: event.target.value
        })
    }

    handlePassword(event) {
        this.setState({
            passInput: event.target.value,
            password: event.target.value
        })
    }




    render() {



        return (
            <div id="background">

                <nav className="navbar sticky-top mynav">
                    <h1 id="navTitle">Perryville Persevere Class Message Board</h1>
                </nav>




                <h2 id="title" className="text-center card notSection highlight">Welcome!</h2>


                <div className="notSection card accountSection">
                    <h3 id="subTitle" className="text-center highlight">Please sign in or create an account</h3>

                    <div className="d-flex align-content-center">

                        <div id="createAccount" className="flex-fill  homePageBox card">

                            <h4 className="sectionTitle">Create Account</h4>

                            <form onSubmit={this.handleCreate}>

                                <p className="label">Username: </p>

                                <input type="text"
                                    className="homeInput"
                                    value={this.state.newUsername}
                                    onChange={this.handleNewUsername} />

                                <p className="label">Password: </p>

                                <input type="password"
                                className="homeInput"
                                    value={this.state.newPassword}
                                    onChange={this.handleNewPassword} />


                                <br />

                                <button type="submit"
                                    className="btn homePageButton"><span className="text-white">Submit</span></button>

                            </form>

                        </div>

                        <div id="loginAccount" className="flex-fill homePageBox card">

                            <h4 className="sectionTitle">Account Login</h4>

                   
                            <form >
                                <p className="label">Username: </p>

                                <input type="text"
                                className="homeInput"
                                    required
                                    value={this.state.userInput}
                                    onChange={this.handleUsername} />

                                <p className="label">Password: </p>

                                <input type="password"
                                className="homeInput"
                                    required
                                    value={this.state.passInput}
                                    onChange={this.handlePassword} />

                                <br />


                                {this.handleDirect()}


                              





                            </form>
                        </div>
                    </div>
                </div>

                
                <div id="intro" className="card section">

                    <h3 className="subTitles">Mission</h3>
                    <p className="loremText">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Quia veniam, ut nobis perferendis facere reprehenderit.
                        In iure repudiandae vel non praesentium iste rem,
                        ipsum magni laboriosam officia possimus quod amet aperiam
                        aliquid quam ratione culpa,
                        sit delectus ad reprehenderit at ut eius.
                        Necessitatibus vel facilis consequatur.
                            Suscipit architecto assumenda adipisci.</p>
                    <h3 className="subTitles">How It Works</h3>
                    <p className="loremText">Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                        Excepturi dolore quis repellendus voluptatibus eligendi,
                        provident ut temporibus iste accusantium sapiente voluptatum?
                        Officiis placeat sunt pariatur nam architecto,
                        delectus beatae impedit repellendus doloribus fugit molestias voluptate,
                        porro deleniti, aperiam laboriosam saepe non esse.
                        Ut voluptas pariatur delectus, aspernatur impedit debitis inventore dolore,
                        voluptates cupiditate accusamus temporibus consequatur totam?
                        Iure quaerat debitis dolores voluptates aperiam.

                       </p>
                </div>
               
                <footer className="card section footer">

                        <p className="footerText text-left">Capstone Project</p>
                        <p className="footerText text-left">Developed by Jessica Dickerson</p>
                        
                       
                  


                </footer>


            </div>

        );
    }
}