import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Update extends Component {
  
    constructor() {
        super();
        this.getUsers = this.getUsers.bind(this);
        this.updateUser = this.updateUser.bind(this);
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
        this.setState({userID: this.props.match.params.id});
        this.setState({firstName: this.props.match.params.firstName});
        this.setState({lastName: this.props.match.params.lastName});
        this.setState({email: this.props.match.params.email});
        this.setState({address: this.props.match.params.address});
    }

    async updateUser() {
        let userId = this.state.userID;
        let firstName = this.state.firstName;
        let lastName = this.state.lastName;
        let email = this.state.email;
        let address = this.state.address;
        let newUsersObject = (this.state.users);
        newUsersObject.map(function(item, index){
            if(item.UserId == userId) {
                item.UserId = userId;
                item.Firstname = firstName;
                item.Lastname = lastName;
                item.Email = email;
                item["Address"] = {};
                item["Address"]["City"] = address;
             }
        });
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
            alert("User has been Updated!");
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
                <div>
                        <br/>
                        <input onChange={(event) => {this.setState({userID: event.target.value})}} placeholder={this.props.match.params.id} /><br/><br/>
                        <input onChange={(event) => {this.setState({firstName: event.target.value})}} placeholder={this.props.match.params.firstName} /><br/><br/>
                        <input onChange={(event) => {this.setState({lastName: event.target.value})}} placeholder={this.props.match.params.lastName} /><br/><br/>
                        <input onChange={(event) => {this.setState({email: event.target.value})}} placeholder={this.props.match.params.email} /><br/><br/>
                        <input onChange={(event) => {this.setState({address: event.target.value})}} placeholder={this.props.match.params.address} /><br/><br/><br/><br/>
                        <pre><Link to="/Home"><input type="button" value="     Home     "/>  </Link><button  onClick={()=>{this.updateUser()}}> Update User </button></pre>
                    
                </div></center>
                <br/><br/>
            </div>
        );
    }
}
export default Update;