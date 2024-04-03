/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-mixed-spaces-and-tabs */
import { FunctionComponent, useEffect, useState } from "react";
import logo from "../assets/logo.png";
import "./navbar.css";
import { Box } from "@mui/system";
import Button from '@mui/material/Button';
// import IconButton from "@mui/material/IconButton";
// import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import userimg from '.././assets/user.png'
import like from '.././assets/LikeNavbar.svg'
import bookmark from '.././assets/BookmarkNavbar.svg'
import usericon from ".././assets/usericonnavbar.svg"
import bookingIcon from ".././assets/serviceeditIcon.svg"
import logouticon from ".././assets/logouteditIcon.svg"
import { Api } from "../modules/auth";
import { IEntity } from "../modules/auth/types";
interface NavbarProps {
  onSearch: (value: string) => void;
  // onLanguage: (value: string) => void;
}

const Navbar: FunctionComponent<NavbarProps> = ({onSearch}) => {
  // const [searchQuery, setSearchQuery] = useState("");
  
  const navigate = useNavigate()
  const user = localStorage.getItem("access")
  const [userdata,setuserdata] = useState<IEntity.User>()
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
  useEffect(()=>{
   const getUserdata = async() => {
    try {
      const {data} = await Api.UserProfil()
      setuserdata(data)
    } catch (error) {
      console.log(error);
      
    }
   }
   getUserdata()
  },[])

  // const searchPost = async() => {
  // try {
  //   const {data} = Api.NewPostss()
  //   console.log(data);
    
  // } catch (error) {
  //   console.log(error);
    
  // }
  // }


  return (
    <>
    {window.location.pathname.split("/")[1] === "login" || window.location.pathname.split("/")[1] === "register" || window.location.pathname.split("/")[1] === "forgotpassword" || window.location.pathname.split("/")[1] === "auth" || window.location.pathname.split("/")[1] === "register2step" || window.location.pathname.split("/")[1] === "verificationemail" || window.location.pathname.split("/")[1] === "profile" || window.location.pathname.split("/")[1] === "mylikes" || window.location.pathname.split("/")[1] === "mysaved" ?<Box></Box>:<> <Box
        sx={{ display: "flex", justifyContent: "space-between", alignItems:"center" }}
        width="100%"
        height={100}
        padding={"20px 34px"}
      >
        <Box sx={{width:"128px",height:"28px",marginLeft:"0px","@media (max-width:450px)":{width:"100px",height:"30px"},}} >
        <img width="100%" height="100%" style={{cursor:"pointer"}} onClick={()=>navigate("/")} src={logo} alt="logo" />
        </Box>
        <Box  sx={{display:'flex',marginLeft:"10%",width:"50%", "@media (max-width:450px)":{display:"none"},}}>
        <form action="" style={{ width: "100%", height: "48px", borderRadius: "100px", border: "1px solid #B5B5B5",alignItems:"center",padding:"3px" }}>
    <input onChange={(e)=>onSearch(e.target.value)} placeholder="Search the location or master..." type="text" style={{ width: "85%", fontSize: "18px", marginLeft: "4px",padding:"11px 10px 0 4px",  border: "0px solid white", borderRadius: "100px", outline: "none" }} />
</form>
        </Box>
        <Box sx={{"@media (max-width:450px)":{marginRight:"0px"}}}>
          {user ? <Box>
            <Button
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
       
        sx={{minWidth:"30px","@media (max-width:450px)":{padding:"0px"},':hover': {
          bgcolor: 'white', // theme.palette.primary.main
        },}}
        onClick={()=>navigate("mylikes")}
      >
       <img src={like} style={{marginLeft:"0px",marginRight:"0px"}} width={"100%"} height={"100%"} />
      </Button>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        
        sx={{marginLeft:"20px",minWidth:"30px","@media (max-width:450px)":{padding:"0px",marginLeft:'20px'},':hover': {
          bgcolor: 'white', // theme.palette.primary.main
        },}}
        onClick={()=>navigate("mysaved")}
      >
       <img src={bookmark} width={"100%"} height={"100%"} />
      </Button>
             <Button
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{marginLeft:"20px",minWidth:"30px","@media (max-width:450px)":{padding:"0px",marginLeft:"20px"},':hover': {
          bgcolor: 'white', // theme.palette.primary.main
        },}}
      >
       <img src={userimg} width={"30px"} height={"30px"} />
      </Button>
      {
        userdata?.is_master ? (
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
        <MenuItem onClick={()=> {navigate("/profile");handleClose();}} sx={{
                        color: "#000",
                        fontFamily: "Inter,sans-serif",
                        fontSize: "20px",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "normal",
                        height:"40px",
                        display:"flex",
                        alignItems:"center"
                      }}><img
                      style={{ marginLeft: "0px", marginRight: "3px" }}
                      src={usericon}
                      alt="editIcon"
                    /> Profile</MenuItem>
                    <MenuItem onClick={()=> {navigate("/mybooking");handleClose();}} sx={{
                        color: "#000",
                        fontFamily: "Inter,sans-serif",
                        fontSize: "20px",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "normal",
                        height:"40px",
                        display:"flex",
                        alignItems:"center"
                      }}><img
                      style={{ marginLeft: "0px", marginRight: "3px" }}
                      src={bookingIcon}
                      alt="editIcon"
                    /> Booking</MenuItem>
        <MenuItem onClick={() => { handleLogout(); handleClose();}} sx={{
                      color: "#FF005C",
                      fontFamily: "Inter,sans-serif",
                      fontSize: "20px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "normal",
                      height:"40px"
                    }}><img
                    width={30}
                    height={30}
                    style={{ marginLeft: "0px", marginRight: "3px" }}
                    src={logouticon}
                    alt="logouticon"
                  /> Logout</MenuItem>
      </Menu>
        ):(
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
        <MenuItem onClick={()=> {navigate("/profile");handleClose();}} sx={{
                        color: "#000",
                        fontFamily: "Inter,sans-serif",
                        fontSize: "20px",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "normal",
                        height:"40px",
                        display:"flex",
                        alignItems:"center"
                      }}><img
                      style={{ marginLeft: "0px", marginRight: "3px" }}
                      src={usericon}
                      alt="editIcon"
                    /> Profile</MenuItem>
                    <MenuItem onClick={()=> {navigate("/mybooking");handleClose();}} sx={{
                        color: "#000",
                        fontFamily: "Inter,sans-serif",
                        fontSize: "20px",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "normal",
                        height:"40px",
                        display:"flex",
                        alignItems:"center"
                      }}><img
                      style={{ marginLeft: "0px", marginRight: "3px" }}
                      src={bookingIcon}
                      alt="editIcon"
                    /> Booking</MenuItem>
        <MenuItem onClick={() => { handleLogout(); handleClose();}} sx={{
                      color: "#FF005C",
                      fontFamily: "Inter,sans-serif",
                      fontSize: "20px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "normal",
                      height:"40px"
                    }}><img
                    width={30}
                    height={30}
                    style={{ marginLeft: "0px", marginRight: "3px" }}
                    src={logouticon}
                    alt="logouticon"
                  /> Logout</MenuItem>
      </Menu>
        )
      }
      
      
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
