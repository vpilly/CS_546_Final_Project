const signupRoutes = require("./signup");
const loginRoutes = require("./login");
const artistRoutes = require("./artists");

const constructorMethod = app => {
    app.use("/signup", signupRoutes);
    app.use("/login", loginRoutes);
    app.use("/artists", artistRoutes);

    app.use('/', function (req, res, next) {
        if (!req.session.auth) {
            res.redirect('/login');
        }
        else next();
    });

    app.get("/home", (req, res) => {
        res.render('home', { title: 'Home' });
    });

    app.get("/", (req, res) => {
        res.redirect('/home');
    });

    app.use("*", (req, res) => {
        res.status(404).json({ error: "Not found" });
    });
};


module.exports = constructorMethod;