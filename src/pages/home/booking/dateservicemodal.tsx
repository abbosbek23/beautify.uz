/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { FunctionComponent, useEffect, useState } from "react";
import { Box } from "@mui/system";
import {
    format,
    endOfMonth,
    eachDayOfInterval,
    isToday,
    isEqual,
    isSameMonth,
    startOfToday,
    parse,
    getDay
  } from "date-fns"; // isPast funksiyasini olib tashlab qo'yildi
  import { isPast } from "date-fns"; // isPast funksiyasini import qilindi
  import Button from '@mui/material/Button';
  import Typography from "@mui/material/Typography";
  import { Api } from "../../../modules/auth";
  import { categorizeTimes } from "./categorytimes";
  import backIcon from "../../../assets/navbarbackIcon.svg";


interface DateServiceModalProps {
    handleRegister: () => void;
    handleLogin: () => void;
}
 
const DateServiceModal: FunctionComponent<DateServiceModalProps> = ({handleRegister,handleLogin}) => {
    
    const today = startOfToday();
    const [selectedDay, setSelectedDay] = useState<any>(today);
    const [selectDay, setSelectDay] = useState<any>("");
    const [selectDays, setSelectDays] = useState<any>("");
    const [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
    // const [bookinglist, setBookinglist] = useState<any>([]);
    const firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());
    const [freeTimes,setFreeTimes] = useState<any>([])
    const [clickedTime, setClickedTime] = useState<string | null>(null);

    // const todays = () => {
    //   const date = new Date();
    //   return format(date, "yyyy-MM-dd");
    // };

    const errors = () => {
      console.log(selectDay,selectDays,setCurrentMonth);
    }
    console.log(errors);
    
    

    const formatToday = format(today,"yyyy-MM-dd")
    useEffect(()=>{
      const getTodayTimes = async() => {
       try {
        const strings: string = localStorage.getItem("serviceid") ?? "";// String sifatida sonlar
        const numbers: number[] = JSON.parse(strings); // JSON.parse() orqali stringni massivga o'tkazamiz
        
        const { data } = await Api.getFreeTimemaster(formatToday,numbers);
        
                
        if (Array.isArray(data) && data.every(item => typeof item === 'string')) {
          const time = categorizeTimes(data);
           // Pass data to categorizeTimes
          setFreeTimes(time);
          // setBookinglist(data);
      } else {
          console.error('Data is not in the expected format.');
      }
       } catch (error) {
        console.log(error);
       }
      }
      getTodayTimes() 
    },[])
     
    const handleDayClick = async (day: any) => {
      if (!isPast(day) || isEqual(day, today)) {
          setSelectedDay(day);
          const formattedDay = format(day, "yyyy-MM-dd");
          const formattedDays = format(day, "MMMM dd");
          setSelectDay(formattedDay);
          setSelectDays(formattedDays);
  
          if (isToday(day)) {
              handleTimeClick(format(new Date(), "HH:mm"));
          } else {
              try {
                const strings: string = localStorage.getItem("serviceid") ?? "";// String sifatida sonlar
        const numbers: number[] = JSON.parse(strings); // JSON.parse() orqali stringni massivga o'tkazamiz
                  const { data } = await Api.getFreeTimemaster(formattedDay,numbers);
                  if (Array.isArray(data) && data.every(item => typeof item === 'string')) {
                      const time = categorizeTimes(data);
                      setFreeTimes(time);
                  } else {
                      console.error('Data is not in the expected format.');
                  }
              } catch (error) {
                  console.log(error);
                  setFreeTimes([]);
              }
          }
      }
  };


  const isTimeLessThanNow = (time: string, day: Date): boolean => {
    const currentTime = new Date();
    const [hour, minute] = time.split(":").map(Number);
    return day.getDate() === currentTime.getDate() && ((currentTime.getHours() > hour) || (currentTime.getHours() === hour && currentTime.getMinutes() > minute));
  };

  const handleTimeClick = (time: string) => {
    const currentTime = new Date();
    const [hour, minute] = time.split(":").map(Number);
    const isTimeLessThanNow = selectedDay.getDate() === currentTime.getDate() && ((currentTime.getHours() > hour) || (currentTime.getHours() === hour && currentTime.getMinutes() > minute));
    
    if (!isTimeLessThanNow) {
        setClickedTime(time === clickedTime ? null : time);
    }
};


const renderFreeTimes = (times: string[] | undefined) => {
  if (!times || times.length === 0) {
      if (isEqual(selectedDay, today)) {
          return (
              <Button
                  disabled
                  sx={{
                      backgroundColor: "white",
                      color: "gray",
                  }}
              >
                  No available times today
              </Button>
          );
      } else {
          return <Typography>Time is not available</Typography>;
      }
  }
  return times.map((time: string) => (
      <Button
          key={time}
          onClick={() => handleTimeClick(time)}
          sx={{
              backgroundColor: clickedTime === time ? "black" : "white",
              color: clickedTime === time ? "white" : "black",
              cursor: isTimeLessThanNow(time, selectedDay) ? "not-allowed" : "pointer"
          }}
      >
          {time}
      </Button>
  ));
};
const colStartClasses = ["", "2", "3", "4", "5", "6", "7"];
      
      
      
 const finalStepBooking = () => {
  if(clickedTime){  
    localStorage.setItem("selectedDate", selectDay || formatToday);
    localStorage.setItem("selectTime", clickedTime || "");
    handleRegister()
  }
 }     
        
 const backService = () => {
  localStorage.removeItem("totalAmount")
  localStorage.removeItem("serviceid")
  handleLogin()
 }    
  
  const days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  });

    return ( <>
    <div style={{ padding: "0px 10px 0px 10px" }}>
      <div style={{display:"flex",alignItems:"center"}}>
      <img
        width={22}
        onClick={backService}
        style={{ cursor: "pointer", marginLeft: "0px",marginRight:"0px" }}
        height={22}
        src={backIcon}
        alt="backicon"
      />
      <div style={{textAlign:"center"}}>
      <Typography sx={{color:"#000",
fontFamily: "Inter,sans-serif",
fontSize: "22px",
fontStyle: "normal",
fontWeight: 600,
lineHeight: "normal"}}>Select Date</Typography>
      </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "10px 35px 0 10px",
        }}
      >
        <h2 style={{ flex: "auto", fontWeight: "bold", color: "gray" }}>
          {format(firstDayCurrentMonth, "MMMM yyyy")}
        </h2>
      </div>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          marginTop: "10px",
          fontSize: "xs",
          lineHeight: "4",
          textAlign: "center",
          color: "gray-500",
        }}
      >
        <div>S</div>
        <div>M</div>
        <div>T</div>
        <div>W</div>
        <div>T</div>
        <div>F</div>
        <div>S</div>
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap:0,
          width:"100%"
        }}
      >
        {days.map((day, index) => (
          <div
          key={index}
          style={{
            padding: "0.5rem",
            ...(index === 0 &&
              colStartClasses[getDay(day)] && {
                gridColumnStart: colStartClasses[getDay(day)],
              }),
          }}
          >
            <Button
              onClick={() => handleDayClick(day)}
              sx={{
                ...(!isEqual(day, selectedDay) || (!isPast(day) && isToday(day))
                  ? { color: "gray", backgroundColor: "white" }
                  : { color: "white", backgroundColor: "black" }),
                // ...(!isEqual(day, selectedDay) && isToday(day) && { color: 'red', backgroundColor: 'yellow' }),
                ...(!isEqual(day, selectedDay) && {
                  backgroundColor:
                    isPast(day) && isToday(day) ? "white" : "white",
                  color: isPast(day) && !isToday(day) ? "#B5B5B5" : "black",
                }), // Tekshir past kunlarini
                ...(!isEqual(day, selectedDay) &&
                  !isToday(day) &&
                  !isPast(day) &&
                  isSameMonth(day, firstDayCurrentMonth) && {
                    color: "black",
                    backgroundColor: "white",
                  }),
                ...(!isEqual(day, selectedDay) &&
                  !isToday(day) &&
                  !isSameMonth(day, firstDayCurrentMonth) && {
                    color: "gray",
                    backgroundColor: "lightgray",
                  }),
                borderRadius: "5px",
                border: "1px solid #B5B5B5",
                width: "10px",
                minWidth:"28px",
                display: "flex",
                height:"10px",
                padding: "10px 10px",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto",
                cursor:
                  isPast(day) && !isToday(day) ? "not-allowed" : "pointer",
                 ":hover": {
                   bgcolor: isPast(day) && !isToday(day) ? "white":"black",
                    color: isPast(day) && !isToday(day) ? "#gray":"white",
                    
                  },
              }}
            >
              <time
                dateTime={format(day, "yyyy-MM-dd")}
                style={{ margin: "0px", fontSize: "15px" }}
              >
                {format(day, "d")}
              </time>
            </Button>
          </div>
        ))}
      </Box>
    </div>
    <Box>
      
    {freeTimes ? (
                    <>
                        <Typography>Morning</Typography>
                        {renderFreeTimes(freeTimes.morning,)}
                        <Typography>Afternoon</Typography>
                        {renderFreeTimes(freeTimes.afternoon)}
                        <Typography>Night</Typography>
                        {renderFreeTimes(freeTimes.night)}
                    </>
                ) : (
                    <Typography>This date is not a working day for the master</Typography>
                )}
    
    </Box>
    <div style={{textAlign:"center"}}>
     <Button  sx={{
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
          }} onClick={finalStepBooking}>Continue</Button> 
    </div>
    </> );
}
 
export default DateServiceModal;