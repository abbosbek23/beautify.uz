/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-mixed-spaces-and-tabs */
import { FunctionComponent, useState } from "react";
import logo from "../assets/logo.png";
import "./navbar.css";
import { Box } from "@mui/system";
import Button from '@mui/material/Button';
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import userimg from '.././assets/user.png'
import like from '.././assets/LikeNavbar.svg'
import bookmark from '.././assets/BookmarkNavbar.svg'
interface NavbarProps {
  // onSearch: (value: string) => void;
  // onLanguage: (value: string) => void;
}

const Navbar: FunctionComponent<NavbarProps> = () => {
  // const [searchQuery, setSearchQuery] = useState("");
  
  const navigate = useNavigate()
  const user = localStorage.getItem("access")
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.clear();
};

  return (
    <>
    {window.location.pathname.split("/")[1] === "login" || window.location.pathname.split("/")[1] === "register" || window.location.pathname.split("/")[1] === "forgotpassword" || window.location.pathname.split("/")[1] === "auth" || window.location.pathname.split("/")[1] === "register2step" || window.location.pathname.split("/")[1] === "verificationemail" ?<Box></Box>:<> <Box
        sx={{ display: "flex", justifyContent: "space-between", alignItems:"center" }}
        width="100%"
        height={100}
        padding={"20px 34px"}
      >
        <Box sx={{marginLeft:"0px"}} >
        <img width="128px" height="28px" style={{cursor:"pointer"}} onClick={()=>navigate("/")} src={logo} alt="logo" />
        </Box>
        <Box  sx={{display:'flex',marginLeft:"10%",width:"50%"}}>
        <form action="" style={{ width: "100%", height: "48px", borderRadius: "100px", border: "1px solid #B5B5B5",alignItems:"center",padding:"3px" }}>
    <IconButton type="submit" sx={{ marginLeft: "10px", marginTop: "0px" }} aria-label="search">
        <SearchIcon style={{ fill: "blue" }} />
    </IconButton>
    <input placeholder="Search the location or master..." type="text" style={{ width: "85%", fontSize: "18px", marginLeft: "4px",padding:"11px 10px 0 4px",  border: "0px solid white", borderRadius: "100px", outline: "none" }} />
</form>
        </Box>
        <Box >
          {user ? <Box>
            <Button
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{':hover': {
          bgcolor: 'white', // theme.palette.primary.main
        },}}
      >
       <img src={like} width={30} height={30} />
      </Button>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{':hover': {
          bgcolor: 'white', // theme.palette.primary.main
        },}}
      >
       <img src={bookmark} width={30} height={30} />
      </Button>
             <Button
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{':hover': {
          bgcolor: 'white', // theme.palette.primary.main
        },}}
      >
       <img src={userimg} width={30} height={30} />
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        sx={{top:"50px"}}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={() => { handleLogout(); handleClose(); }}>Logout</MenuItem>
      </Menu>
      
      </Box>:<Button sx={{fontSize:"15px",padding:"12px 34px",borderRadius:"12px",backgroundColor:"#E2A882",color:"white","&:hover": {
         backgroundColor:"#E2A882"
    }}} variant="contained" onClick={()=>navigate("/login")}>Login</Button>}
        </Box>
      </Box>
	  <span style={{width:"100%",height:".5px",display:"block",backgroundColor:"#B5B5B5"}}></span>
    </>
    }
    </>
  );
};

export default Navbar;
