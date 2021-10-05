//////////////////////////////
// Author(s): Nicholas
// Date Made: 26/09/2021
//////////////////////////////
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './EditInfo.css'; 
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import useToken from '../App/useToken';
import { IconButton, AppBar, Toolbar } from '@material-ui/core';

const jwt = require('jsonwebtoken');
const config = require('../Configuration/config.json');
const API_URL =  config.API_URL; 

async function editInformation(information) {
    return fetch(API_URL + "edit_information/", {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(information)
    })
    .then(data => data.json())
}

async function editPassword(password) {
    return fetch(API_URL + "edit_password/", {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(password)
    })
    .then(data => data.json())
}

export default function EditInfo() {
    const cancel = async (e) => {
        e.preventDefault();
        window.location.href = '/';
    }

    const { token, getToken, setToken } = useToken();
    const decode = jwt.decode(token);

    var [username, setUsername] = useState();
    var [firstName, setFirstName] = useState();
    var [familyName, setFamilyName] = useState();
    var [email, setEmail] = useState();
    var [oldPw, setOldPw] = useState();
    var [newPw, setNewPw] = useState();
    var [confirmPw, setConfirmPw] = useState();

    const oldUsername = decode.username;
    
    const submitInformation = async (e) => {
        e.preventDefault();
        const res = await editInformation({
            oldUsername,
            username,
            firstName,
            familyName,
            email
        })
        if (res.token) {
            setToken(res);
        }
    }

    const submitPassword = async (e) => {
        e.preventDefault();
        const usernamePw = jwt.decode(token).username;
        const res = await editPassword({
            usernamePw,
            oldPw,
            newPw,
            confirmPw
        })
    }

    return(
        <section className="editInfo-wrapper">
            <section className="topBar">
                <AppBar position="Fixed" color="white" boxShadow={4}>
                    <
                        img class="header"
                        src="/logo.png"
                        alt="logo"
                        width="207"
                        height="55"
                        style={{ alignSelf: "center" }}
                    />
                </AppBar>
            </section>
            
            <section className="editInfo">
                <section className="editInfo-header">
                    <h2>Edit Information</h2>
                </section>
                
                <Button
                    type="cancel"
                    variant="contained"
                    color="secondary"
                    style={{minWidth: "85px", minHeight:"35px"}}
                    onClick={cancel}>
                    Cancel
                </Button>
                <form onSubmit={submitInformation}>
                    <br/>
                    <br/>
                    <section className="information">
                        <TextField
                            required
                            id="username"
                            label="Username"
                            defaultValue={decode.username}
                            variant="outlined"
                            color="secondary"
                            height="56px"
                            width="232px"
                            onChange={e => setUsername(e.target.value)}
                        />
                        <br/>
                        <br/>
                    
                        <TextField
                            required
                            id="firstName"
                            label="First Name"
                            defaultValue={decode.firstName}
                            variant="outlined"
                            color="secondary"
                            height="56px"
                            width="232px"
                            onChange={e => setFirstName(e.target.value)}
                        />
                        <br/>
                        <br/>
                    
                        <TextField
                            required
                            id="familyName"
                            label="Family Name"
                            defaultValue={decode.familyName}
                            variant="outlined"
                            color="secondary"
                            height="56px"
                            width="232px"
                            onChange={e => setFamilyName(e.target.value)}
                        />
                        <br/>
                        <br/>
                        <TextField
                            required
                            id="email"
                            label="Email"
                            defaultValue={decode.email}
                            variant="outlined"
                            color="secondary"
                            height="56px"
                            width="232px"
                            onChange={e => setEmail(e.target.value)}
                        />
                        <br/>
                        <br/>
                    </section>
                    <section className="saveChanges">
                        <Button
                            type="save"
                            variant="contained"
                            color="secondary"
                            style={{minWidth: "85px", minHeight:"35px"}}>
                            Save changes
                        </Button>
                    </section>
                </form>
            </section>
            
            <section className="editPw">
            <form onSubmit={submitPassword}>
                <section className="editPw-header">
                    <h1>Edit Password</h1>
                </section>
                <section className="password">
                    <TextField
                        required
                        id="oldpw"
                        label="Old Password"
                        type="oldPw"
                        placeholder="At least 8 characters..."
                        variant="outlined"
                        color="secondary"
                        height="56px"
                        width="232px"
                        onChange={e => setOldPw(e.target.value)}
                    />
                    <br/>
                    <br/>
                    <TextField
                        required
                        id="newpw"
                        label="New Password"
                        type="newPw"
                        placeholder="At least 8 characters..."
                        variant="outlined"
                        color="secondary"
                        height="56px"
                        width="232px"
                        onChange={e => setNewPw(e.target.value)}
                    />
                    <br/>
                    <br/>
                    <TextField
                        required
                        id="confirmPw"
                        label="Confirm New Password"
                        type="confirmPw"
                        placeholder="At least 8 characters..."
                        variant="outlined"
                        color="secondary"
                        height="56px"
                        width="232px"
                        onChange={e => setConfirmPw(e.target.value)}
                    />
                    <br/>
                    <br/>
                </section>
                <section className="changePassword">
                        <Button
                            type="save"
                            variant="contained"
                            color="secondary"
                            style={{minWidth: "85px", minHeight:"35px"}}>
                            Change Password
                        </Button>
                    </section> 
                </form>
            </section>
        </section>
        )
}

EditInfo.propTypes = {
    setToken: PropTypes.func.isRequired
};