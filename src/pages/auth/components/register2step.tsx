/* eslint-disable @typescript-eslint/no-explicit-any */
import { FunctionComponent, useEffect, useState } from "react";
import { useForm, Controller,SubmitHandler, FieldValues  } from "react-hook-form";
import { Api, Types } from "../../../modules/auth";
import { getRegions,getDistrict, getMahalla, } from "../../../api/api";
import { Box, Container } from "@mui/system";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import toast from "react-hot-toast";
import InputMask from "react-input-mask";
import {MenuItem, OutlinedInput, FormHelperText, Select,SelectChangeEvent} from "@mui/material"
import "../index.css"
import { useNavigate } from "react-router-dom";
import Grid from "@mui/system/Unstable_Grid";
import loginImage from "../../../assets/loginImage.png"

interface Register2stepsProps {
    phone: string,
    gender: string,
    region?: number | undefined,
    district?: number | undefined,
    mahalla?: number | undefined,
    house: string,
}
 
const Register2steps: FunctionComponent<Register2stepsProps> = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        // reset,
      } = useForm<Register2stepsProps>();

      useEffect(() => {
        (async () => {
          const { data, success } = await getRegions();
          console.log(data);
          success && setRegions(data);
        })();
      }, []);
    

      const [selectGenders, setSelectGenders] = useState(0);
      const [selectGender, setSelectGender] = useState("");
      const [regionId, setRegionId] = useState<number | undefined>(undefined);
      const [districtId, setDistrictId] = useState<number | undefined>(undefined);
      const [mahallasId, setMahallaId] = useState<number | undefined>(undefined);
      const navigate = useNavigate();

      const [regions, setRegions] = useState<Types.IForm.Region[] | undefined>(
        undefined
      );
      const [districts, setDistricts] = useState<Types.IForm.Region[] | undefined>(
        undefined
      );
      const [mahallas, setMahallas] = useState<Types.IForm.Region[] | undefined>(
        undefined
      );

      const chooseGenders = (value: any) => {
        if (value === 0) {
          setSelectGender("male");
          console.log(selectGender);
        } else {
          setSelectGender("female");
        }
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

  const onsubmits: SubmitHandler<FieldValues> = async (values) => {
    console.log(values);
    if(values.phone === '+998  -   -  -  '){
      toast.error("Phone number is required")
    }
    if(selectGender === ""){
      setSelectGender("male")
    }
    try {
      const { data } = await Api.Register2step({
        phone: values.phone,
        gender: selectGender,
        address: {
          region: regionId,
          district: districtId,
          mahalla: mahallasId,
          house: values.house,
        },
      });
      console.log(data);
      navigate("/")
    } catch (error) {
      console.log(error);
    }
  };

  const selectDistrict = async (id: any) => {
    console.log(id);
    setRegionId(id);
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
    setDistrictId(id);
    try {
      const { data, success } = await getMahalla(id);
      success && setMahallas(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getMahallaid = (id: any) => {
    setMahallaId(id);
    console.log(id);
  };

    return ( 
        <>
         <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#F5EFE1",
          height: "100vh",
        }}>
          
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          sx={{ width: "100%" }}
        >
          <Container
            component="main"
            sx={{ width: "100%", height: "100%", alignItems: "center" }}
          >
            <Grid
              container
              sx={{
                width: "100%",
                height: "100%",
                boxShadow: "0px 0px 100px 0px rgba(0, 0, 0, 0.10)",
                borderRadius: "30px",
                margin: "0 auto",
              }}
            >
              <Grid xs={12} sm={6}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                width: "100%",
                height: "100%",
                borderRadius: "15px",
                background: "#FFF",
                // boxShadow: "0px 0px 50px 0px rgba(0, 0, 0, 0.10)",
              }}
            >
              <Typography component="h1" variant="h4" sx={{ marginTop: "20px" }}>
              Sign Up
              </Typography>
              <Box sx={{marginTop: "5px", paddingLeft: "0px", paddingRight: "0px",marginLeft:"0px",marginRight:"0px" }}>
              <form  onSubmit={handleSubmit(onsubmits)} id="register" >
               
                <InputMask
                  {...register("phone", {
                    required: "Phone number is required",
                    minLength: {
                      value: 7,
                      message: "Phone number must be at least 7 characters",
                    },
                  })}
                  mask="+99999-999-99-99" // This defines the format of the input using placeholders
                  style={{
                    width: "100%",
                    padding: "14px 82px 14px 15px",
                    borderRadius: "12px",
                    border: "1px solid #B5B5B5",
                    fontSize: "16px",
                    marginTop: "15px",
                  }}
                  defaultValue="+998"
                  maskChar=" "
                />
                {errors.phone && (
                  <p style={{ color: "red" }}>{errors.phone.message}</p>
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
                    onClick={() => setSelectGenders(0)}
                    sx={{ margin: "0px" }}
                  >
                    <Box
                      sx={
                        selectGenders === 0
                          ? {
                              width: "100%",
                              padding: "12px 48px",
                              marginRight: "0px",
                              alignItems: "center",
                              textAlign: "center",
                              border: "1px solid #E2A882",
                              borderRadius: "12px",
                            }
                          : {
                              width: "100%",
                              padding: "12px 48px",
                              marginRight: "0px",
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
                            ? { color: "#E2A882" }
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
                              padding: "12px 50px",
                              alignItems: "center",
                              textAlign: "center",
                              border: "1px solid #E2A882",
                              borderRadius: "12px",
                            }
                          : {
                              width: "100%",
                              padding: "12px 50px",
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
                            ? { color: "#E2A882", marginLeft: "0px" }
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
                    rules={{ required: "Select Region is required" }}
                    render={({ field }) => (
                      <>
                        <Select
                          {...field}
                          sx={{
                            width: "100%",
                            textAlign: "left",
                            marginBottom: "10px",
                            borderRadius: "12px",
                          }}
                          placeholder="Region"
                          displayEmpty
                          inputProps={{ "aria-label": "Without label" }}
                          value={region}
                          error={!!errors.region?.message}
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
                        <FormHelperText sx={{ color: "red", marginTop: "0px" }}>
                          {errors.region?.message}
                        </FormHelperText>
                      </>
                    )}
                  />
                </Box>
                <Box>
                  <Controller
                    name="district"
                    control={control}
                    rules={{ required: "Select District is required" }}
                    render={({ field }) => (
                      <>
                        <Select
                          {...field}
                          sx={{
                            width: "100%",
                            textAlign: "left",
                            marginBottom: "10px",
                            borderRadius: "12px",
                          }}
                          placeholder="District"
                          displayEmpty
                          inputProps={{ "aria-label": "Without label" }}
                          value={district}
                          error={!!errors.district?.message}
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
                          {districts?.map(
                            ({ id, name }: Types.IForm.Region) => (
                              <MenuItem
                                onClick={() => selectMahalla(id)}
                                value={name}
                                key={id}
                              >
                                {name}
                              </MenuItem>
                            )
                          )}
                        </Select>
                        <FormHelperText sx={{ color: "red", marginTop: "0px" }}>
                          {errors.district?.message}
                        </FormHelperText>
                      </>
                    )}
                  />
                </Box>
                <Box>
                  <Controller
                    name="mahalla"
                    control={control}
                    rules={{ required: "Select Mahalla is required" }}
                    render={({ field }) => (
                      <>
                        <Select
                          {...field}
                          sx={{
                            width: "100%",
                            textAlign: "left",
                            marginBottom: "10px",
                            borderRadius: "12px",
                          }}
                          placeholder="Mahalla"
                          displayEmpty
                          inputProps={{ "aria-label": "Without label" }}
                          value={mahalla}
                          error={!!errors.mahalla?.message}
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
                              Mahalla
                            </em>
                          </MenuItem>
                          {mahallas?.map(({ id, name }: Types.IForm.Region) => (
                            <MenuItem
                              value={name}
                              key={id}
                              onClick={() => getMahallaid(id)}
                            >
                              {name}
                            </MenuItem>
                          ))}
                        </Select>
                        <FormHelperText sx={{ color: "red", marginTop: "0px" }}>
                          {errors.mahalla?.message}
                        </FormHelperText>
                      </>
                    )}
                  />
                </Box>
                <Box sx={{ width: "100%" }}>
                  <OutlinedInput
                    {...register("house", {
                      required: "House is required",
                      minLength: {
                        value: 4,
                        message: "House must be at least 7 characters",
                      },
                    })}
                    className="login-form"
                    type="text"
                    fullWidth
                    placeholder="Uyingizni kiriting"
                    sx={{
                      marginBottom: "5px",
                      width: "100%",
                      borderRadius: "12px",
                      border:"1px solid #B5B5B5",
                      fontSize: "16px",
                      padding:"0px"
                    }}
                  />
                </Box>
                <FormHelperText sx={{ color: "red", marginTop: "0px" }}>
                  {errors.house?.message}
                </FormHelperText>
                <Button
                  type="submit"
                  fullWidth
                  form="register"
                  variant="contained"
                  sx={{
                    marginTop: "16px",
                    mb: 3,
                    height: "50px",
                    background: "#F5EFE1",
                  boxShadow:"none",
                  color:"#000",
                  fontWeight:"600",
                  fontSize:"15px",
                  fontStyle: "normal",
                  lineHeight: "normal",
                  fontFamily:"Inter, sans-serif",
                  "&:hover": {
                    background: "#F5EFE1",
                    boxShadow:"none",
                  }
                  }}
                  onClick={onsubmits}
                >
                  Save
                </Button>
              </form>
              </Box>
            </Box>
            </Grid>
            <Grid
                xs={12}
                sm={6}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "55px 0 55px 0",
                }}>
                <img
                  src={loginImage}
                  alt="Login"
                  style={{ width: "450px", height: "450px" }}
                />
              </Grid>
            </Grid>
          </Container>
          </Grid>
        </Box>
        </>
     );
}
 
export default Register2steps;