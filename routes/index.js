const signupRoutes = require("./signup");
const loginRoutes = require("./login");
const logoutRoutes = require("./logout");
const artistRoutes = require("./artists");
const concertRoutes = require("./concerts");

const constructorMethod = app => {
    app.use(function (req, res, next) {
        CurrentTime = new Date();
        let info = `[${CurrentTime.toUTCString()}]: ${req.method} ${req.originalUrl} `;
        if (req.session.auth)
            info += "(Authenticated User)";
        else
            info += "(Non-Authenticated User)";
        console.log(info);

        if (req.session.auth || req.originalUrl === '/login' || req.originalUrl === '/signup') {
            next();
        }
        else res.redirect('/login');
    });

    app.use("/signup", signupRoutes);
    app.use("/login", loginRoutes);
    app.use("/logout", logoutRoutes);
    app.use("/artists", artistRoutes);
    app.use("/concerts", concertRoutes);

    app.get("/", (req, res) => {
        res.render('home', { title: 'Home' });
    });

    app.use("*", (req, res) => {
        res.status(404).json({ error: "Not found" });
    });
};


module.exports = constructorMethod;