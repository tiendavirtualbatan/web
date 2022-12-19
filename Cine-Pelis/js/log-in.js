// Boostrap
$('#myModal').modal('show')

// Initialize Firebase
var config = {
  apiKey: 'AIzaSyBEtMWsBITOzOtJ2cvhm6pryCF1eEwM8nU',
  authDomain: 'hackaton-a97af.firebaseapp.com',
  databaseURL: 'https://hackaton-a97af.firebaseio.com',
  projectId: 'hackaton-a97af',
  storageBucket: 'hackaton-a97af.appspot.com',
  messagingSenderId: '10634710862'
};
// Initialize Firebase
var config = {
    apiKey: "AIzaSyBEtMWsBITOzOtJ2cvhm6pryCF1eEwM8nU",
    authDomain: "hackaton-a97af.firebaseapp.com",
    databaseURL: "https://hackaton-a97af.firebaseio.com",
    projectId: "hackaton-a97af",
    storageBucket: "hackaton-a97af.appspot.com",
    messagingSenderId: "10634710862"
  };
  firebase.initializeApp(config);
  // Registrando con google
    var user= null;

    var $loginBtn1 = $('#start-login-google');

    $loginBtn1.on('click', googleLogin);

    function googleLogin() {
      var provider1 = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider1).then(function(result) {
        user = result.user;
        console.log(user);
        hidden();
      });
      firebase.auth().onAuthStateChanged(function (user1) {
        if (user) {
          // User is signed in.
          firebase.database().ref('Users/' + user.uid).set({
            email: user.email,
            name: user.displayName,
            uid: user.uid,
            profilePicture: user.photoURL
          })
        } else {
          // User is signed out.
          console.log('usuario registrado correctamente');
          }
        });
          /*firebase.database().ref('post-comments/' + postId);
      commentsRef.on('child_added', function(data) {
        addCommentElement(postElement, data.key, data.val().text, data.val().author);
      });*/
    };

      // Cerrar sesión
      var btnLogout = $('#logOut'); // #btnLogout

      btnLogout.click(function() {
        firebase.auth().signOut().then(function() {
          // Sign-out successful.
          window.location.href = '';
        }).catch(function(error) {
          // An error happened.
        });
      });

    // Registrando con facebook
    var $loginBtn2 = $('#start-login-facebook');

    $loginBtn2.on('click', facebookLogin);

    function facebookLogin() {
      var provider = new firebase.auth.FacebookAuthProvider();
      firebase.auth().signInWithPopup(provider).then(function(result) {
          user = result.user;
          console.log(user);
          hidden();
        }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;

        });
        firebase.auth().onAuthStateChanged(function (user) {
          if (user) {
            firebase.database().ref('Users/' + user.uid).set({
              email: user.email,
              name: user.displayName,
              uid: user.uid,
              profilePicture: user.photoURL
            });
          } else {
            console.log('usuario registrado correctamente');
            }
          });
            /*firebase.database().ref('post-comments/' + postId);
        commentsRef.on('child_added', function(data) {
          addCommentElement(postElement, data.key, data.val().text, data.val().author);
        });*/
      };

//Validando datos del Email
function begin() {
  function emailValid() {
    return !$('#email').hasClass('invalid') && ($('#email').val().trim().length !== 0);
  };

  function passwordValid() {
      return $('#password').val().length >= 6;
  };

  function checkboxValid() {
      return $('#gridCheck1').prop('checked');
  };

  function allOk() {
     return emailValid() && passwordValid();
  };

  $('#gridCheck1').on('change', function() {
    if (allOk()) {
      $('#btn-sign-up').removeAttr('disabled');
    } else {
      $(this).prop('checked', false);
    }
  });

  $('#btn-sign-up').on('click', function() {
    $('#showSignUp').text('Ya estas registrado, ahora inicia Sesión.');
  });

  //validacciones para el log-in con Email
  function emailAcces() {
    return !$('#email2').hasClass('invalid') && ($('#email').val().trim().length !== 0);
  };

  function passwordAcces() {
      return $('#password2').val().length >= 6;
    };

  function allOkAcces() {
    return emailAcces() && passwordAcces();
  };

  $('#password2').on('keyup', function() {
      if (allOkAcces()) {
        $('#btn-log-in').removeAttr('disabled');
      }
    });

  $('#btn-log-in').on('click', function() {
    $('#btn-log-in').attr('href', '../home/index.html');
  });
};

$(document).ready(begin);

// Vinculando con Email
function registrar() {
  var email = $('#email').val();
  var password = $('#password').val();

  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  console.log(errorCode);
  console.log(errorMessage);
  // ...
});
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    firebase.database().ref('Users/' + user.uid).set({
      email: user.email,
      name: user.displayName,
      uid: user.uid,
      profilePicture: user.photoURL
    })
  } else {
    // User is signed out.
    console.log('usuario registrado correctamente');
    }
  });
};

function ingreso() {
  var email2 = $('#email2').val();
  var password2 = $('#password2').val();
  firebase.auth().signInWithEmailAndPassword(email2, password2).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
    // ...
  });
  hidden();
};
var $imageUser = $('#img-user');
var $nameUser = $('#name-user');

function observador() {

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log('existe usuario');
      //aparece();
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      $imageUser.attr('src', photoURL);
      $nameUser.text(displayName);
      // ...
    } else {
      // User is signed out.
      console.log('no existe usuario');
    }
  });
}

observador();

$(document).ready(function(){
  $('#logOut').mouseover(function() {
    $('#logOut').text('Log out');
  });
  $('#logOut').mouseout(function() {
    $('#logOut').html('<i class="fa fa-times" aria-hidden="true"></i>');
  });
});

function hidden() {
  $('#signUp').addClass('hide');
  $('#logIn').addClass('hide');
  $('#logOut').removeClass('hide');
  $('#v-pills-favourite-tab').removeClass('hide');
  $('#add-favorites').removeClass('hide');
};

$(document).ready(function() {
  setTimeout(function firstVideo() {
      $('#video-placeholder').attr( "src", "https://www.youtube.com/embed/uprrVIIT0G8?start=54&end=122&autoplay=1&loop=1;color=white" );
      setTimeout(function secondVideo() {
          $('#video-placeholder').attr( "src", "https://www.youtube.com/embed/3yXWdcjvE-s?start=27&end=93&autoplay=1&loop=1;color=white&amp;playlist=leIrosWRbYQ%2CuprrVIIT0G8&amp;enablejsapi=1&amp;origin=http%3A%2F%2Fdemo.bloguero-ec.com&amp;widgetid=1");
      }, 69000);
  }, 65000);
});
