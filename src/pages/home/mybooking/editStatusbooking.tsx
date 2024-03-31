/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box } from "@mui/system";
import { Button, Typography } from "@mui/material";
import { Modal } from "antd";
import { FunctionComponent } from "react";
import { Api } from "../../../modules/auth";
import "../index.css"
import toast from "react-hot-toast";

interface EditStatusModalProps {
    id: any;
    isModalOpen: boolean;
    setIsModalOpen: (isOpen:boolean) => void;
}

const EditStatusModal: FunctionComponent<EditStatusModalProps> = ({id,isModalOpen,setIsModalOpen}) => {

   

    
     
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const editStatusBooker = async (body: string) => {
        try {
            const { data } = await Api.UpdateStatus({ status: body }, id);
            toast.success(data?"Status is updated successfully":"")
            setIsModalOpen(false)
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Box>
            
            <Modal
                centered
                open={isModalOpen}
                onCancel={handleCloseModal}
                footer={null}
                width={500}
                style={{ maxWidth: "300px auto" }}
            >
                <Typography>
                    Edit Status Booking
                </Typography>
                <Box>
                    <Button onClick={() => editStatusBooker("approved")}>
                        Approve
                    </Button>
                    <Button onClick={() => editStatusBooker("rejected")}>
                        Deny
                    </Button>
                </Box>
            </Modal>
        </Box>
    );
};

export default EditStatusModal;
