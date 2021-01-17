import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Create extends Component {

    constructor() {
        super();
        this.getUsers = this.getUsers.bind(this);
        this.createUser = this.createUser.bind(this);
        this.state = {
            users: [],
            userID: 0,
            firstName: "",
            lastName: "",
            email: "",
            address: "",
        }
    }

    getUsers() {
        fetch('https://jsonblob.com/api/jsonBlob/897df7ce-5692-11eb-9d92-b1d70edc9777')
        .then(res => res.json())
        .then((data) => {
            this.setState({ users: data })
        })
        .catch(console.log)
    }

    componentDidMount() {
       this.getUsers();
    }

    async createUser() {
        let newUser = {
                        "UserId": parseFloat(this.state.userID),
                        "Firstname": this.state.firstName,
                        "Lastname": this.state.lastName,
                        "Email": this.state.email,
                        "Address": {
                            "City": this.state.address
                        }
                    };
        let newUsersObject = (this.state.users).concat(newUser);
        console.log(newUsersObject);
        try{
            let response = await fetch('https://jsonblob.com/api/jsonBlob/897df7ce-5692-11eb-9d92-b1d70edc9777', {
                method: 'put',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUsersObject)
            });
            alert("User has been Created!");
        } catch(e) {
            console.log(e);
        }
    }


    render() {
        return (
            <div>
                <br/>
                <div align="left">
                    
                </div>
                <br/><br/><center>
                <div style={{border: '3px solid black', width: '20%'}}>
                        <br/>
                        <input onChange={(event) => {this.setState({userID: event.target.value})}} placeholder="User ID" /><br/><br/>
                        <input onChange={(event) => {this.setState({firstName: event.target.value})}} placeholder="First Name" /><br/><br/>
                        <input onChange={(event) => {this.setState({lastName: event.target.value})}} placeholder="Last Name" /><br/><br/>
                        <input onChange={(event) => {this.setState({email: event.target.value})}} placeholder="Email" /><br/><br/>
                        <input onChange={(event) => {this.setState({address: event.target.value})}} placeholder="Address" /><br/><br/><br/><br/>
                        <pre><Link to="/Home"><input type="button" value="     Home     "/>  </Link><button  onClick={()=>{this.createUser()}}> Create User </button></pre>
                    
                </div></center>
                <br/><br/>
            </div>
        );
    }
}
export default Create;