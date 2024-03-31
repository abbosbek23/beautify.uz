/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FunctionComponent, useState } from "react";
import { Checkbox, Button } from "@mui/material";
import { Types } from "../../../modules/auth";
import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";
import line from "../../../assets/linemaster.svg";
import toast from "react-hot-toast";
import "../index.css";

interface SelectServiceModalProps {
  services: Types.IForm.PostsApi[];
  handleRegister: () => void;
  handleForgot: () => void;
}

const SelectServiceModal: FunctionComponent<SelectServiceModalProps> = ({
  services,
  handleForgot,
  handleRegister,
}) => {
  const [checked, setChecked] = useState<any[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  console.log(handleRegister);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: any,
    price: string
  ) => {
    const isChecked = event.target.checked;

    setChecked((prev: any[]) => {
      const formattedPrice = parseFloat(price) * 10;
      if (isChecked) {
        setTotalPrice((prev) => prev + formattedPrice);
        return [...prev, id];
      } else {
        setTotalPrice((prev) => prev - formattedPrice);
        return prev.filter((item) => item !== id);
      }
    });
  };
  

  const handleArray = () => {
    const checkedString = JSON.stringify(checked);
    
    localStorage.setItem("serviceid", checkedString);
    localStorage.setItem("totalAmount",totalPrice.toString())
    handleForgot();
  };

  const handleEmptyArray = () => {
    toast.error("Select Service is required");
  };

  return (
    <>
      <Typography
        sx={{
          textAlign: "center",
          color: "#000",
          fontFamily: "Inter,sans-serif",
          fontSize: "26px",
          fontStyle: "normal",
          fontWeight: 600,
          lineHeight: "normal",
        }}
      >
        Select Services
      </Typography>
      <Box
        sx={{
          marginTop: "10px",
          padding: "0px",
          height: "400px",
          overflow: "scroll",
          overflowX: "hidden",
        }}
        className={"chippers"}
      >
        {services.map((item) => (
          <Box key={item.id}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Checkbox
                onChange={(event) => handleChange(event, item.id, item.price)}
                checked={checked.includes(item.id)}
                inputProps={{ "aria-label": "controlled" }}
              />
              <Box
                sx={{
                  marginLeft: "0px",
                  alignItems: "center",
                  marginTop: "15px",
                }}
              >
                <Typography
                  sx={{
                    color: "#000",
                    fontFamily: "Inter,sans-serif",
                    fontSize: "18px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "normal",
                  }}
                >
                  {item.name}
                </Typography>
                <Typography
                  sx={{
                    color: "#B5B5B5",
                    fontFamily: "Inter,sans-serif",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "normal",
                  }}
                >
                  {item.duration}
                </Typography>
              </Box>
              <Typography
                sx={{
                  color: "#E2A882",
                  fontFamily: "Inter,sans-serif",
                  fontSize: "18px",
                  fontStyle: "normal",
                  fontWeight: 500,
                  lineHeight: "normal",
                }}
              >
                {new Intl.NumberFormat().format(parseFloat(item.price) * 10)}
                <span style={{ marginLeft: "3px" }}>SUM</span>
              </Typography>
            </Box>
            <img src={line} width={"100%"} height={1} alt="line" />
          </Box>
        ))}
      </Box>
      <Box>
        <span
          style={{
            width: "100%",
            height: "1px",
            backgroundColor: "#B5B5B5",
            display: "block",
          }}
        ></span>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "20px",
            marginBottom: "12px",
          }}
        >
          <Typography
            sx={{
              color: "#000",
              fontFamily: "Inter,sans-serif",
              fontSize: "22px",
              fontStyle: "normal",
              fontWeight: 700,
              lineHeight: "normal",
            }}
          >
            Total Amounts
          </Typography>
          <Typography
            sx={{
              color: "#000",
              fontFamily: "Inter,sans-serif",
              fontSize: "20px",
              fontStyle: "normal",
              fontWeight: 700,
              lineHeight: "normal",
              alignItems: "center",
            }}
          >
            {totalPrice === 0 ? (
              <span
                style={{
                  color: "#E2A882",
                  fontFamily: "Inter,sans-serif",
                  fontSize: "20px",
                  fontStyle: "normal",
                  fontWeight: 700,
                  lineHeight: "normal",
                  marginRight: "3px",
                }}
              >
                --
              </span>
            ) : (
              <span>{new Intl.NumberFormat().format((+totalPrice) * 1)}</span>
            )}
            <span>SUM</span>
          </Typography>
        </Box>
      </Box>
      <div style={{ textAlign: "center" }}>
        <Button
          sx={{
            width: "100%",
            backgroundColor: "#E2A882",
            color: "white",
            border: "1px solid #E2A882",
            ":hover": {
              bgcolor: "white",
              border: "1px solid #E2A882",
              color: "#E2A882",
              transition: "0.4s",
            },
          }}
          onClick={checked.length === 0 ? handleEmptyArray : handleArray}
        >
          Continue
        </Button>
      </div>
    </>
  );
};

export default SelectServiceModal;
