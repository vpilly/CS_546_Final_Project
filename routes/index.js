const signupRoutes = require("./signup");
const loginRoutes = require("./login");
const logoutRoutes = require("./logout");
const artistRoutes = require("./artists");
const concertRoutes = require("./concerts");
const profileRoutes = require("./profile");
const secMap = require('../security/table');

const constructorMethod = app => {
    app.use(async function (req, res, next) {
        const authCookie = req.session.auth;

        if (req.originalUrl !== '/signup/email') {
            CurrentTime = new Date();
            let info = `[${CurrentTime.toUTCString()}]: ${req.method} ${req.originalUrl} `;
            if (authCookie)
                info += "(Authenticated User)";
            else
                info += "(Non-Authenticated User)";
            console.log(info);
        }

        if (authCookie) {
            try {
                const confirm = await secMap.verifyCookie(authCookie.id, authCookie.secret);
                if (confirm === true) {
                    next();
                    return;
                }
            } catch (e) {
                res.status(400).json({ error: "Cookie-Parsing Error" });
                req.session.destroy();
                return;
            }
            res.status(403).json({ error: "Invalid Cookie" });
            req.session.destroy();
            return;
        }
        else if (req.originalUrl === '/login' || req.originalUrl === '/signup' || req.originalUrl === '/signup/email') {
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
        res.render('home', { title: 'Home', logged: true });
    });

    app.use("*", (req, res) => {
        res.status(404).json({ error: "Not found" });
    });
};


module.exports = constructorMethod;