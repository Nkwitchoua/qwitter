import axios from "axios";

export const getTodayDate = () => (dispatch) => {
    let day = new Date().getDate().toString();
    let month = new Date().getMonth().toString();
    let year = new Date().getFullYear().toString();

    if(Number(day) < 10) day = '0' + day;
    if(Number(month) < 10) month = '0' + month;

    const date = year + '.' + month + '.' + day;

    dispatch({ type: "GET_TODAY_DATE", payload: date });
}