/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FunctionComponent, useState } from "react";
import {Button} from "@mui/material"
import { Api, Types } from "../../../modules/auth";
import {  Modal } from "antd";
import SelectServiceModal from "./selectservicemodal";
import DateServiceModal from "./dateservicemodal";
import BookModal from "./bookmodal";
interface BookingProps {
    id:any
}
 
const Booking: FunctionComponent<BookingProps> = ({id}) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [services, setServices] = useState<Types.IForm.PostsApi[]>([])
    const getMasterServices = async() => {
        try {
            const {data} = await Api.Userservices(id)
            console.log(data);
            setServices(data)   
        } catch (error) {
            console.log(error);
            
        }
     }

    const handleOpenModal = () => {
        setIsModalOpen(true);
        getMasterServices()
      };
    
      const handleCloseModal = () => {
        localStorage.removeItem("serviceid")
        localStorage.removeItem("totalAmount")
        localStorage.removeItem("selectTime")
        localStorage.removeItem("selectedDate")
        setIsModalOpen(false);
      };

    const [isSelect, setSelect] = useState(true);
	const [isDate, setData] = useState(false);
	const [isBook, setBook] = useState(false);
  
    const handleLogin = () => {
		setSelect(true);
		setData(false);
		setBook(false);
    console.log(isBook);
    
	};
    const handleRegister = () => {
		setSelect(false);
		setData(false);
		setBook(true);
	};
	const handleForgot = () => {
		setSelect(false);
		setData(true);
		setBook(false);
	};

    return ( <>
        <Button
         variant="outlined"
        sx={{
          border: "1px solid #B5B5B5",
          borderRadius: "100px",
          color:"#000"
        }}
        onClick={handleOpenModal}
        >
          Book
        </Button>
        <Modal
        centered
        open={isModalOpen}
        onCancel={() => handleCloseModal()}
        footer={null}
        width={500}
        style={{ maxWidth: "300px auto" }}
        >
        {
            isSelect ? (<SelectServiceModal handleForgot={handleForgot} handleRegister={handleRegister} services={services}/>): isDate ? (<DateServiceModal handleLogin={handleLogin}  handleRegister={handleRegister}/>):(<BookModal handleForgot={handleForgot} id={id} setIsmodal={handleCloseModal}/>)
        }

        </Modal>
    </> );
}
 
export default Booking;