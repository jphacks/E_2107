import React, { useReducer, useEffect, useState } from "react";

// firebase
import { useAuth } from "../contexts/AuthContext";

// mui
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

//state type
type State = {
  email: string,
  password: string,
  passwordconfirm: string,
  isButtonDisabled: boolean,
  helperText: string,
  isError: boolean
};

const initialState: State = {
  email: "",
  password: "",
  passwordconfirm: "",
  isButtonDisabled: true,
  helperText: "",
  isError: false
};

type Action =
| { type: "setEmail", payload: string }
| { type: "setPassword", payload: string }
| { type: "setPasswordConfirm", payload: string }
| { type: "setIsButtonDisabled", payload: boolean }
| { type: "signupSuccess", payload: string }
| { type: "signupFailed", payload: string }
| { type: "setIsError", payload: boolean };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "setEmail":
      return {
        ...state,
        email: action.payload
      };
    case "setPassword":
      return {
        ...state,
        password: action.payload
      };
    case "setPasswordConfirm":
      return {
        ...state,
        passwordconfirm: action.payload
      };
    case "setIsButtonDisabled":
      return {
        ...state,
        isButtonDisabled: action.payload
      };
    case "signupSuccess":
      return {
        ...state,
        helperText: action.payload,
        isError: false
      };
    case "signupFailed":
      return {
        ...state,
        helperText: action.payload,
        isError: true
      };
    case "setIsError":
      return {
        ...state,
        isError: action.payload
      };
    default:
      return state;
  }
};

export default function SignUp() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (
      state.email.trim() &&
      state.password.trim() &&
      state.passwordconfirm.trim()
    ) {
      dispatch({
        type: "setIsButtonDisabled",
        payload: false
      });
    } else {
      dispatch({
        type: "setIsButtonDisabled",
        payload: true
      });
    }
  }, [state.email, state.password, state.passwordconfirm]);

  async function handleSignup(event:any) {
    event.preventDefault();
    try {
      setError("");
      setSuccessMessage("");
      //sing up ボタンの無効化
      dispatch({
        type: "setIsButtonDisabled",
        payload: true
      });
      await signup(state.email, state.passwordconfirm);
      dispatch({
        type: "signupSuccess",
        payload: "Signup Successfully"
      });
      //sing up ボタンの有効化
      dispatch({
        type: "setIsButtonDisabled",
        payload: false
      });
      setSuccessMessage("アカウントの作成に成功しました");
    } catch (e:any) {
      console.log(e);
      //エラーのメッセージの表示
      switch (e.code) {
        case "auth/network-request-failed":
          setError(
            "通信がエラーになったのか、またはタイムアウトになりました。通信環境がいい所で再度やり直してください。"
          );
          break;
        case "auth/weak-password": //バリデーションでいかないようにする
          setError("パスワードが短すぎます。6文字以上を入力してください。");
          break;
        case "auth/invalid-email": //バリデーションでいかないようにする
          setError("メールアドレスが正しくありません");
          break;
        case "auth/email-already-in-use":
          setError(
            "メールアドレスがすでに使用されています。ログインするか別のメールアドレスで作成してください"
          );
          break;
        case "auth/user-disabled":
          setError("入力されたメールアドレスは無効（BAN）になっています。");
          break;
        default:
          //想定外
          setError(
            "アカウントの作成に失敗しました。通信環境がいい所で再度やり直してください。"
          );
      }
      //sing up ボタンの有効化
      dispatch({
        type: "setIsButtonDisabled",
        payload: false
      });
    }
  }

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.keyCode === 13 || event.which === 13) {
      state.isButtonDisabled || handleSignup(event);
    }
  };

  const handleEmailChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    dispatch({
      type: "setEmail",
      payload: event.target.value
    });
  };

  const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    dispatch({
      type: "setPassword",
      payload: event.target.value
    });
  };

  const handlePasswordConfirmChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    dispatch({
      type: "setPasswordConfirm",
      payload: event.target.value
    });
  };

  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   // eslint-disable-next-line no-console
  //   console.log({
  //     email: data.get('email'),
  //     password: data.get('password'),
  //   });
  // };



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
          <Typography component="h1" variant="h5" sx={{fontSize: 38}}>
            Sign upしてはじめる！
          </Typography>
          {/* {error && <Box variant="danger"　sx={{}}>{error}</Box>}
          {successMessage && <Box variant="danger" sx={{}}>{successMessage}</Box>} */}
          <Box component="form" noValidate sx={{ mt: 5 }}>
            <Grid container spacing={2}>
              {/* <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="氏名"
                  autoFocus
                />
              </Grid> */}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="メールアドレス"
                  name="email"
                  autoComplete="email"
                  onChange={handleEmailChange}
                  onKeyPress={handleKeyPress}
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
                  helperText={state.helperText}
                  onChange={handlePasswordChange}
                  onKeyPress={handleKeyPress}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={state.isError}
                  fullWidth
                  id="password-confirm"
                  type="password"
                  label="Password-confirm"
                  placeholder="Password-confirm"
                  margin="normal"
                  helperText={state.helperText}
                  onChange={handlePasswordConfirmChange}
                  onKeyPress={handleKeyPress}
                />
              </Grid>
            </Grid>
            {/* 登録ボタン */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSignup}
              disabled={state.isButtonDisabled}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              {/* 遷移 */}
              <Grid item>
                <Link href="/signin" variant="body2">
                  {"Sign in"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}