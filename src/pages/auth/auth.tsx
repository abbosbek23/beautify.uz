/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useForm } from "react-hook-form";
import { FunctionComponent, useState } from "react";
import "./index.css";
import { Types, Api } from "../../modules/auth";
import { ActiveCode } from "../../modules/auth/api";
import masterIcon from "../../assets/masterIcon.svg";
import clientIcon from "../../assets/clientIcon.svg";
import { useNavigate } from "react-router-dom";

interface AuthProps {
  // search: string;
}

const Auth: FunctionComponent<AuthProps> = () => {
  const {
    register,
    handleSubmit,
    // formState: { errors },
    // reset,
  } = useForm({
    mode: "onBlur",
  });
  const {
    register: register2,
    handleSubmit: handleSubmit2,
    // formState: { errors },
    reset,
  } = useForm({
    mode: "onBlur",
  });

  const [email, setEmail] = useState("");
  const [activeCodes, setactiveCodes] = useState<number | undefined>(undefined);
  const [emailverification, setemailverification] = useState(false);
  const [nextStep, setNextStep] = useState(false);
  const [selectRole, setSelectRole] = useState(0);
  const [selectedRoles, setSelectedRoles] = useState("");
  const [roles, setRoles] = useState(false);
  const [selectGenders, setSelectGenders] = useState(0);
  const [selectGender, setSelectGender] = useState("")
  const navigate = useNavigate();

  const selectedRole = () => {
    if (selectRole === 1) {
      setSelectedRoles("true");
    } else {
      setSelectedRoles("false");
    }
  };
  const chooseGenders = (value:any) => {
    if (value === 0){
      setSelectGender("Erkak")
    }else{
      setSelectGender("Ayol")
    }
  }
  // const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
  //   // Call your original function with the correct type
  //   const adaptedData: Types.IForm.Register = {
  //     id: data.id,
  //     full_name: data.full_name,
  //     email: data.email,
  //     username: data.username,
  //     is_master:selectedRoles,
  //     password:data.password
  //     // Adapt other fields as necessary
  //   };

  //   await originalSubmitHandler(adaptedData); // Call your original submit handler
  // };

  const onsubmit = async (values: any) => {
    const adaptedData: Types.IForm.Register = {
      id: values.id,
      full_name: values.full_name,
      email: values.email,
      username: values.username,
      is_master: selectedRoles,
      password: values.password,
      // Adapt other fields as necessary
    };
    console.log(adaptedData);

    if (values.email) {
      setemailverification(true);
      const { data } = await Api.Register({
        ...values,
        is_master: selectedRoles,
      });
      console.log(data);
      setEmail(values.email);
      setactiveCodes(values.activate_code);
      reset();
    }
  };
  const onsubmits = async (data: any) => {
    console.log(data);
  };
  const activeCode = async () => {
    console.log(email, typeof activeCodes);
    const activatsiyacode = activeCodes;
    const { data } = await ActiveCode({
      email,
      activate_code: activatsiyacode,
    });
    console.log(data);
    if (data) {
      setNextStep(true);
      reset();
    }
    // console.log(values);
  };

  return (
    <>
      {!roles ? (
        <Box padding={10} className="login">
          <Container component="main" sx={{ width: "100%", height: "100%" }}>
            <Box
              sx={{
                width: "896px",
                height: "484px",
                padding: "0 30px 30px 30px",
                borderRadius: "30px",
                background: "#FFF",
                boxShadow: "0px 0px 50px 0px rgba(0, 0, 0, 0.10)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                textAlign: "center",
                alignItems: "center",
              }}
              className={"rolebasedIcon"}
            >
              <Box onClick={selectedRole} marginTop={2}>
                <Box onClick={() => setRoles(true)}>
                  <Box
                    sx={
                      selectRole === 0
                        ? {
                            width: "800px",
                            height: "142px",
                            border: "1px solid #625DD3",
                            padding: "10px 42px",
                            cursor: "pointer",
                            borderRadius: "12px",
                          }
                        : {
                            width: "800px",
                            height: "142px",
                            border: "1px solid #B5B5B5",
                            padding: "10px 42px",
                            cursor: "pointer",
                            borderRadius: "12px",
                          }
                    }
                    onClick={() => setSelectRole(0)}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        width: "20%",
                        alignItems: "center",
                      }}
                    >
                      <img
                        src={clientIcon}
                        width="42px"
                        height="42px"
                        alt="client"
                      />
                      <Typography variant="h5">Mijoz</Typography>
                    </Box>
                    <Typography variant="h6">
                      Mijoz sifatida siz to'g'ri mutaxassislarni topishingiz va
                      ularga onlayn ro'yxatdan o'tishingiz mumkin bo'ladi.
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box onClick={selectedRole}>
                <Box onClick={() => setRoles(true)}>
                  <Box
                    sx={
                      selectRole === 1
                        ? {
                            width: "800px",
                            height: "142px",
                            border: "1px solid #625DD3",
                            padding: "10px 42px",
                            marginTop: "10px",
                            cursor: "pointer",
                            borderRadius: "12px",
                          }
                        : {
                            width: "800px",
                            height: "142px",
                            border: "1px solid #B5B5B5",
                            padding: "10px 42px",
                            marginTop: "10px",
                            cursor: "pointer",
                            borderRadius: "12px",
                          }
                    }
                    onClick={() => setSelectRole(1)}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        width: "20%",
                        alignItems: "center",
                      }}
                    >
                      <img
                        src={masterIcon}
                        width="42px"
                        height="42px"
                        alt="client"
                      />
                      <Typography variant="h5">Master</Typography>
                    </Box>
                    <Typography variant="h6">
                      Master sifatida siz o'zingizning jadvalingizni, narxlar
                      ro'yxatini o'rnatish uchun ishchi vositalardan
                      foydalanasiz.
                    </Typography>
                  </Box>
                </Box>
              </Box>
              {/* <button

Muratov Abbosbek, [05.03.2024 16:29]
style={{
                  marginTop: "20px",
                  width: "800px",
                  background: "#625DD3",
                  borderRadius: "12px",
                  padding: "18px 237px",
                  height: "50px",
                  color: "#FFF",
                  fontFamily: "Inter,sans-serif",
                  fontSize: "18px",
                  fontStyle: "normal",
                  fontWeight: 500,
                  border:"none",
                  cursor:"pointer"
                }}
                color="primary"
                onClick={() => setRoles(true)}
              >
                Davom etish
              </button> */}
            </Box>
          </Container>
        </Box>
      ) : nextStep ? (
        <Box
          sx={{ width: "100%", height: "100vh", overflow: "hidden" }}
          className="login"
        >
          <Container component="main" sx={{ width: "100%", height: "100%" }}>
            <Box
              sx={
                emailverification
                  ? {
                      marginTop: "2%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      width: "560px",
                      height: "730px",
                      borderRadius: "15px",
                      background: "rgba(255, 255, 255, 0.808)",
                      boxShadow: "0px 0px 50px 0px rgba(0, 0, 0, 0.10)",
                    }
                  : {
                      marginTop: "2%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      width: "560px",
                      height: "610px",
                      borderRadius: "15px",
                      background: "rgba(255, 255, 255, 0.808)",
                      boxShadow: "0px 0px 50px 0px rgba(0, 0, 0, 0.10)",
                    }
              }
              height="100%"
              className={"box-signin"}
            >
              <Typography
                component="h1"
                variant="h4"
                sx={{ marginTop: "54px" }}
              >
                Ro’yxatdan o’tish
              </Typography>
              <Typography>
                Ro'yxatdan o'tgan bo'lsangiz.
                <span
                  onClick={() => navigate("/login")}
                  style={{ color: "#625DD3", textDecorationLine: "underline" }}
                >
                  Tizimga kiring
                </span>
              </Typography>
              <Box
                sx={{
                  marginTop: "52px",
                  paddingLeft: "30px",
                  paddingRight: "30px",
                }}
              >
                <form
                  className="form-group resume-box"
                  onSubmit={handleSubmit(onsubmit)}
                  id="register"
                >
                  <input
                    className="login-form"
                    type="text"
                    {...register("full_name", {
                      // required: "Inputni to'ldir",
                      minLength: {
                        value: 4,
                        message: "Kamida 4 harf",
                      },
                    })}
                    placeholder="To’liq ismingiz"
                    style={{
                      width: "100%",
                      padding: "16px 22px",
                      marginBottom: "10px ",
                      borderRadius: "12px",
                      border: "1px solid #B5B5B5",
                    }}
                  />
                  <input
                    {...register("email", {
                      // required: "Inputni to'ldir",
                      minLength: {
                        value: 4,
                        message: "Kamida 4 harf",
                      },
                    })}
                    className="login-form"
                    type="text"
                    placeholder="Elektron pochta manzilingiz"
                    style={{
                      marginTop: "20px",
                      marginBottom: "10px",
                      width: "100%",
                      padding: "16px 22px",
                      borderRadius: "12px",
                      border: "1px solid #B5B5B5",
                    }}
                  />
                  <input
                    {...register("username", {
                      // required: "Inputni to'ldir",
                      minLength: {
                        value: 4,
                        message: "Kamida 4 harf",
                      },
                    })}
                    className="login-form"
                    type="text"
                    placeholder="Foydalanuvchi nomi"
                    style={{
                      marginTop: "20px",
                      marginBottom: "30px",
                      width: "100%",
                      padding: "16px 22px",
                      borderRadius: "12px",
                      border: "1px solid #B5B5B5",
                    }}
                  />
                  <input
                    {...register("password", {
                      // required: "Inputni to'ldir",
                      minLength: {
                        value: 4,
                        message: "Kamida 4 harf",
                      },
                    })}
                    className="login-form"
                    type="text"
                    placeholder="Maxfiylik kodi"
                    style={{
                      marginBottom: "30px",
                      width: "100%",
                      padding: "16px 22px",
                      borderRadius: "12px",
                      border: "1px solid #B5B5B5",
                    }}
                  />
                  {emailverification ? (
                    <input
                      {...register("activate_code", {
                        // required: "Inputni to'ldir",
                        minLength: {
                          value: 4,
                          message: "Kamida 4 harf",
                        },
                      })}
                      onChange={(e) => setactiveCodes(parseInt(e.target.value))}
                      className="login-form"
                      type="number"
                      placeholder="Activatsiya Kodi"
                      style={{
                        marginBottom: "30px",
                        width: "100%",
                        padding: "16px 22px",
                        borderRadius: "12px",
                        border: "1px solid #B5B5B5",
                      }}
                    />
                  ) : (
                    ""
                  )}
                </form>
                {emailverification ? (
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{
                      marginTop: "16px",
                      mb: 1,
                      height: "50px",
                      background: "#625DD3",
                    }}
                    onClick={activeCode}
                  >
                    Keyingisi
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    fullWidth
                    form="register"
                    variant="contained"
                    sx={{
                      marginTop: "30px",
                      height: "50px",
                      background: "#625DD3",
                    }}
                    onClick={handleSubmit(onsubmit)}
                  >
                    Emailingizni tasdiqlang
                  </Button>
                )}
              </Box>
            </Box>
          </Container>
        </Box>
      ) : (
        <Box
          sx={{ width: "100%", height: "100vh", overflow: "hidden" }}
          className="login"
        >
          <Container component="main" sx={{ width: "100%", height: "100%" }}>
            <Box
              sx={{
                marginTop: "12%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                width: "560px",
                height: "400px",
                borderRadius: "15px",
                background: "rgba(255, 255, 255, 1)",
                boxShadow: "0px 0px 50px 0px rgba(0, 0, 0, 0.10)",
              }}
            >
              <form
                className="form-group resume-box"
                onSubmit={handleSubmit2(onsubmits)}
                id="register2"
                style={{ marginTop: "40px", padding: "0px 40px" }}
              >
                <Typography sx={{ marginBottom: "0px" }} variant="h5">
                  Qo'shimcha Ma'lumotlar
                </Typography>
                <input
                  {...register2("phoneNumber", {
                    // required: "Inputni to'ldir",
                    minLength: {
                      value: 4,
                      message: "Kamida 4 harf",
                    },
                  })}
                  className="login-form"
                  type="text"
                  placeholder="Phone Number"
                  style={{
                    marginTop: "20px",
                    marginBottom: "0px",
                    width: "100%",
                    padding: "16px 22px",
                    borderRadius: "12px",
                    border: "1px solid #B5B5B5",
                  }}
                />{" "}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "20px",
                    marginBottom: "20px",
                  }}
                >
                  <Box
                    sx={
                      selectGenders === 0
                        ? {
                            width: "100%",
                            height: "50px",
                            padding: "15px 22px",
                            marginRight: "20px",
                            alignItems: "center",
                            textAlign: "center",
                            border: "1px solid #625DD3",
                            borderRadius: "12px",
                          }
                        : {
                            width: "100%",
                            height: "50px",
                            padding: "15px 22px",
                            marginRight: "20px",
                            alignItems: "center",
                            textAlign: "center",
                            border: "1px solid #B5B5B5 ",
                            borderRadius: "12px",
                          }
                    }
                    onClick={() => chooseGenders(0)}
                  >
                    <Typography
                      sx={
                        selectGenders === 0
                          ? { color: "#625DD3" }
                          : { color: "#B5B5B5" }
                      }
                    >
                      Erkak
                    </Typography>
                  </Box>
                  <Box
                    sx={
                      selectGenders === 1
                        ? {
                            width: "100%",
                            height: "50px",
                            padding: "15px 22px",
                            alignItems: "center",
                            textAlign: "center",
                            border: "1px solid #625DD3",
                            borderRadius: "12px",
                          }
                        : {
                            width: "100%",
                            height: "50px",
                            padding: "15px 22px",
                            alignItems: "center",
                            textAlign: "center",
                            border: "1px solid #B5B5B5 ",
                            borderRadius: "12px",
                          }
                    }
                    onClick={() => chooseGenders(1)}
                  >
                    <Typography
                      sx={
                        selectGenders === 1
                          ? { color: "#625DD3" }
                          : { color: "#B5B5B5" }
                      }
                    >
                      Ayol
                    </Typography>
                  </Box>
                </Box>
                <input
                  {...register2("Address", {
                    // required: "Inputni to'ldir",
                    minLength: {
                      value: 4,
                      message: "Kamida 4 harf",
                    },
                  })}
                  className="login-form"
                  type="text"
                  placeholder="Address"
                  style={{
                    marginBottom: "10px",
                    width: "100%",
                    padding: "16px 22px",
                    borderRadius: "12px",
                    border: "1px solid #B5B5B5",
                  }}
                />
                <Button
                  type="submit"
                  fullWidth
                  form="register2"
                  variant="contained"
                  sx={{
                    marginTop: "16px",
                    mb: 1,
                    height: "50px",
                    background: "#625DD3",
                  }}
                  onClick={onsubmits}
                >
                  Save
                </Button>
              </form>
            </Box>
          </Container>
        </Box>
      )}
    </>
  );
};

export default Auth;
