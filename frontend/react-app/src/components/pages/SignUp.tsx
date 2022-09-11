import React, { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import Cookies from "js-cookie"
import { TextField, Card, CardContent, CardHeader, Button} from "@mui/material"
// import { AuthContext } from "App"
import AlertMessage from "../../components/utils/AlertMessage"
import { signUp } from "../../lib/api/auth"
import { SignUpParams } from "../../interface"

const SignUp: React.FC = () => {
  const navigate = useNavigate()
  // const { setIsSignedIn, setCurrentUser } = useContext(AuthContext)
  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("")
  const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false)

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
  }

  return(
    <>
      <form noValidate autoComplete="off">
        <Card sx={{ padding: 2, maxWidth: 400}}>
          <CardHeader sx={{ textAlign: "center" }} title="Sign Up"/>
          <CardContent>
            <TextField
              variant="outlined"
              required
              fullWidth
              label="Name"
              value={name}
              margin="dense"
              onChange={event => setName(event.target.value)}
            />
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
              value={password}
              margin="dense"
              autoComplete="current-password"
              onChange={event => setPassword(event.target.value)}
            />
            <TextField
              variant="outlined"
              required
              fullWidth
              label="Password Confirmation"
              type="password"
              value={passwordConfirmation}
              margin="dense"
              autoComplete="current-password"
              onChange={event => setPasswordConfirmation(event.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              color="inherit"
              disabled={!name || !email || !password || !passwordConfirmation}
              onClick={handleSubmit}
              sx={{ marginTop: 2 , flexGrow: 1, textTransform: "none"}}
            >
              Submit
            </Button>
          </CardContent>
        </Card>
      </form>
      <AlertMessage
        open={alertMessageOpen}
        setOpen={setAlertMessageOpen}
        severity="error"
        message="Invalid email and password"
      />
    </>
  )
}

export default SignUp