/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Container } from "@mui/system";
import { FunctionComponent } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/system/Unstable_Grid";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { FieldError, FieldErrorsImpl, Merge, useForm } from "react-hook-form";
import { Api } from "../../modules/auth";
import { z } from "zod"
import { zodResolver } from '@hookform/resolvers/zod';
import toast from "react-hot-toast";

interface LoginProps {
  // search: string;
  username:string;
  errors: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>> | null | undefined;
}
const signInSchema = z.object({
  name: z.string().min(8,"Username is required saafa asfa  asf a asf"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

const Login: FunctionComponent<LoginProps> = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    // reset,
  } = useForm({
    mode: "onBlur",
    resolver: zodResolver(signInSchema)
  });
  const navigate = useNavigate();

  const onsubmit = async (values: any) => {
    console.log(values);

    try {
      const { data } = await Api.Login({
        ...values,
        username:values.name
      });
      if (data) {
        localStorage.setItem("access", data.access);
        navigate("/");
      }
      console.log(data);
    } catch (error) {
      console.log(error);
      toast.error("Login or password is wrong")
    }
  };
  return (
    <Box
      sx={{ width: "100%", height: "100vh", overflow: "scroll",overflowX:"hidden" }}
      className="login"
    >
      <Container component="main" sx={{ width: "100%", height: "100%" }}>
        <Box
          sx={{
            marginTop: "6%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "544px",
            height: "518px",
            borderRadius: "15px",
            // background: "#FFF",
            background: "rgba(250, 250, 250, 0.908)",
            // boxShadow:"0px 0px 50px 0px rgba(0, 0, 0, 0.10)",
          }}
          height="100%"
          className={"box-signin"}
        >
          <Typography component="h1" variant="h4" sx={{ marginTop: "54px" }}>
            Kirish
          </Typography>
          <Typography>
            Ro’yxatdan o’tmaganmisiz?{" "}
            <span
              onClick={() => navigate("/register")}
              style={{ color: "#625DD3", textDecorationLine: "underline" }}
            >
              Xoziroq o’ting
            </span>
          </Typography>
          <Box
            sx={{
              marginTop: "52px",
              paddingLeft: "30px",
              paddingRight: "30px",
              marginLeft:"10px",
              marginRight:"10px"
            }}
          >
            <form
              className="form-group resume-box"
              onSubmit={handleSubmit(onsubmit)}
              id="login"
              style={{ marginTop: "20px",marginLeft:"0px",marginRight:"0px" }}
            >
              
              <input
                {...register("name")}
                className="login-form"
                type="text"
                placeholder="Foydalanuvchi nomi"
                style={{
                  width: "100%",
                  padding: "16px 22px",
                  marginBottom: "10px ",
                  borderRadius: "12px",
                  border: "1px solid #B5B5B5",
                }}
              />
             
              <input
                {...register("password")}
                className="login-form"
                type="text"
                placeholder="Maxfiylik kodi"
                style={{
                  marginTop: "20px",
                  marginBottom: "10px",
                  width: "100%",
                  padding: "16px 22px",
                  borderRadius: "12px",
                  border: "1px solid #B5B5B5",
                }}
              />
               {errors.password && (
                <p style={{color:"red",marginBottom:"20px"}}>{`${errors.password.message}`}</p>
              )}
            </form>
            <Grid xs>
              <Link
                to={"/forgotpassword"}
                style={{ textDecoration: "none", color: "#625DD3" }}
              >
                Parolni unutdingizmi?
              </Link>
            </Grid>
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
                background: "#625DD3",
              }}
              // onClick={handleSubmit(onsubmit)}
            >
              Kirish
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;
