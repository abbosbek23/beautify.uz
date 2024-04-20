/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
// import React from 'react'
import { Modal } from "antd"
import moreicon from "../../assets/moreicon.png"
import { FunctionComponent,  useState } from "react"
import { Api } from "../../modules/auth"
import instagramicon from "../../assets/instagramIconmaster.svg"
import telegramicon from "../../assets/telegramIconmaster.svg"
import phoneIcon from "../../assets/phoneIconProfile.svg"

import { Box, Typography } from "@mui/material"

interface SocialNetworksProps {
    id:any
}

const SocialNetworks: FunctionComponent<SocialNetworksProps> = ({id}) => {

   const [open,setOpen] = useState(false)
   const [userData,setuserData] = useState<any>({})
    console.log(id);
    
   const getMasterSocialNetworks = async() => {
    try {
        const {data} = await Api.Userservices(id)
        console.log(data[0]);
        setuserData(data[0])
           
    } catch (error) {
        console.log(error);
    }
 }


   const handleClose = () => {
    setOpen(false)
   }
   const handleopenModal = () => {
     getMasterSocialNetworks()
     setOpen(true)
   } 


  
    
  return (
    <div>
     <img src={moreicon} onClick={handleopenModal} style={{marginLeft:"10px",cursor:"pointer"}} width={20} height={20}/>
     <Modal
     centered
     open={open}
     onCancel={() => handleClose()}
     footer={null}
     width={400}
     style={{ maxWidth: "300px auto" }}
     >
      <Typography sx={{fontSize:"20px",textAlign:"center"}}>Social Networks</Typography>
      <Box sx={{textAlign:"center",marginTop:"10px"}}>
        {
            userData.user?.instagram &&        
       <a href={`https://www.instagram.com/${userData.user?.instagram}`}><img src={instagramicon} width={50} height={50} /></a> 
            }
        {
            userData.user?.telegram && 
       <a href={`https://t.me/${userData.user?.telegram}`}><img src={telegramicon}  width={50} height={50} /></a> 
        }    
        {
            userData.user?.phone &&
       <a href={`tel:${userData.user?.phone}`}><img src={phoneIcon} width={50} height={50} /></a>     
        }
      </Box>
     </Modal>
    </div>
  )
}

export default SocialNetworks