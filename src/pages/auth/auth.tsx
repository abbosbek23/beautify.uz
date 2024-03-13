/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Controller, useForm } from "react-hook-form";
import { FunctionComponent, useEffect, useState } from "react";
import "./index.css";
import { Types, Api } from "../../modules/auth";
import { ActiveCode } from "../../modules/auth/api";
import masterIcon from "../../assets/masterIcon.svg";
import clientIcon from "../../assets/clientIcon.svg";
import { useNavigate } from "react-router-dom";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { getDistrict, getMahalla, getRegions } from "../../api/api";
import toast from "react-hot-toast";
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
    control,
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
  const [selectGender, setSelectGender] = useState("");
  const [regionId, setRegionId] = useState<number | undefined>(undefined);
  const [districtId, setDistrictId] = useState<number | undefined>(undefined);
  const [mahallasId, setMahallaId] = useState<number | undefined>(undefined);
  const [regions, setRegions] = useState<Types.IForm.Region[] | undefined>(
    undefined
  );
  const [districts, setDistricts] = useState<Types.IForm.Region[] | undefined>(
    undefined
  );
  const [mahallas, setMahallas] = useState<Types.IForm.Region[] | undefined>(
    undefined
  );
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      const { data, success } = await getRegions();
      console.log(data);
      success && setRegions(data);
    })();
  }, []);

  const selectDistrict = async (id: any) => {
    console.log(id);
    setRegionId(id)
    try {
      const { data, success } = await getDistrict(id);
      success && setDistricts(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const selectMahalla = async (id: any) => {
    console.log(id);
    setDistrictId(id)
    try {
      const { data, success } = await getMahalla(id);
      success && setMahallas(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getMahallaid = (id:any) => {
    setMahallaId(id)
    console.log(id);
    
  }

  const selectedRole = () => {
    if (selectRole === 1) {
      console.log(selectGenders);
      selectGenders;
      setSelectedRoles("true");
    } else {
      console.log(selectGenders);

      setSelectedRoles("false");
    }
  };
  const chooseGenders = (value: any) => {
    if (value === 0) {
      setSelectGender("male");
      console.log(selectGender);
      
    } else {
      setSelectGender("female");
    }
  };
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
      toast.success("Activation code sent to your email")
      const { data } = await Api.Register({
        ...values,
        is_master: selectedRoles,
      });
      console.log(data);
      setEmail(values.email);
      
    }
    setactiveCodes(values.activate_code);
    reset();
  };
  const [region, setRegion] = useState("");
  const [district, setDistrict] = useState("");
  const [mahalla, setMahalla] = useState("");

  const handleRegion = (event: SelectChangeEvent) => {
    setRegion(event.target.value);
    console.log(region);
  };
  const handleDistrict = (event: SelectChangeEvent) => {
    setDistrict(event.target.value);
    console.log(district);
  };
  const handleMahalla = (event: SelectChangeEvent) => {
    setMahalla(event.target.value);
  };

  const onsubmits = async (values: any) => {
    console.log(values.house  );
    
    try {
      const {data} = await Api.Register2step({
        phone: values.phone,
        gender: selectGender,
        address: {
          region: regionId,
          district: districtId,
          mahalla: mahallasId,
          house: values.house
        }
      })
      console.log(data);
      
      
    } catch (error) {
      console.log(error);
    }
  };
  const activeCode = async () => {
    console.log(email, typeof activeCodes);
    const activatsiyacode = activeCodes;
    const { data } = await ActiveCode({
      email,
      activate_code: activatsiyacode
    });
    
    // localStorage.setItem("access",data.access_token)
    if (data) {
      console.log(data.access_token);
      localStorage.setItem("access",data.access_token)
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
      ) : !nextStep ? (
        <Box
          sx={{ width: "100%", height: "100vh", overflow: "scroll",overflowX:"hidden" }}
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
                marginTop: "3%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                width: "560px",
                height: "auto",
                borderRadius: "15px",
                background: "rgba(255, 255, 255, 1)",
                boxShadow: "0px 0px 50px 0px rgba(0, 0, 0, 0.10)",
              }}
            >
              <form
                className="form-group resume-box"
                onSubmit={handleSubmit2(onsubmits)}
                id="register2"
                style={{ marginTop: "20px", padding: "0px 40px" }}
              >
                <Typography sx={{ marginBottom: "0px" }} variant="h5">
                  Qo'shimcha Ma'lumotlar
                </Typography>
                <input
                  {...register2("phone", {
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
                    fontSize: "16px",
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
                    onClick={() => setSelectGenders(0)}
                    sx={{ margin: "0px" }}
                  >
                    <Box
                      sx={
                        selectGenders === 0
                          ? {
                              width: "100%",
                              height: "50px",
                              padding: "15px 42px",
                              marginRight: "20px",
                              alignItems: "center",
                              textAlign: "center",
                              border: "1px solid #625DD3",
                              borderRadius: "12px",
                            }
                          : {
                              width: "100%",
                              height: "50px",
                              padding: "15px 42px",
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
                  </Box>
                  <Box
                    onClick={() => setSelectGenders(1)}
                    sx={{ margin: "0px" }}
                  >
                    <Box
                      sx={
                        selectGenders === 1
                          ? {
                              width: "100%",
                              height: "50px",
                              padding: "15px 55px",
                              alignItems: "center",
                              textAlign: "center",
                              border: "1px solid #625DD3",
                              borderRadius: "12px",
                            }
                          : {
                              width: "100%",
                              height: "50px",
                              padding: "15px 55px",
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
                            ? { color: "#625DD3", marginLeft: "0px" }
                            : { color: "#B5B5B5", marginLeft: "0px" }
                        }
                      >
                        Ayol
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ width: "100%" }}>
                <Controller
                    name="region" 
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        sx={{
                          width: "100%",
                          textAlign: "left",
                          marginBottom: "20px",
                          borderRadius: "12px",
                        }}
                        placeholder="Region"
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                        value={region}
                        onChange={(e) => {
                          field.onChange(e);
                          handleRegion(e); // Call your handleDistrict function if needed
                        }}
                      >
                        <MenuItem value="" sx={{ textAlign: "left" }}>
                          <em
                            style={{
                              paddingLeft: "10px",
                              fontFamily: "Inter, sans-serif",
                              fontStyle: "normal",
                              color: "#7d7d7d",
                            }}
                          >
                            Region
                          </em>
                        </MenuItem>
                        {regions?.map(({ id, name }: Types.IForm.Region) => (
                          <MenuItem
                            onClick={() => selectDistrict(id)}
                            value={name}
                            key={id}
                          >
                            {name}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                </Box>
                <Box>
                  <Controller
                    name="district"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        sx={{
                          width: "100%",
                          textAlign: "left",
                          marginBottom: "20px",
                          borderRadius: "12px",
                        }}
                        placeholder="District"
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                        value={district}
                        onChange={(e) => {
                          field.onChange(e);
                          handleDistrict(e); // Call your handleDistrict function if needed
                        }}
                      >
                        <MenuItem value="" sx={{ textAlign: "left" }}>
                          <em
                            style={{
                              paddingLeft: "10px",
                              fontFamily: "Inter, sans-serif",
                              fontStyle: "normal",
                              color: "#7d7d7d",
                            }}
                          >
                            District
                          </em>
                        </MenuItem>
                        {districts?.map(({ id, name }: Types.IForm.Region) => (
                          <MenuItem
                            onClick={() => selectMahalla(id)}
                            value={name}
                            key={id}
                          >
                            {name}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                </Box>
                <Box>
                <Controller
                    name="mahalla"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        sx={{
                          width: "100%",
                          textAlign: "left",
                          marginBottom: "20px",
                          borderRadius: "12px",
                        }}
                        placeholder="Mahalla"
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                        value={mahalla}
                        onChange={(e) => {
                          field.onChange(e);
                          handleMahalla(e); // Call your handleDistrict function if needed
                        }}
                      >
                        <MenuItem value="" sx={{ textAlign: "left" }}>
                          <em
                            style={{
                              paddingLeft: "10px",
                              fontFamily: "Inter, sans-serif",
                              fontStyle: "normal",
                              color: "#7d7d7d",
                            }}
                          >
                            District
                          </em>
                        </MenuItem>
                        {mahallas?.map(({ id, name }: Types.IForm.Region) => (
                          <MenuItem
                            value={name}
                            key={id}
                            onClick={()=>getMahallaid(id)}
                          >
                            {name}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                </Box>
                <input
                  {...register2("house", {
                    // required: "Inputni to'ldir",
                    minLength: {
                      value: 4,
                      message: "Kamida 4 harf",
                    },
                  })}
                  className="login-form"
                  type="text"
                  placeholder="Uyingizni kiriting"
                  style={{
                    marginBottom: "10px",
                    width: "100%",
                    padding: "16px 22px",
                    borderRadius: "12px",
                    border: "1px solid #B5B5B5",
                    fontSize: "16px",
                  }}
                />
                <Button
                  type="submit"
                  fullWidth
                  form="register2"
                  variant="contained"
                  sx={{
                    marginTop: "16px",
                    mb: 3,
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
