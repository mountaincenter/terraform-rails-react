import React, { useState, useContext } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Card, CardHeader, CardContent, TextField, Button, Box, Typography } from "@mui/material"
import Cookies from "js-cookie"
import AlertMessage from "../utils/AlertMessage"
import { SignInParams } from "../../interface"
import { signIn } from "../../lib/api/auth"


const SignIn: React.FC = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false)

  const handleSubmit = async(e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
  }

  const handleEasySubmit = async(e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
  }

  return (
    <>
      <form noValidate autoComplete="off">
        <Card sx={{ padding: 2, maxWidth: 400 }}>
          <CardHeader sx={{ textAlign: "center" }} title="Sign In" />
          <CardContent>
            <TextField
              variant="outlined"
              required
              fullWidth
              label="Email"
              value={email}
              margin="dense"
              onChange={event => setEmail(event.target.value)}
            />
            <TextField
              variant="outlined"
              required
              fullWidth
              label="Password"
              type="password"
              placeholder="At least 6 characters"
              value={password}
              margin="dense"
              autoComplete="current-password"
              onChange={event => setPassword(event.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              color="inherit"
              disabled={!email || !password ? true : false}
              sx={{ marginTop: 2, flexGrow: 1, textTransform: "none"}}
              onClick={handleSubmit}
            >
              ログイン
            </Button>
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              color="inherit"
              sx={{ marginTop: 2, flexGrow: 1, textTransform: "none"}}
              onClick={handleEasySubmit}
            >
              簡単ログイン
            </Button>
            <Box textAlign="center" sx={{ marginTop: "2rem"}}>
              <Typography variant="body2">
                Don't have an account? &nbsp;
                <Link to="/signup" style={{ textDecoration: "none" }}>
                  Sign Up now!
                </Link>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </form>
      <AlertMessage
        open={alertMessageOpen}
        setOpen={setAlertMessageOpen}
        severity="error"
        message="Invalid email or password"
      />
    </>
  )
}

export default SignIn