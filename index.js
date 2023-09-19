// DEFAULT STRUCTURE START
    /* Dependencies and Modules */
    const express = require("express");
    const mongoose = require("mongoose");
    const cors = require("cors");

        /* Encryption */
        require("dotenv").config()

    /* Allows access to routes defined w/in the app */
    // modification depends on the file changes
    const userRoutes = require("./routes/userRoutes");
    const productRoutes = require("./routes/productRoutes");
    const cartRoutes = require("./routes/cartRoutes")

    /* ENVIRONMENT setup */
    const port = 4000;

    /* SERVER setup */
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({
        extended: true
    }));

    /* Allows all rss to access backend app */
    app.use(cors());

    /* DB Connection */
    mongoose.connect(process.env.dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true
        // Avoids any current or future errors while establishing connection to MongoDB
    })
    mongoose.connection.once("open", () => console.log("Connected to cloud database!"))
    
    /* Backend Routes */
    // modification depends on the file changes
    app.use("/users", userRoutes);
    app.use("/products", productRoutes);
    app.use("/cart", cartRoutes)

    /* Server Gateway Response */
    if (require.main === module){
        app.listen(port, () => {
            console.log(`API is now online on port ${process.env.PORT || port}`)
        });
    }

    module.exports = app;
// DEFAULT STRUCTURE END