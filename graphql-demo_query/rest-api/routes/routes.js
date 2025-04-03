// import other routes
const bothRoutes = require('./bothRoutes');

const appRouter = (app, fs) => {

    // default route
    app.get('/', (req, res) => {
        res.send('welcome to the development api-server');
    });

    // // other routes
    bothRoutes(app, fs);   
};

module.exports = appRouter;
