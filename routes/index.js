const signupRoutes = require("./signup");

const constructorMethod = app => {
    app.use("/signup", signupRoutes);

    app.get("/", (req, res) => {
        res.render('home', { title: 'Home' });
    });

    app.use("*", (req, res) => {
        res.status(404).json({ error: "Not found" });
    });
};


module.exports = constructorMethod;