const { Users } = require("../models/usuarios");
const bCrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "email",
      passReqToCallback: false,
    },
    async (email, password, next) => {
      try {
        const user = await Users.findOne({ email: email });

        if (!user) {
          console.log("User Not Found with email " + email);
          next(null, false);
        }

        const validated = isVaildPassword(user, password);

        if (!validated) {
          console.log("Invalid Password");
          next(null, false);
        }

        next(null, user);
      } catch (err) {
        next(err, false);
      }
    }
  )
);

passport.use(
  "register",
  new LocalStrategy(
    {
      usernameField: "email",
      passReqToCallback: true, //no es necesario si no vamos a requerir otras datos de body
    },
    async (req, email, password, next) => {
      try {
        const user = await Users.findOne({ email: email });

        if (user) {
          console.log("User already exists");
          return next(null, false);
        }

        const newUser = {
          email: email,
          password: createHash(password), //acá se puede hasear con bcrypt
          // email: req.body.email,
          // firstname: req.body.firstname,
          // lastname: req.body.lastname,
        };

        try {
          const userCreated = await Users.create(newUser);
          console.log("User Registration succesful");
          return next(null, userCreated);
        } catch (err) {
          console.log("Error in Saving user: " + err);
          return next(err);
        }
      } catch (err) {
        console.log("Error in SignUp: " + err);
        return next(err, false);
      }
    }
  )
);

passport.serializeUser((user, next) => {
  next(null, user.email);
});

passport.deserializeUser(async (email, next) => {
  try {
    let user = await Users.findOne({ email: email });
    next(null, user);
  } catch (err) {
    console.log("Error in getting user: " + err);
    return next(err);
  }
});

function isVaildPassword(user, password) {
  return bCrypt.compareSync(password, user.password);
}

function createHash(password) {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}
