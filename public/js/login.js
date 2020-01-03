$(document).ready(function () {
  // Getting references to our form and inputs
  var loginForm = $("form.login");
  var userInput = $("input#user-input");
  var passInput = $("input#pass-input");

  // When the form is submitted, we validate there's an username and password entered
  loginForm.on("submit", function (event) {
    event.preventDefault();
    var userData = {
      email: userInput.val().trim(),
      password: passInput.val().trim()
    };
    var userType = $("#sod").val();
    console.log(userData);
    console.log(userType);

    if (!userData.email || !userData.password) {
      console.log("test");
      return;
    }

    // If we have an username and password we run the loginUser function and clear the form
    if (userType==="Developer") loginUser(userData.email, userData.password);
    else loginOrg(userData.email, userData.password);
    userInput.val("");
    passInput.val("");
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function loginUser(email, password) {
    console.log(email);
    $.post("/api/user-login", {
      email: email + " user",
      password: password,
    })
      .then(function () {
        window.location.replace("/user-account");
        // If there's an error, log the error
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  function loginOrg(email, password) {
    console.log("here");
    $.post("/api/org-login", {
      email: email+" org",
      password: password,
    })
      .then(function() {
        window.location.replace("/org-account");
        // If there's an error, log the error
      })
      .catch(function(err) {
        console.log(err);
      });
  }
});
