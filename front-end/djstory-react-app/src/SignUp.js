import React from "react";
import {
  Container,
  Button,
  TextField,
  Link,
  Grid,
  Typography,
} from "@material-ui/core";
import { call } from "./service/ApiService";

function signup(userDTO) {
  return call("/auth/signup", "POST", userDTO);
}

export function SignUp() {
  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const username = data.get("username");
    const email = data.get("email");
    const password = data.get("password");
    signup({ email: email, username: username, password: password }).then(
      (response) => {
        window.location.href = "/login";
      }
    );
  }
  return (
    <Container component="main" maxWidth="xs" style={{ marginTop: "8%" }}>
      <form noValidate onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography component="h1" variant="h5">
              계정생성
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              autoComplete="fname"
              name="username"
              variant="outlined"
              required
              fullWidth
              id="username"
              label="사용자 이름"
              autoFocus
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="email"
              name="email"
              label="email"
              autoComplete="email"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              type="password"
              id="password"
              name="password"
              label="password"
              autoComplete="off"
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" fullWidth variant="contained" color="primary">
              계정생성
            </Button>
          </Grid>
        </Grid>
        <Grid container justifyContent="center" style={{ margin: "2%" }}>
          <Grid item>
            <Link href="/login" variant="body2">
              이미 계정이 있습니까? 로그인 하세요.
            </Link>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}
