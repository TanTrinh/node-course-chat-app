var moment = require('moment');

//Jan 1s 1970 00:00:10 am

// var date = new Date();
// console.log(date.getMonth());

// var date = moment();
// date.add(100, 'year').subtract(4, 'months');
// console.log(date.format('MMM Do YYYY'))

var createdAt = new Date().getTime();
var hour = moment().valueOf;
//console.log(hour.format('h:mm a'))
console.log(hour)
