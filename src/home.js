import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table'
import "react-table/react-table.css";
import './App.css';
class Home extends Component {
    
    constructor() {
        super();
        this.getUsers = this.getUsers.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.state = {
            users: [],
            selectedUserID: 0
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

    async deleteUser(userID) {
        let newUsersArray = [];
        let usersArray = (this.state.users);
        usersArray.map(function(item, index){
            if(item.UserId != userID) {
                newUsersArray.push(item);
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
                body: JSON.stringify(newUsersArray)
            });
            alert("User has been deleted!");
            this.getUsers();
        } catch(e) {
            console.log(e);
        }
    }


    render() {
        let users = this.state.users;
        return (
            <div>
                <br/>
                <div align="center">
                    <Link to="/Create"> <input type="button" value="Create User"/></Link>
                    <Link to="/GetUserByID"> <input type="button" value="Get User By ID"/></Link>
                </div>
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
                                                <td> Line 1 </td>
                                                <td> Line 2 </td>
                                                <td> City </td>
                                                <td> State </td>
                                                <td> Pin Code </td>
                                            </tr>
                                        </center></th>
                                        <th><center> Action </center></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.users.map((item, index) => 
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
                                                <td><center>
                                                    <Link to={"/Update/"+item.UserId+"/"+item.Firstname+"/"+item.Lastname+"/"+item.Email+"/"+item.Address.AddressLine1+"/"+item.Address.AddressLine2+"/"+item.Address.City+"/"+item.Address.State+"/"+item.Address.PinCode}> <input type="button" value="Update"/>  </Link>
                                                    <input type="button" value="Delete" onClick={()=>{this.deleteUser(item.UserId)}}/> 
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
export default Home;
