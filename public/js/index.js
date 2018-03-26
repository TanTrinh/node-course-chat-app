var socket = io();

socket.on('connect', function () {
  console.log('Connected to server');

  // socket.emit('createEmail', {
  //   to: 'tan@example.com',
  //   text: 'Hey. This is Tan.'
  // });
  socket.emit('createMessage', {
    from: 'tan',
    text: 'Hey. This is Tan.'
  });
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

// socket.on('newEmail', function (email) {
//   console.log('New email', email);
// });
socket.on('newMessage', function (mess) {
  console.log('New message', mess);
});
