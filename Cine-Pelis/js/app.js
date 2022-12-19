$(document).ready(function() {
  setTimeout(function() {
    $('#splash').fadeOut(300, function() {
      window.location.href = 'views/home/home.html';
    });
  }, 2000);
});
