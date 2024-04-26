/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box } from "@mui/system";
import { Button, Typography } from "@mui/material";
import { Modal } from "antd";
import { FunctionComponent, useState } from "react";
import { Api } from "../../../modules/auth";
import "../index.css";
import toast from "react-hot-toast";

interface EditStatusModalProps {
  id: any;
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}

const EditStatusModal: FunctionComponent<EditStatusModalProps> = ({
  id,
  isModalOpen,
  setIsModalOpen,
}) => {
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const [isDisabled, setIsDisabled] = useState(false);

  const editStatusBooker = async (body: string) => {
    try {
      const { data } = await Api.UpdateStatus({ status: body }, id);
      setIsModalOpen(false);
      setIsDisabled(false)
      toast.success(data ? "Status is updated successfully" : "");
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
        <Typography sx={{ textAlign: "center", fontSize: "28px",marginTop:"20px" }}>
          Edit Status Booking
        </Typography>
        <Box sx={{ textAlign: "center", marginTop: "20px" }}>
          <Button
            sx={{
              padding: "10px 40px",
              fontSize: "16px",
              backgroundColor: "white",
              color: "#E2A882",
              border: "1px solid #B5B5B5",
              borderRadius: "12px",
              marginRight: "16px",
              marginBottom:"20px",
              ":hover": {
                backgroundColor:"#E2A882",
                color:"white"
              }
            }}
            
            disabled={isDisabled}
  onClick={() => {
    editStatusBooker("approved");
    setIsDisabled(true); // Tekshirilgan holatda tugmani `disabled` qilish
  }}
          >
            Approve
          </Button>
          <Button
            sx={{
              padding: "10px 40px",
              fontSize: "16px",
              backgroundColor: "white",
              color: "#E2A882",
              border: "1px solid #B5B5B5",
              borderRadius: "12px",
              marginRight: "10px",
              marginBottom:"20px",
              ":hover": {
                backgroundColor:"#E2A882",
                color:"white"
              }
            }}
            disabled={isDisabled}

            onClick={() => {
              editStatusBooker("rejected")
              setIsDisabled(true);
            }}
          >
            Rejected
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default EditStatusModal;
