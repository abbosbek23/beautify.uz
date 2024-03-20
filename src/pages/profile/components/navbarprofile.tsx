import { Box } from "@mui/system";
import { FunctionComponent, useEffect, useState } from "react";
import { Api } from "../../../modules/auth";
import navbarbackIcon from "../../../assets/navbarbackIcon.svg";
import Typography from "@mui/material/Typography";
import { IEntity } from "../../../modules/auth/types";
import like from "../../../assets/LikeNavbar.svg";
import bookmark from "../../../assets/BookmarkNavbar.svg";
import settingsnavbar from "../../../assets/settingsnavbar.svg";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditModal from "./editModal";
import EditModalMaster from "./editModalMaster";

interface NavbarprofileProps {}

const Navbarprofile: FunctionComponent<NavbarprofileProps> = () => {
  const [userdata, setUserdata] = useState<IEntity.User>();
  const navigate = useNavigate();
  const roles = localStorage.getItem("roles")

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
   
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/")
};
const handleOpenModal = () => {
  setIsModalOpen(true);
  setAnchorEl(null);
};

const handleCloseModal = () => {
  setIsModalOpen(false);
};

  useEffect(() => {
    const getUserdata = async () => {
      try {
        const { data } = await Api.UserProfil();
        console.log(data);
        setUserdata(data);
      } catch (error) {
        console.log(error);
      }
    };
    getUserdata();
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingLeft: "40px",
        paddingRight: "40px",
        marginTop: "32px",
        marginBottom: "31px",
      }}
    >
      <img
        width={32}
        onClick={() => navigate(-1)}
        style={{ cursor: "pointer", marginLeft: "0px" }}
        height={32}
        src={navbarbackIcon}
        alt="backicon"
      />
      <Typography
        sx={{
          color: "#000",
          fontFamily: "Inter,sans-serif",
          fontSize: "25px",
          fontStyle: "normal",
          fontWeight: 500,
          lineHeight: "normal",
        }}
      >
        {userdata?.username}
      </Typography>
      <Box
        sx={{
          width: "120px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginRight: "0px",
        }}
      >
        <img
          src={like}
        
          width={32}
          height={32}
          style={{marginRight:"10px",cursor: "pointer"}}
          alt="likepage"
        />
        <img
          src={bookmark}
          style={{ cursor: "pointer" }}
          width={32}
          height={32}
          alt="bookmarkpage"
        />
        {
          roles ? <Box>
          <Button
          id="demo-positioned-button"
          aria-controls={anchorEl ? 'demo-positioned-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={anchorEl ? 'true' : undefined}
          onClick={handleClick}
          sx={{
            ':hover': {
              bgcolor: 'white', // theme.palette.primary.main
            },
          }}
        >
         <img
            src={settingsnavbar}
            style={{ cursor: "pointer" }}
            width={32}
            height={32}
            alt="settingsprofile"
          />
        </Button>
        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
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
          <MenuItem onClick={()=> {navigate("/profile");handleClose();}}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem onClick={() => { handleLogout(); handleClose(); }}>Logout</MenuItem>
        </Menu>
        </Box>:<Box>
        <Button
          id="demo-positioned-button"
          aria-controls={anchorEl ? 'demo-positioned-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={anchorEl ? 'true' : undefined}
          onClick={handleClick}
          sx={{':hover': {
            bgcolor: 'white', // theme.palette.primary.main
          },}}
        >
         <img
            src={settingsnavbar}
            style={{ cursor: "pointer" }}
            width={32}
            height={32}
            alt="settingsprofile"
          />
        </Button>
        <Menu
          id="demo-positioned-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          sx={{ top: "50px" }}
        >
          <MenuItem onClick={handleOpenModal}>Open Modal</MenuItem>
          <MenuItem onClick={() => { handleLogout(); handleClose(); }}>Logout</MenuItem>
        
        </Menu>
        {
          roles ? 
          <EditModal  open={isModalOpen} handleOpen={handleOpenModal} handleClose={handleCloseModal} setIsModalOpen={setIsModalOpen} />:
          <EditModalMaster open={isModalOpen} handleOpen={handleOpenModal} handleClose={handleCloseModal} setIsModalOpen={setIsModalOpen}/>     
        }
        </Box>
        }
      </Box>
    </Box>
  );
};

export default Navbarprofile;
