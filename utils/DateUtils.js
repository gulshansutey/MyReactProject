function longToDate(millisec) {
    console.log(millisec);
    return new Date(millisec).toDateString();
}

export default longToDate;