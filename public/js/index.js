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

// Example about acknowledge event
// socket.emit('createMessage', {
//   from: 'Frank',
//   text: 'Hi'
// }, function (data) {
//   console.log('Got it', data);
// });

$('#message-form').on('submit', function (e) {
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'User',
    text: $('[name=message]').val()
  }, function () {

  });
});
