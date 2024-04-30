
    const formatDateWithTime = (dateString) => {
    var date = new Date(dateString);
    var month = (date.getMonth() + 1).toString().padStart(2, "0");
    var day = date.getDate().toString().padStart(2, "0");
    var year = date.getFullYear().toString();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var period = hours < 12 ? "AM" : "PM";
    hours = hours % 12 || 12;
    minutes = minutes.toString().padStart(2, "0");
    var formattedDate = `${month}/${day}/${year} ${hours}:${minutes} ${period}`;

    return formattedDate;
  }

  const formatDate = (dateString) => {
    var date = new Date(dateString);
    var month = (date.getMonth() + 1).toString().padStart(2, "0");
    var day = date.getDate().toString().padStart(2, "0");
    var year = date.getFullYear().toString();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var period = hours < 12 ? "AM" : "PM";
    hours = hours % 12 || 12;
    minutes = minutes.toString().padStart(2, "0");
    var formattedDate = `${month}/${day}/${year}`;
    return formattedDate;
  }
  
  const formatDateMothFormat = (dateString) => {
    var date = new Date(dateString);
    var monthNames = ["January", "February", "March", "April", "May", "June",
                      "July", "August", "September", "October", "November", "December"];
    var month = monthNames[date.getMonth()];
    var day = date.getDate().toString().padStart(2, "0");
    var year = date.getFullYear().toString();
    var formattedDate = `${month} ${day}, ${year}`;
    return formattedDate;
}

  export { formatDateWithTime , formatDate, formatDateMothFormat};