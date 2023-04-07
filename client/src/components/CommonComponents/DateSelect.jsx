import { CircularProgress, Grid, MenuItem, Select } from '@mui/material';
import React, { useEffect, useState } from 'react';
import monthDays from 'month-days';

const DateSelect = ({ date, setDate, dateName, pickTime = false }) => {

    const years = [];
    const [days, setDays] = useState([]);
    const months = {
        "Январь": "01",
        "Февраль": "02",
        "Март": "03",
        "Апрель": "04",
        "Май": "05",
        "Июнь": "06",
        "Июль": "07",
        "Август": "08",
        "Сентябрь": "09",
        "Октябрь": "10",
        "Ноябрь": "11",
        "Декабрь": "12",
    };
    const monthsArr = Object.entries(months);
    const daysArr = [];

    for(let i = 1900; i <= new Date().getFullYear(); i++) {
        years.push(i);
    }

    for(let i = 1; i <= 31; i++) {
        daysArr.push(i);
    }

    useEffect(() => {
        setDays(daysArr);
    }, []);

    const handleDateInput = (e) => {
        let newDate = date.birth_date;
        const dateType = e.target.name;
        const value = e.target.value;

        switch(dateType) {
            case "month":
                newDate = newDate.slice(0, 5) + value + newDate.slice(7);
                const daysNumber = monthDays({month: Number(value)});
                const newDays = [];
                for(let i = 1; i <= daysNumber; i++) {
                    newDays.push(i);
                }
                setDays(newDays);
                break;
            case "day":
                newDate = newDate.slice(0, 8) + value;
                break;
            case "year":
                newDate = value + newDate.slice(4);
                break;
        }
        setDate({
            ...date,
            birth_date: newDate
        });
    }

    if(!date) {
        return <CircularProgress/>
    }

    return (
        <Grid container spacing={1}>
            <Grid item xs={6}>
                <Select 
                    label='Месяц'
                    name="month"
                    value={date.birth_date.slice(5,7)}
                    onChange={(e) => handleDateInput(e)}
                    fullWidth>
                        {
                            monthsArr.map(month => {
                                return <MenuItem key={month[1]} value={month[1]}>{month[0]}</MenuItem>
                            })
                        }
                </Select>
            </Grid>
            <Grid item xs={2}>
                <Select 
                    label='День'
                    name="day"
                    value={date.birth_date.slice(8)}
                    onChange={(e) => handleDateInput(e)}
                    fullWidth>
                        {
                            days.map(day => {
                                if(day < 10) {
                                    day = '0' + day.toString();
                                }
                                return <MenuItem key={day} value={day}>{day}</MenuItem>
                            })
                        }
                </Select>
            </Grid>
            <Grid item xs={4}>
                <Select 
                    label='Год'
                    name="year"
                    value={date.birth_date.slice(0,4)}
                    onChange={(e) => handleDateInput(e)}
                    fullWidth>
                    {
                        years.map(year => {
                            return <MenuItem key={year} value={year}>{year}</MenuItem>
                        })
                    }
                </Select>
            </Grid>
        </Grid>
    )
}

export default DateSelect