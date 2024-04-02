/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { FunctionComponent, useEffect, useState } from "react";
import { Api, Types } from "../../../modules/auth";
import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import locationMaster from "../../../assets/locationIconProfile.svg"
import clockIcon from "../../../assets/clockeditIcon.svg"
import line from "../../../assets/linemaster.svg"
import lineBooking from "../../../assets/lineBooking.svg"
import backIcon from "../../../assets/navbarbackIcon.svg"
import "../index.css"
import toast from "react-hot-toast";

interface BookModalProps {
    handleLogin:() => void;
    id: number;
    handleForgot:()=>void;
    handleCloseModal:()=>void;
}

const BookModal: FunctionComponent<BookModalProps> = ({handleLogin,handleForgot,handleCloseModal, id }) => {
    const [userInfo, setUserInfo] = useState<Types.IForm.PostsApi[]>([]);

    useEffect(() => {
        const getUserInfo = async () => {
            try {
                const { data } = await Api.Userservices(id);
                setUserInfo(data);
            } catch (error) {
                console.log(error);
            }
        };
        getUserInfo();
    }, []);


    function getInitials(fullName: string): string {
        const names: string[] = fullName.split(' ');
        const initials: string[] = names.map(name => name.charAt(0));
        return initials.join('').toUpperCase();
    }

   const time:any = localStorage.getItem("selectedDate")

    function getFormattedDate(dateString: string): string {
        const date = new Date(dateString);
        return date.toLocaleDateString('uz-UZ', { year: 'numeric', month: 'long', day: 'numeric' });
    }
    
    const formattedDate = getFormattedDate(time);

    function findObjectsByIds(ids: any[], data: any[]): any[] {
        return data.filter(obj => ids.includes(obj.id));
      }
      
      const serviceIdsString = localStorage.getItem("serviceid");
      const serviceIds = serviceIdsString ? JSON.parse(serviceIdsString) : [];
      const services = findObjectsByIds(serviceIds, userInfo);
      
     const postBooking = async() => {
      const serviceid = localStorage.getItem("serviceid")
      const selectTime = localStorage.getItem("selectTime") 
      const selectedDate = localStorage.getItem("selectedDate")
      console.log(selectedDate);
      
      const serviceIds = serviceid ? JSON.parse(serviceid) : [];
      if (serviceid === null || selectTime === null || selectedDate === null) {
        return;
      }

       try {
        const {data} = await Api.PostBookings({
            service_ids:serviceIds,
            time:selectTime,
            date:selectedDate
        })

        handleCloseModal()
        localStorage.removeItem("selectedDate")
        localStorage.removeItem("totalAmount")
        localStorage.removeItem("selectTime")
        localStorage.removeItem("serviceid")
        handleLogin()
        toast.success(data?"successfully booked":"");
       } catch (error) {
        console.log(error);
        
       }
     }
    
     const backService = () => {
        localStorage.removeItem("selectTime")
        localStorage.removeItem("selectedDate")
        handleForgot()
       }  

       const totalAmount: string | null = localStorage.getItem("totalAmount");
    return (
        <Box>
            <div style={{display:"flex",alignItems:"center"}}>
      <img
        width={22}
        onClick={backService}
        style={{ cursor: "pointer", marginLeft: "0px",marginRight:"0px" }}
        height={22}
        src={backIcon}
        alt="backicon"
      />
      <div style={{textAlign:"center"}}>
      <Typography sx={{color:"#000",
fontFamily: "Inter,sans-serif",
fontSize: "22px",
fontStyle: "normal",
fontWeight: 600,
lineHeight: "normal"}}>Select Date</Typography>
      </div>
      </div>
            <Box sx={{display:"flex",alignItems:"center"}}>
            <Box
                sx={
                    userInfo?.length === 0 || !userInfo[0].user
                        ? {
                            width: "120px",
                            height: "120px",
                            marginTop: "0px",
                            marginLeft: "0px",
                            marginRight: "24px",
                        }
                        : { display:"flex",alignItems:"center",width: "90px", height: "120px", marginRight: "10px", marginLeft: "0px" }
                }
            >
                {userInfo?.length === 0 || !userInfo[0].user ? (
                    <div
                        style={{
                            width: "100%",
                            height: "100%",
                            padding: "15px",
                            backgroundColor: "#B5B5B5",
                            borderRadius: "100px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Typography
                            variant="h3"
                            component="div"
                            sx={{
                                color: "#FFFFFF",
                                fontSize: "48px",
                            }}
                        >
                            {getInitials(userInfo[0]?.user?.full_name || "")}
                        </Typography>
                    </div>
                ) : userInfo[0].user.image ? (
                    <img
                        src={userInfo[0].user.image}
                        alt="userimage"
                        style={{
                            width: "80px",
                            height: "80px",
                            borderRadius: "100px",
                            marginTop:"0px",
                            marginRight:"10px",
                           marginLeft:"20px"
                        }}
                    />
                ) : (
                    <div
                        style={{
                            width: "50px",
                            height: "50px",
                            padding: "40px",
                            backgroundColor: "#B5B5B5",
                            borderRadius: "100px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop:"0px",
                            marginRight:"0px",
                            marginLeft:"20px"
                        }}
                    >
                        <Typography
                            variant="h3"
                            component="div"
                            sx={{
                                color: "#FFFFFF",
                                fontSize: "35px",
                            }}
                        >
                            {getInitials(userInfo[0]?.user?.full_name || "")}
                        </Typography>
                    </div>
                )}
                </Box>
                <Typography sx={{color:"#000",
                fontFamily: "Inter,sans-serif",
                fontSize: "22px",
                fontStyle: "normal",
                fontWeight: 600,
                lineHeight: "normal",
                marginLeft:"10px"}}>
                    {userInfo[0]?.user?.full_name}
                </Typography>
            </Box>
            <Box sx={{display:"flex",alignItems:"center"}}>
                <img src={locationMaster} width={22} height={22} style={{marginRight:"10px",marginLeft:"20px"}} alt="location" />
                <Typography>Uzbekistan {userInfo[0]?.user?.address.region}</Typography>
            </Box>
            <Box sx={{display:"flex",alignItems:"center",marginTop:"16px"}}>
                <img src={clockIcon} width={22} height={22} style={{marginRight:"10px",marginLeft:"20px"}} alt="location" />
                <Typography>{formattedDate} / {localStorage.getItem("selectTime")}</Typography>
            </Box>
            <img src={line} width={"95%"} style={{marginLeft:"14px"}} height={1} alt="" />
            <Box sx={{marginTop:"20px",overflow:"scroll",overflowX:"hidden",height:"100px",marginLeft:"20px",marginRight:"20px"}} className={"chippers"}>
                {
                    services.map((item)=><Box key={item.id} sx={{height:"60px"}}>
                    <Box sx={{display:"flex",justifyContent:"space-between"}}>
                        <Typography sx={{color:"#000",
                        fontFamily: "Inter,sans-serif",
                        fontSize: "18px",
                        fontStyle: "normal",
                        fontWeight: 600,
                        lineHeight: "normal",}}>{item.name}</Typography>
                        <Typography sx={{color:"#E2A882",
                        fontFamily: "Inter,sans-serif",
                        fontSize: "18px",
                        fontStyle: "normal",
                        fontWeight: 600,
                        lineHeight: "normal"}}>{new Intl.NumberFormat().format(parseFloat(item.price) * 1)} <span style={{color:"#000"}}>SUM</span></Typography>
                    </Box>
                    <Typography sx={{color:"#B5B5B5",
                     fontFamily: "Inter,sans-serif",
                     fontSize: "16px",
                     fontStyle: "normal",
                     fontWeight: 400,
                     lineHeight: "normal"}}>{item.duration} o'clock</Typography>
                    </Box>)
                }
            </Box>
            <img src={lineBooking} style={{marginLeft:"10px"}} width={"96%"} height={1} alt="lines" />
            <Box sx={{display:'flex',justifyContent:"space-between",marginLeft:"10px",marginRight:"10px",marginTop:"20px"}}>
                <Typography sx={{color: "#000",
                 fontFamily: "Inter,sans-serif",
                 fontSize: "22px",
                 fontStyle: "normal",
                 fontWeight: 700,
                 lineHeight: "normal"}}>Total Amounts:</Typography>
                <Typography sx={{
              color: "#E2A882",
              fontFamily: "Inter,sans-serif",
              fontSize: "20px",
              fontStyle: "normal",
              fontWeight: 700,
              lineHeight: "normal",
              alignItems: "center",
            }}>{totalAmount !== null ? new Intl.NumberFormat().format((+totalAmount) * 1) : ''}<span style={{
                color: "#000",
                fontFamily: "Inter,sans-serif",
                fontSize: "20px",
                fontStyle: "normal",
                fontWeight: 700,
                lineHeight: "normal",
                marginLeft: "3px",
              }}>SUM</span></Typography>
            </Box>
            <Button sx={{
            width: "100%",
            backgroundColor: "#E2A882",
            color: "white",
            border: "1px solid #E2A882",
            marginTop:"33px",
            ":hover": {
              bgcolor: "white",
              border: "1px solid #E2A882",
              color: "#E2A882",
              transition: "0.4s",
            },
          }} onClick={postBooking}>Confirm</Button>
        </Box>
    );
};

export default BookModal;
