/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { FunctionComponent, useEffect, useState } from "react";
import NavbarService from "./navbarservice";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import Button from "@mui/material/Button";
import plusIcon from "../../../assets/plusserviceIcon.svg";
import clockIcon from "../../../assets/serviceClock.svg";
import serviceedit from "../../../assets/serviceedit.svg"
import servicedelete from "../../../assets/servicedeleteicon.svg"
import AddServiceModal from "./addservicemodal";  
import { Api, Types } from "../../../modules/auth";
import { IEntity } from "../../../modules/auth/types";
import "./index.css";
import EditModalService from "./editmodalservice";
import toast from "react-hot-toast";
interface MasterServiceProps {}

const MasterService: FunctionComponent<MasterServiceProps> = () => {
  const [userID, setUserID] = useState<IEntity.User | null>(null);
  const [services, setServices] = useState<Types.IForm.PostsApi[]>([]);
  const [service,setService] = useState<Types.IForm.PostsApi>()
  const [isModalOpen, setIsModalOpen] = useState(false);  
  const [editModalOpen,setEditModalOpen] = useState(false)
  const [deleteServices,setDeleteServices] = useState(false)

  useEffect(() => {
    const getUserData = async () => {
      try {
        const { data } = await Api.UserProfil();
        setUserID(data);
      } catch (error) {
        console.log(error);
      }
    };

    getUserData();
  }, [isModalOpen,editModalOpen]);
  
  const deleteService = async(id:any) => {
     const {data}:any = await Api.DeleteService(id)
      toast.success(data?"Your service deleted":"")
      setDeleteServices(true) 
     
    }
    useEffect(() => {
      if (userID) {
      const userServices = async () => {
        try {
          const { data } = await Api.Userservices(userID.id);
          setServices(data);
        } catch (error) {
          console.log(error);
        }
      };

      userServices();
    }
  }, [userID,deleteServices]);
  const handleEditOpenModal = () => {
    setEditModalOpen(true);
  };



  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const getService = (item:any) => {
    setEditModalOpen(true)
    setService(item)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleEditCloseModal = () => {
    setEditModalOpen(false);
  };

  return (
    <>
      <NavbarService />
      <span
        style={{
          display: "block",
          width: "95%",
          height: "1px",
          color: "#B5B5B5",
          backgroundColor: "#B5B5B5",
          margin: "0 auto",
        }}
      ></span>
      <Box sx={{ width: "100%", alignItems: "center", textAlign: "center" }}>
        {services   ? (    
          <Box sx={{ padding: "20px" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Typography
                sx={{
                  color: "#000",
                  fontFamily: "Inter,sans-serif",
                  fontSize: "24px",
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: "normal",
                }}
              >
                Services
              </Typography>
              <Box sx={{ marginRight: "0px" }}>
                <Button
                  sx={{
                    color: "#E2A882",
                    fontFamily: "Inter,sans-serif",
                    fontSize: "24px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "normal",
                    padding: "0px",
                    borderRadius: "12px",
                    textTransform:"initial",
                    marginTop: "0px",
                    marginRight: "0px",
                  }}
                  onClick={handleOpenModal}
                >
                  <img src={plusIcon} width={20} height={20} alt="" />
                  Add a service
                </Button>
                <AddServiceModal
                  open={isModalOpen}
                  handleOpen={handleOpenModal}
                  handleClose={handleCloseModal}
                  setIsModalOpen={setIsModalOpen}
                  id={null}
                  parent={null}
                  success={false}
                  category={null}
                />
              </Box>
            </Box>
            {services.map((item) => (
              <Box key={item.id}
                sx={{
                  display: "flex",
                 
                  justifyContent: "space-between",
                  borderRadius: "12px",
                  border: "1px solid #B5B5B5",
                  background: "#F7F7F7",
                  padding:"15px",
                  marginTop:"30px"   
                }}
              >
                <Box sx={{ marginLeft: "0px",width:"100%",marginRight:"0px"}}>
                  <Typography
                    className="text-service"
                    sx={{ fontSize: "24px", color: "#000",textAlign:"start" }}
                  >
                    {item.name}
                  </Typography>
                  <Typography
                    className="text-service"
                    sx={{ fontSize: "22px", color: "#B5B5B5",textAlign:"start",width:"100%" }}
                  >
                    {item.description}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center",marginTop:"10px" }}>
                    <img
                      src={clockIcon}
                      width={24}
                      height={24}
                      alt="clockIcon"
                      style={{marginLeft:"0px",marginRight:"10px"}}
                    />
                    <Typography
                      className="text-service"
                      sx={{ fontSize: "22px", color: "#000" }}
                    >
                      {item.duration}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{marginRight:"0px", position:"relative"}}>
                  <Box sx={{marginRight:"0px",width:"100%",textAlign:"end",marginTop:"5px",display:"flex"}}>
                    <img width={24} height={24} style={{marginLeft:"0px",marginRight:"10px",cursor:"pointer"}} onClick={()=>getService(item)} src={serviceedit} alt="editIcon" />
                    <img width={24} height={24} style={{marginLeft:"0px",cursor:"pointer"}} onClick={()=>deleteService(item.id)} src={servicedelete} alt="deleteIcon" />
                  </Box>
                  <Typography className="text-service" sx={{color:"#E2A882",fontSize:"22px",fontWeight:700,position:"absolute",bottom:"0px",right:"0px"}}>
                    {item.price}
                    <span className="text-service" style={{marginLeft:"3px",color:"#000",fontSize:"22px",fontWeight:700}}>SUM</span>
                  </Typography>
                </Box>
              </Box>
            ))}
            <EditModalService open={editModalOpen}
            handleOpen={handleEditOpenModal}
            handleClose={handleEditCloseModal}
            setIsModalOpen={setEditModalOpen}
            service={service} id={null} parent={null} success={false} category={null}/>
          </Box>
        ) : (
          <Box>
            <Typography
              sx={{
                color: "#000",
                fontFamily: "Inter,sans-serif",
                fontSize: "24px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "normal",
                margin: "0 auto",
                width: "100%",
                marginTop: "36px",
              }}
            >
              You do not have services
            </Typography>
            <Button
              sx={{
                color: "#E2A882",
                fontFamily: "Inter,sans-serif",
                fontSize: "24px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "normal",
                padding: "16px 24px",
                borderRadius: "12px",
                border: "1.5px dashed #E2A882",
                marginTop: "32px",
              }}
              onClick={handleOpenModal}
            >
              <img src={plusIcon} width={20} height={20} alt="" />
              Add a service
            </Button>
            <AddServiceModal
              open={isModalOpen}
              handleOpen={handleOpenModal}
              handleClose={handleCloseModal}
              setIsModalOpen={setIsModalOpen}
              id={null}
              parent={null}
              success={false}
              category={null}
            />
          </Box>
        )}
      </Box>
    </>
  );
};

export default MasterService;
