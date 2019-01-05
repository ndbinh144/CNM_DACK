exports.formatDate = (date) => {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear() + "  " + strTime;
}

exports.createNumberAccount = () => {
  var numAccountString = "";
  for (var i = 0; i < 15; ++i) {
    var x = Math.floor((Math.random() * 10));
    numAccountString += x;
  }
  return numAccountString;
}

exports.checkNumAccExists = (num, listAcc) => {
  var len = listAcc.length;
  for (var i = 0; i < len; ++i) {
    if (listAcc[i].NUMBERACCOUNT === num) {
      return true;
    }
  }
  return false;
}