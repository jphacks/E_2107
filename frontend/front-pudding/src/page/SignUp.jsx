// react
import * as React from "react";
import { useHistory } from "react-router-dom";

// mui
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

// firebase
import { auth } from "../config/firebase";
import { db } from "../config/firebase";

const theme = createTheme();

export default function SignUp() {
  const history = useHistory();
  const handleSubmit = (event) => {
    event.preventDefault();
    const { email, password, name } = event.target.elements;
    try {
      auth.createUserWithEmailAndPassword(email.value, password.value);
      auth.onAuthStateChanged((user) => {
        if (user) {
          const uid = user.uid
          const userInitialData = {
            born: "",
            job: "",
            hobby: "",
            dream: "",
            name: name.value,
            talent: "",
            favorite_food: "",
            uid: uid,
          };
          db.collection("users")
            .doc(uid)
            .set(userInitialData)
            .then(async () => {
              history.push("/" + uid + "/home");
            });
        }
      });
    } catch (error) {
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5" sx={{ fontSize: 38 }}>
            Sign upしてはじめる！
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 5 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="氏名"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="メールアドレス"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="パスワード"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            {/* 登録ボタン */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              {/* 遷移 */}
              <Grid item>
                <Button onClick={() => history.push("/signin")} variant="contained">
                  {"Sign in"}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
