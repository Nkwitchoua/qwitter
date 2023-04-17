const INIT_STATE = {
    todayDate: [],
}

export default (constants = INIT_STATE, action) => {
    console.log(' action -> -> -> ', action);
    switch(action.type) {
        case "GET_TODAY_DATE":
            return {
                ...constants,
                todayDate: action.payload
            }
        // case "SET_TODAY_DATE":
        //     return [...posts, action.payload];
        default:
            return constants;
    }
}