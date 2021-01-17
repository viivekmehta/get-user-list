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
            addressLine1: "",
            addressLine2: "",
            city: "",
            state: "",
            pinCode: ""
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
        this.setState({addressLine1: this.props.match.params.addressLine1});
        this.setState({addressLine2: this.props.match.params.addressLine2});
        this.setState({city: this.props.match.params.city});
        this.setState({state: this.props.match.params.state});
        this.setState({pinCode: this.props.match.params.pinCode});
    }

    async updateUser() {
        let userId = this.state.userID;
        let firstName = this.state.firstName;
        let lastName = this.state.lastName;
        let email = this.state.email;
        let addressLine1 = this.state.addressLine1;
        let addressLine2 = this.state.addressLine2;
        let city = this.state.city;
        let state = this.state.state;
        let pinCode = this.state.pinCode;
        let newUsersObject = (this.state.users);

        if (typeof email !== "undefined") {
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(email)) {
              alert("Please enter valid email address.");
              return;
            }   
        }
        newUsersObject.map(function(item, index){
            if(item.UserId == userId) {
                item.UserId = parseFloat(userId);
                item.Firstname = firstName;
                item.Lastname = lastName;
                item.Email = email;
                item["Address"] = {};
                item["Address"]["AddressLine1"] = addressLine1;
                item["Address"]["AddressLine2"] = addressLine2;
                item["Address"]["City"] = city;
                item["Address"]["State"] = state;
                item["Address"]["PinCode"] = pinCode;
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
                        <input value={this.state.userID} readOnly= {true} style={{backgroundColor: 'LightGray'}}/><br/><br/>
                        <input onChange={(event) => {this.setState({firstName: event.target.value})}} placeholder={this.props.match.params.firstName} /><br/><br/>
                        <input onChange={(event) => {this.setState({lastName: event.target.value})}} placeholder={this.props.match.params.lastName} /><br/><br/>
                        <input onChange={(event) => {this.setState({email: event.target.value})}} placeholder={this.props.match.params.email} /><br/><br/>
                        <input onChange={(event) => {this.setState({addressLine1: event.target.value})}} placeholder={this.props.match.params.addressLine1} /><br/><br/>
                        <input onChange={(event) => {this.setState({addressLine2: event.target.value})}} placeholder={this.props.match.params.addressLine2} /><br/><br/>
                        <input onChange={(event) => {this.setState({city: event.target.value})}} placeholder={this.props.match.params.city} /><br/><br/>
                        <input onChange={(event) => {this.setState({state: event.target.value})}} placeholder={this.props.match.params.state} /><br/><br/>
                        <input onChange={(event) => {this.setState({pinCode: event.target.value})}} placeholder={this.props.match.params.pinCode} /><br/><br/><br/><br/>
                        <pre><Link to="/Home"><input type="button" value="     Home     "/>  </Link><button  onClick={()=>{this.updateUser()}}> Update User </button></pre>
                    
                </div></center>
                <br/><br/>
            </div>
        );
    }
}
export default Update;