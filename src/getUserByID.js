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
                <div align="center">
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
                                        <th> <center> User ID </center></th>
                                        <th> <center> First Name </center></th>
                                        <th> <center>Last Name </center></th>
                                        <th> <center> Email </center></th>
                                        <th><center>
                                            <tr>
                                                <td colSpan="5"> Address </td>
                                            </tr>
                                            <tr>
                                                <td> Line 1 </td>
                                                <td> Line 2 </td>
                                                <td> City </td>
                                                <td> State </td>
                                                <td> Pin Code </td>
                                            </tr>
                                        </center></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.userByID.map((item, index) => 
                                            <tr>
                                                <td><center> {item.UserId} </center></td>
                                                <td><center> {item.Firstname} </center></td>
                                                <td><center> {item.Lastname} </center></td>
                                                <td><center> {item.Email} </center></td>
                                                <td><center>
                                                    <tr>
                                                        <td> {item.Address.AddressLine1} </td>
                                                        <td> {item.Address.AddressLine2} </td>
                                                        <td> {item.Address.City} </td>
                                                        <td> {item.Address.State} </td>
                                                        <td> {item.Address.PinCode} </td>
                                                    </tr>
                                                </center></td>
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