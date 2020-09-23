

import React, { useState, useEffect, useContext } from 'react';
import Header from './Header';

import firebase from "firebase/app";
import SignIn from './auth/SignIn';
import { withFirestore, useFirestore } from 'react-redux-firebase';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { UserContext } from '../userContext';
import { MyContext } from "../context.js"

import { Jumbotron, Navbar, Nav, Col } from 'react-bootstrap';

import "bootstrap/dist/css/bootstrap.min.css";
import 'antd/dist/antd.css';

import S3 from 'react-aws-s3';



const theme = {
  font: 'Courier',
  primary: '#0a192f',
  secondary: '#303C55',
  light: '#ccd6f6',
  white: '#e6f1ff',

};

const Upload = (props) => {
  const firestore = useFirestore();
  const [value, setValue] = useState(UserContext);


  const context = useContext(MyContext);
  const [user, setUser] = useState(null);
  const auth = firebase.auth();


  const config = {
    bucketName: process.env.AWS_BUCKET_NAME,
    dirName: 'pre-effect', /* optional */
    region: 'eu-west-1',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  }


  const [deleteBool, setDeleteBool] = useState(false);


  const uploadFiles = () => {

  }


  useEffect(() => {
    console.log(context.state.user)
    setUser(auth.currentUser)
    if (auth.currentUser) {
      setValue(auth.currentUser);
    }

  }, [context.state.user])

  return (
    <React.Fragment>


      {user ? <div>
        <form onSubmit={uploadFiles()}>
          <div><h2>Upload images</h2></div>
          <h3>Images</h3>
          <input type="file" multiple />
          <label for="amazon">Amazon<input name="amazon" type="checkbox" value="amazon" /></label>
          <label for="shopify">Shopify<input name="shopify" type="checkbox" value="shopify" /></label>

          <button type="submit">Submit</button>
        </form>


      </div> :
        ""
      }
      {console.log("screech")}
    </React.Fragment>
  );
}

export default withFirestore(Upload);