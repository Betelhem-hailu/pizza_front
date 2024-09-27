import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import { Notifications, AccountCircle } from "@mui/icons-material";

const Header = () => {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "white",
        color: "black",
        height: "67px",
        boxShadow: "7px 0px 15px 0px #0000000D"
      }}
    >
      <Toolbar>
        <Typography variant="h6" sx={{ color: "black" }}>
          Role
        </Typography>
        <div style={{ flexGrow: 1 }}></div>
        <IconButton sx={{ color: "black" }}>
          {" "}
          <Notifications />
        </IconButton>
        <IconButton sx={{ color: "black" }}>
          {" "}
          <AccountCircle />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
