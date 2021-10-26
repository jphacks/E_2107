import React from 'react';
import axios from 'axios'
import { Redirect } from 'react-router-dom';
import { withCookies } from 'react-cookie';
import { API_BASE_URL } from '../api';

const LoggedIn = (props) => {

  // tokenが有効であるか確認
  if (props.cookies.get('user-token')) {

    let form_data = new FormData();
    form_data.append('token', props.cookies.get('user-token'));

    axios.post(`${API_BASE_URL}/token_verify/`, form_data,{
      headers: {
        'content-type': 'multipart/form-data'
      },
    })
    .catch( error => {
      alert('再度ログインを行なってください');
      props.cookies.remove('user-token')
      window.location.href = "/auth";
    });

    return props.children;

  } else {
    return <Redirect to={'/auth'} />
  }
}

export default withCookies(LoggedIn);