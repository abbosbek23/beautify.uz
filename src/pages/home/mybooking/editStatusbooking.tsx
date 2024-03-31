/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box } from "@mui/system";
import { Button, Typography } from "@mui/material";
import { Modal } from "antd";
import { FunctionComponent } from "react";
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

  const editStatusBooker = async (body: string) => {
    try {
      const { data } = await Api.UpdateStatus({ status: body }, id);
      toast.success(data ? "Status is updated successfully" : "");
      setIsModalOpen(false);
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
        <Typography sx={{ textAlign: "center", fontSize: "21px" }}>
          Edit Status Booking
        </Typography>
        <Box sx={{ textAlign: "center", marginTop: "20px" }}>
          <Button
            sx={{
              padding: "10px 50px",
              fontSize: "18px",
              backgroundColor: "white",
              color: "#E2A882",
              border: "1px solid #B5B5B5",
              borderRadius: "10px",
              marginRight: "10px",
              ":hover": {
                backgroundColor:"#E2A882",
                color:"white"
              }
            }}
            onClick={() => editStatusBooker("approved")}
          >
            Approve
          </Button>
          <Button
            sx={{
              padding: "10px 50px",
              fontSize: "18px",
              backgroundColor: "white",
              color: "#E2A882",
              border: "1px solid #B5B5B5",
              borderRadius: "10px",
              marginRight: "10px",
              ":hover": {
                backgroundColor:"#E2A882",
                color:"white"
              }
            }}
            onClick={() => editStatusBooker("rejected")}
          >
            Rejected
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default EditStatusModal;
