var firebaseConfig = {
  apiKey: "AIzaSyApV4rdwU9UIJZzxjcoOHbTiuK-nG1vAUY",
authDomain: "cryptofund-website.firebaseapp.com",
projectId: "cryptofund-website",
storageBucket: "cryptofund-website.appspot.com",
messagingSenderId: "943241398681",
appId: "1:943241398681:web:623baced246d0daa3bab08"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth()
const database = firebase.database()

function register () {
  email = document.getElementById('email').value
  password = document.getElementById('password').value
 
  

  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or Password is not in the right format!')
    return
  }
  
  
 

  auth.createUserWithEmailAndPassword(email, password)
  .then(function() {
    
    var user = auth.currentUser

    var database_ref = database.ref()

    var user_data = {
      email : email,
      password : password,
      last_login : Date.now()
    }

  
    database_ref.child('users/' + user.uid).set(user_data)

    
    window.location.href="index.html"
  })
  .catch(function(error) {
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })
}

function login () {
  email = document.getElementById('email').value
  password = document.getElementById('password').value


  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or Password is not in the right format!')
    return
    
  }

  auth.signInWithEmailAndPassword(email, password)
  .then(function() {
    
    var user = auth.currentUser

  
    var database_ref = database.ref()

    var user_data = {
      last_login : Date.now()
    }


    database_ref.child('users/' + user.uid).update(user_data)

  
    window.location.href="index.html"

  })
  .catch(function(error) {
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })
}




/* Validate Functions */
function validate_email(email) {
  expression = /^[^@]+@\w+(\.\w+)+\w$/
  if (expression.test(email) == true) {
    return true
  } else {
    return false
  }
}

function validate_password(password) {
  if (password < 6) {
    return false
  } else {
    return true
  }
}











