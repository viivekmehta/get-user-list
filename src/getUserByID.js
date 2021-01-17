import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import './App.css';
class GetUserByID extends Component {
    
    constructor() {
        super();
        this.getUsers = this.getUsers.bind(this);
        this.getUserByID = this.getUserByID.bind(this);
        this.state = {
            users: [],
            userByID: [],
            userID: 0
        }
    }

    componentDidMount() {
        this.getUsers();
    }

    getUsers() {
        fetch('https://jsonblob.com/api/jsonBlob/897df7ce-5692-11eb-9d92-b1d70edc9777')
        .then(res => res.json())
        .then((data) => {
            this.setState({ users: data })
        })
        .catch(console.log)
    }

    getUserByID() {
        
        let newUsersArray = [];
        let userID = this.state.userID;
       
        let usersArray = (this.state.users);
        usersArray.map(function(item, index){
            if(item.UserId == userID) {
                newUsersArray.push(item);
             }
        });
        this.setState({userByID: newUsersArray});
        this.getUsers();
    }


    render() {
        let users = this.state.userByID;
        return (
            <div>
                <br/>
                <div align="left">
                    <Link to="/Home"> <input type="button" value="Home"/></Link> 
                    <Link to="/Create"> <input type="button" value="Create User"/></Link>
                    <Link to="/Home"> <input type="button" value="Show All Users"/></Link>
                </div>
                <br/><br/>
                <center>
                <div>
                        <br/>
                        <input onChange={(event) => {this.setState({userID: event.target.value})}} placeholder="User ID" /><br/><br/>
                        <button onClick={()=>{this.getUserByID()}}>Get User</button><br/><br/>
                    
                </div>
                </center>
                <br/><br/>
                <div>
                    <center>
                        <div>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th> User ID </th>
                                        <th> First Name </th>
                                        <th> Last Name </th>
                                        <th> Email </th>
                                        <th> Address </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.userByID.map((item, index) => 
                                            <tr>
                                                <td> {item.UserId} </td>
                                                <td> {item.Firstname} </td>
                                                <td> {item.Lastname} </td>
                                                <td> {item.Email} </td>
                                                <td> {item.Address.City} </td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </Table>
                        </div>
                    </center>
                </div>
            </div >
        );
    }
}
export default GetUserByID;