/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { format, endOfMonth, eachDayOfInterval, isToday, isEqual, isSameMonth, startOfToday, parse, add, getDay } from 'date-fns'; // isPast funksiyasini olib tashlab qo'yildi
import { isPast } from 'date-fns'; // isPast funksiyasini import qilindi
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import { ChevronRightIcon } from '@heroicons/react/24/solid';
import { Box } from '@mui/system';
import { Api, Types } from '../../../modules/auth';


interface Calendar {
    
}
const Calendar: React.FC = () => {
  const today = startOfToday();
  const [selectedDay, setSelectedDay] = useState<any>(today);
  const [selectDay, setSelectDay] = useState<any>("");
  const [selectDays, setSelectDays] = useState<any>("");
  const [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'))
  const firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date())

  const [bookinglist, setBookinglist] = useState<Types.IForm.BookingsMy[]>([])

  const handleDayClick = async(day: any) => {
    if (!isPast(day) || isEqual(day, today)) {
      setSelectedDay(day);
      const formattedDay = format(day, 'yyyy-MM-dd');
      const formattedDays = format(day, 'MMMM dd');
      setSelectDay(formattedDay)
      setSelectDays(formattedDays)
    }
    try {
      const {data} = await Api.BookingMy(selectDay)
      console.log(data);
      setBookinglist(data)  
      
    } catch (error) {
      console.log(error);  
    }
  };
 
  const todays = () => {
    const date = new Date();
    return format(date, 'MMMM dd');
  };
  
  const colStartClasses = [
    '',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
  ]

  const days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  })

  function previousMonth() {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 })
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
  }

  function nextMonth() {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 })
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
  }

  return (
    <div>
      <div style={{display:"flex",alignItems:"center"}}>
        <h2 style={{flex:"auto",fontWeight:"bold",color:"gray"}}>
          {format(firstDayCurrentMonth, 'MMMM yyyy')}
        </h2>
        <div style={{display:'flex'}}>
          <Button
            type="button"
            onClick={previousMonth}
            sx={{
              marginY: '1.5',
              flex: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.5px',
              color: 'gray',
              '&:hover': {
                color: 'gray-500',
              },
            }}
          >
            <ChevronLeftIcon style={{width:"40px",height:"40px"}} aria-hidden="true" />
          </Button>

          <Button
            type="button"
            onClick={nextMonth}
            sx={{
              marginY: '1.5',
              marginRight: '1.5',
              marginLeft: '2',
              flex: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.5px',
              color: 'gray',
              '&:hover': {
                color: 'gray-500',
              },
            }}
          >
            <ChevronRightIcon style={{width:"40px",height:"40px"}}  aria-hidden="true" />
          </Button>
        </div>
      </div>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          marginTop: '10px',
          fontSize: 'xs',
          lineHeight: '6',
          textAlign: 'center',
          color: 'gray-500',
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
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: 0,
        }}
      >
        {days.map((day, index) => (
          <div
            key={index}
            style={{
              padding: '1rem',
              ...(index === 0 && colStartClasses[getDay(day)] && { gridColumnStart: colStartClasses[getDay(day)] }),
            
            }}
          >
            <Button
              onClick={() => handleDayClick(day)}
              sx={{
                ...(!isEqual(day, selectedDay) || isPast(day) && !isToday(day)  ? { color: 'gray', backgroundColor: 'white' }:{color:"white",backgroundColor:"black"}),
                // ...(!isEqual(day, selectedDay) && isToday(day) && { color: 'red', backgroundColor: 'yellow' }),
                ...(!isEqual(day,selectedDay) &&{backgroundColor: isPast(day) && isToday(day) ? 'yellow' : 'white',color:isPast(day) && !isToday(day) ? 'gray' : 'black'}), // Tekshir past kunlarini
                ...(!isEqual(day, selectedDay) && !isToday(day) && !isPast(day) && isSameMonth(day, firstDayCurrentMonth) && { color: 'black', backgroundColor: 'white' }),
                ...(!isEqual(day, selectedDay) && !isToday(day) && !isSameMonth(day, firstDayCurrentMonth) && { color: 'gray', backgroundColor: 'lightgray' }),
                borderRadius: '50%',
                height: '40px',
                width: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto',
                cursor: isPast(day) && !isToday(day)?'not-allowed':"pointer",
              }}
            >
              <time dateTime={format(day, 'yyyy-MM-dd')}>
                {format(day, 'd')}
              </time>
            </Button>
          </div>
        ))}
      </Box>
      <hr />
      <Box>
       <Typography>
       {selectDays ? selectDays:todays()}
       </Typography>
       <Box>
             {
             bookinglist[0]? bookinglist?.map((item)=>(
              <Box key={item.id}>
                <Typography>
                {item.user.full_name}
                </Typography>
              </Box>
             )):<Typography>Bo'sh</Typography>
             } 
       </Box>
      </Box>
    </div>
  );
}

export default Calendar;
