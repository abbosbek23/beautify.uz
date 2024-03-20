/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, FunctionComponent, SetStateAction, useEffect, useState } from "react";
import { Modal } from "antd";
import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";
import { IEntity } from "../../../modules/auth/types";
import { Api } from "../../../modules/auth";
import editmodaluploadImage from "../../../assets/editmodaluploadImage.svg";
import { useForm } from "react-hook-form";
import "../../auth/index.css";
import Button from "@mui/material/Button";
import { objectToFormData } from "../../../formdata/formdataprofile";


interface EditModalProps {
  open: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  handleOpen: () => void;
  handleClose: () => void;
}

const EditModal: FunctionComponent<EditModalProps> = ({
  open,
  setIsModalOpen,
  handleClose
}) => {
  const [userdata, setUserdata] = useState<IEntity.User>();


  const [selectGender, setSelectGender] = useState<string | undefined>();
  useEffect(() => {
    const getUserdata = async () => {
      try {
        const { data } = await Api.UserProfil();
        console.log(data);
        setSelectGender(data.gender)
        setUserdata(data);
      } catch (error:any) {
        console.log(error.response.data.username);
       
      }
    };
    getUserdata();
    

  }, []);
  
  

  const chooseGenders = (gender: string) => {
    if (gender === selectGender) {
      setSelectGender(""); 
    } else {
      setSelectGender(gender);
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    mode: "onBlur",

    
  });


  const onsubmit = async (values: any) => {
    console.log(values);
    console.log(values.image[0]);
    const fullData = {
      ...values,
      image: values.image[0],
      gender: selectGender,
    };

    const datas = objectToFormData(fullData);
    console.log(datas);

    try {

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const { data } = await Api.UserUpdateProfile(datas);
      console.log(data);
      setIsModalOpen(false)
      reset()
    } catch (error) {
      console.log(error);
      
    }
     
  };

  function getInitials(fullName: string): string {
    const names: string[] = fullName.split(" ");
    const initials: string[] = names.map((name) => name.charAt(0));
    return initials.join("").toUpperCase();
  }
  const initials: string = getInitials(userdata?.full_name || "");

  return (
    <div>
      <Modal
        
        centered
        open={open}
        onCancel={() => handleClose()}
        footer={null}
        width={400}
        style={{ maxWidth: "300px auto" }}
      >
        <Box>
          <form onSubmit={handleSubmit(onsubmit)}>
            <div
              style={userdata?.image === null ?{
                width: "100px",
                height: "100px",
                padding: "15px",
                backgroundColor: "#B5B5B5",
                borderRadius: "100px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                marginTop:"30px"
              }:{width: "100px",
              height: "100px",
              padding: "0px",
              backgroundColor: "#B5B5B5",
              borderRadius: "100px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              marginTop:"30px"}}
              onClick={() => document.getElementById("upload-input")?.click()}
            >
              {
                userdata?.image === null ?<Typography
                variant="h3"
                component="div"
                sx={{
                  color: "#FFFFFF",
                  fontSize: "38px",
                }}
              >
                {initials}
              </Typography>:<img src={userdata?.image} width="100%" height="100%"/>
              }
              
              <input
                id="upload-input"
                type="file"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  opacity: 0,
                  pointerEvents: "none",
                }}
                {...register("image", {
                  required: "Image is required",
                })}
              />
              <img
                width={30}
                height={30}
                src={editmodaluploadImage}
                alt="Upload Image"
                style={{ position: "absolute", top: "75px", right: "0px" }}
              />
            </div>
            <div style={{ position: "relative",marginTop:"40px" }}>
              <input
                {...register("full_name", {
                  required: "Fullname is required",
                  minLength: {
                    value: 4,
                    message: "Fullname must be at least 4 characters",
                  },
                })}
                defaultValue={userdata?.full_name}
                className="login-form"
                type="text"
                placeholder="Fullname"
                style={{
                  width: "100%",
                  padding: "16px 35px",
                  marginBottom: "10px",
                  borderRadius: "12px",
                  border: "1px solid #B5B5B5",
                  fontSize: "18px",
                  alignItems: "center",
                }}
              />
            </div>
            {errors.fullname && (
              <p
                style={{ color: "red", marginBottom: "20px" }}
              >{`${errors.fullname.message}`}</p>
            )}
            <div style={{ position: "relative" }}>
              <input
                {...register("email", {
                  required: "Email is required",
                  minLength: {
                    value: 4,
                    message: "Email must be at least 4 characters",
                  },
                })}
                defaultValue={userdata?.email}
                className="login-form"
                type="email"
                placeholder="Email"
                style={{
                  width: "100%",
                  padding: "16px 35px",
                  marginBottom: "10px",
                  borderRadius: "12px",
                  border: "1px solid #B5B5B5",
                  fontSize: "18px",
                  alignItems: "center",
                }}
              />
            </div>
            {errors.email && (
              <p
                style={{ color: "red", marginBottom: "20px" }}
              >{`${errors.email.message}`}</p>
            )}
            <div style={{ position: "relative" }}>
              <input
                {...register("username", {
                  required: "Username is required",
                  minLength: {
                    value: 4,
                    message: "Username must be at least 4 characters",
                  },
                })}
                defaultValue={userdata?.username}
                className="login-form"
                type="text"
                placeholder="Username"
                style={{
                  width: "100%",
                  padding: "16px 35px",
                  marginBottom: "10px",
                  borderRadius: "12px",
                  border: "1px solid #B5B5B5",
                  fontSize: "18px",
                  alignItems: "center",
                }}
              />
            </div>
            {errors.username && (
              <p
                style={{ color: "red", marginBottom: "20px" }}
              >{`${errors.username.message}`}</p>
            )}
            <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "15px",
                    marginBottom: "15px",
                  }}
                >
                  
                  <Box
                onClick={() => chooseGenders("male")}
                sx={{
                  margin: "0px",
                  border: selectGender === "male" ? "1px solid #E2A882" : "1px solid #B5B5B5",
                  borderRadius: "12px",
                  padding: "12px 45px",
                  width: "100%",
                  marginRight:"10px",
                  textAlign: "center",
                }}
              >
                <Typography
                  sx={{ color: selectGender === 'male' ? "#E2A882" : "#B5B5B5" }}
                >
                  Male
                </Typography>
              </Box>
              <Box
                onClick={() => chooseGenders("female")}
                sx={{
                  margin: "0px",
                  border: selectGender === "female" ? "1px solid #E2A882" : "1px solid #B5B5B5",
                  borderRadius: "12px",
                  padding: "12px 50px",
                  width: "100%",
                  textAlign: "center",
                }}
              >
                <Typography
                  sx={{
                    color: selectGender === 'female' ? "#E2A882" : "#B5B5B5",
                    marginLeft: "0px"
                  }}
                >
                  Female
                </Typography>
              </Box>
                </Box>
          </form>
        </Box>
        <Button
          type="submit"
          fullWidth
          disabled={isSubmitting}
          variant="contained"
          form="login"
          onClick={handleSubmit(onsubmit)}
          sx={{
            marginTop: "36px",
            mb: 2,
            height: "50px",
            background: "#F5EFE1",
            boxShadow: "none",
            color: "#000",
            fontWeight: "600",
            fontSize: "15px",
            fontStyle: "normal",
            lineHeight: "normal",
            fontFamily: "Inter, sans-serif",
            "&:hover": {
              background: "#F5EFE1",
              boxShadow: "none",
            },
          }}
        >
          Save
        </Button>
      </Modal>
    </div>
  );
};

export default EditModal;
