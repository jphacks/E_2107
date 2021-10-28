import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useAuthContext } from "../authContext";
import { auth } from "../config/firebase";
import { Link, useHistory } from "react-router-dom";
import { db } from "../config/firebase";

const theme = createTheme();

export default function SignUp() {
  const history = useHistory();
  const [error, setError] = React.useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    const { email, password, name } = event.target.elements;
    try {
      auth.createUserWithEmailAndPassword(email.value, password.value);
      auth.onAuthStateChanged((user) => {
        if (user) {
          const userInitialData = {
            born: "",
            job: "",
            hobby: "",
            dream: "",
            name: name.value,
            talent: "",
            favorite_food: "",
            uid: user.uid,
          };
          db.collection("users")
            .doc(user.uid)
            .set(userInitialData)
            .then(async () => {
              history.push("/");
            });
        }
      });
    } catch (error) {
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
