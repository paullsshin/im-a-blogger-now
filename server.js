// imported required files and packages
const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const routes = require("./controllers/");
const helpers = require("./utils/handlebarshelpers");

const sequelize = require("./config/connection");
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// middleware
const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ helpers });

// initializing session
const sess = {
  secret: "Super secret secret",
  cookie: {
    maxAge: 1 * 3600 * 1000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict'
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

// initializing templating engines
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

// Initializing sequelize with express
// sequelize.sync({ force: false }).then(() => {
//   app.listen(PORT, () => console.log("Now listening"));
// });
app.listen(PORT, () => {
  console.log(`Now Listening on PORT ${PORT}!`);
  sequelize.sync({ force: false })
})