// ROOT---------------------------
function getRoot(req, res) {
    res.render("root");
  }
  
  // LOGIN---------------------------
  function getLogin(req, res) {
    res.render("login");
  }
  function postLogin(req, res) {
    if (req.isAuthenticated()) {
      console.log(req.user);
      let user = req.user;
      res.render("main", { user: user, isUser: true });
    } else {
      res.redirect("login");
    }
  }
  function chatLogin(req, res) {
    if (req.isAuthenticated()) {
      console.log(req.user);
      let user = req.user;
      res.render("about", { user: user, isUser: true });
    } else {
      res.redirect("login");
    }
  }




  function getFaillogin(req, res) {
    console.log("error en login");
    res.render("failLogin", {});
  }
  
  // SIGN UP---------------------------
  function getSignup(req, res) {
    res.render("signup");
  }
  function postSignup(req, res) {
    if (req.isAuthenticated()) {
      let user = req.user;
      let isUser= true
      res.render("profile", { user, isUser  });
    } else {
      res.redirect("login");
    }
  }
  function getFailsignup(req, res) {
    console.log("error en login");
    res.render("failSignup", {});
  }
  
  // LOG OUT---------------------------
  function getLogout(req, res) {
    req.logout((err) => {     if (!err) {
        
        res.render("logout");
      }
    });
  }
  
  module.exports = {
    getRoot,
    getLogin,
    postLogin,
    getSignup,
    postSignup,
    getFaillogin,
    getFailsignup,
    getLogout,
    chatLogin
  };
  