var socket = io();

function scrollToBottom () {
  //Selectors
  var messages = $('#messages');
  var newMessage = messages.children('li:last-child');
  //Heights
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  }
}

socket.on('connect', function () {
  var params = $.deparam(window.location.search);

  socket.emit('join', params, function (err) {
    if (err) {
      window.location.href = '/';//back to the index.html
      alert(err);
    } else {
      console.log('No error');
    }
  });
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

socket.on('updateUserList', function (users) {
  //console.log('User list', users);
  var ol = $('<ol></ol>');

  users.forEach(function (user) {
    ol.append($('<li></li>').text(user));
  });

  $('#users').html(ol);
})

// socket.on('newEmail', function (email) {
//   console.log('New email', email);
// });
socket.on('newMessage', function (mess) {
  var formattedTime = moment(mess.createdAt).format('h:mm a');
  var template = $('#message-template').html();
  var html = Mustache.render(template, {
    text: mess.text,
    from: mess.from,
    createdAt: formattedTime
  });

  $('#messages').append(html);
  scrollToBottom();
  //var formattedTime = moment(mess.createdAt).format('h:mm a');
  // var li = $('<li></li>');
  // li.text(`${mess.from} ${formattedTime}: ${mess.text}`);
  //
  // $('#messages').append(li);
});

socket.on('newLocationMessage', function (mess) {
  var formattedTime = moment(mess.createdAt).format('h:mm a');
  var template = $('#location-message-template').html();
  var html = Mustache.render(template, {
    url: mess.url,
    from: mess.from,
    createdAt: formattedTime
  })

  $('#messages').append(html);
  scrollToBottom();
  // var li = $('<li></li>');
  // var a = $('<a target="_blank">My current location</a>');
  //
  // li.text(`${mess.from} ${formattedTime}: `);
  // a.attr('href', mess.url);
  // li.append(a);
  // $('#messages').append(li);
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
