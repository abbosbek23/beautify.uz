/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-mixed-spaces-and-tabs */
import { FunctionComponent, useState } from "react";
import logo from "../assets/logo.svg";
import "./navbar.css";
import { Box } from "@mui/system";
import Button from '@mui/material/Button';
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import userimg from '.././assets/user.png'
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

  return (
    <>
    {window.location.pathname.split("/")[1] === "login" || window.location.pathname.split("/")[1] === "register" || window.location.pathname.split("/")[1] === "forgotpassword" ?<Box></Box>:<> <Box
        sx={{ display: "flex", justifyContent: "space-between", alignItems:"center" }}
        width="100%"
        height={100}
        
        padding={"20px 34px"}
      >
        <Box sx={{marginLeft:"0px"}} >
          <img width="178px" height="43px" style={{cursor:"pointer"}} onClick={()=>navigate("/")} src={logo} alt="logo" />
        </Box>
        <Box  sx={{display:'flex',marginLeft:"10%"}}>
			<form action="" style={{width:"600px",height:"48px",borderRadius: "100px",border:"1px solid #B5B5B5"}}>

		  <IconButton type="submit" sx={{marginLeft:"10px",marginTop:"0px"}} aria-label="search">
          <SearchIcon style={{ fill: "blue" }} />
          </IconButton>
          <input placeholder="Search the location or master..." type="text" style={{ width:"400px",fontSize:"18px",marginLeft:"0px",padding:"12px 0px 12px 12px",border:"0px solid white",borderRadius:"100px",outline:"none"}}/>
			</form>
        </Box>
        <Box >
          {user ? <Box> <Button
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{"&hover":{background:"white"}}}
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
        <MenuItem  onClick={()=>localStorage.clear()}>Logout</MenuItem>
      </Menu></Box>:<Button sx={{width:"100px",height:"45px",padding:"16px 38px",borderRadius:"100px",backgroundColor:"#625DD3",color:"white","&:hover": {
         backgroundColor:"#625DD3"
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
