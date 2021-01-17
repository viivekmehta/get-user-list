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
            this.setState({ users: data });
            this.setState({ userID: (data[(data.length) - 1])["UserId"] + 1});
        })
        .catch(console.log)
    }

    componentDidMount() {
       this.getUsers();
    }

    async createUser() {
        var emailID = this.state.email;

        if (typeof emailID !== "undefined") {
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(emailID)) {
              alert("Please enter valid email address.");
              return;
            }   
        }

        let newUser = {
                        "UserId": parseFloat(this.state.userID),
                        "Firstname": this.state.firstName,
                        "Lastname": this.state.lastName,
                        "Email": this.state.email,
                        "Address": {
                            "AddressLine1":this.state.addressLine1,
                            "AddressLine2":this.state.addressLine2,
                            "City": this.state.city,
                            "State": this.state.state,
                            "PinCode": this.state.pinCode
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
                <br/><br/><center>
                <div>
                        <br/>
                        <input value={this.state.userID} readOnly= {true} style={{backgroundColor: 'LightGray'}}/><br/><br/>
                        <input onChange={(event) => {this.setState({firstName: event.target.value})}} placeholder="First Name" /><br/><br/>
                        <input onChange={(event) => {this.setState({lastName: event.target.value})}} placeholder="Last Name" /><br/><br/>
                        <input onChange={(event) => {this.setState({email: event.target.value})}} placeholder="Email" /><br/><br/>
                        <input onChange={(event) => {this.setState({addressLine1: event.target.value})}} placeholder="Address Line 1" /><br/><br/>
                        <input onChange={(event) => {this.setState({addressLine2: event.target.value})}} placeholder="Address Line 2" /><br/><br/>
                        <input onChange={(event) => {this.setState({city: event.target.value})}} placeholder="City" /><br/><br/>
                        <input onChange={(event) => {this.setState({state: event.target.value})}} placeholder="State" /><br/><br/>
                        <input onChange={(event) => {this.setState({pinCode: event.target.value})}} placeholder="Pin Code" /><br/><br/><br/><br/>
                        <pre><Link to="/Home"><input type="button" value="     Home     "/>  </Link><button  onClick={()=>{this.createUser()}}> Create User </button></pre>
                    
                </div></center>
                <br/><br/>
            </div>
        );
    }
}
export default Create;