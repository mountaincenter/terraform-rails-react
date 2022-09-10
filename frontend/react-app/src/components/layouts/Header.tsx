import React from "react"
import { useNavigate, Link } from "react-router-dom"
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton
} from "@mui/material"

const Header: React.FC = () => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography
            component={Link}
            to="/"
            variant="h6"
            sx={{ flexGrow: 1, textDecoration: "none", color:"inherit"}}
          >
            Blog
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Header