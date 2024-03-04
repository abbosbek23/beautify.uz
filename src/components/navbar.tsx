/* eslint-disable no-mixed-spaces-and-tabs */
import { FunctionComponent, useState } from "react";
import logo from "../assets/logo.svg";
import "./navbar.css";
import { Box } from "@mui/system";
import Button from '@mui/material/Button';
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  // onSearch: (value: string) => void;
  // onLanguage: (value: string) => void;
}

const Navbar: FunctionComponent<NavbarProps> = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const navigate = useNavigate()

  return (
    <>
    {window.location.href === "http://localhost:5173/login" || window.location.href === "http://localhost:5173/register" ?<Box></Box>:<> <Box
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
        <Box sx={{marginLeft:"18%"}}>
		<Button sx={{width:"100px",height:"45px",padding:"16px 38px",borderRadius:"100px",backgroundColor:"#625DD3",color:"white","&:hover": {
         backgroundColor:"#625DD3"
    }}} variant="contained" onClick={()=>navigate("/login")}>Login</Button>
        </Box>
      </Box>
	  <span style={{width:"100%",height:".5px",display:"block",backgroundColor:"#B5B5B5"}}></span>
    </>
    }
     
    </>
  );
};

export default Navbar;
