import React, { useState, useEffect, useRef } from 'react';


// 認証系インポート
// import { useCookies } from 'react-cookie';
// import { useForm } from "react-hook-form";
import  { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../store/useAuth';

// mui
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { auth } from "../config/firebase";


const theme = createTheme();


export default function SignIn() {

  const history = useHistory();
  const [error, setError] = React.useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    try{
      auth.signInWithEmailAndPassword(email.value, password.value);
    history.push('/');
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  return (

    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5" fontSize="38px">
          Sign In
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
            {/* フォーム */}
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="メールアドレス"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="パスワード"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {/* ログインボタン */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 3 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
              </Grid>
              <Grid item>
                {/* 遷移 */}
                <Button onClick={() => history.push("/signup")} variant="contained">
                  {"Sign up"}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}