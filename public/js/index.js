var socket = io();

socket.on('connect', function () {
  console.log('Connected to server');

  // socket.emit('createEmail', {
  //   to: 'tan@example.com',
  //   text: 'Hey. This is Tan.'
  // // });
  // socket.emit('createMessage', {
  //   from: 'tan',
  //   text: 'Hey. This is Tan.'
  // });
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

// socket.on('newEmail', function (email) {
//   console.log('New email', email);
// });
socket.on('newMessage', function (mess) {
  console.log('New message', mess);
  var li = $('<li></li>');
  li.text(`${mess.from}: ${mess.text}`);

  $('#messages').append(li);
});

socket.on('newLocationMessage', function (mess) {
  var li = $('<li></li>');
  var a = $('<a target="_blank">My current location</a>');

  li.text(`${mess.from}: `);
  a.attr('href', mess.url);
  li.append(a);
  $('#messages').append(li);
})

// Example about acknowledge event
// socket.emit('createMessage', {
//   from: 'Frank',
//   text: 'Hi'
// }, function (data) {
//   console.log('Got it', data);
// });

$('#message-form').on('submit', function (e) {
  e.preventDefault();

  var messageTextbox = $('[name=message]');

  socket.emit('createMessage', {
    from: 'User',
    text: messageTextbox.val()
  }, function () {
    messageTextbox.val('');
  });
});

var locationButton = $('#send-location');
locationButton.on('click', function () {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser.');
  }

  locationButton.attr('disabled', 'disabled').text('Sending location...');

  navigator.geolocation.getCurrentPosition(function (position) {
    locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
    locationButton.removeAttr('disabled').text('Send location');
    alert('Unable to fetch location.');
  })
});
