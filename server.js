const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const db = require('./models');
const apiRoutes = require("./routes/api-routes");


app.use(express.urlencoded({ extended:true }));
app.use(express.static("public"));
app.use(express.json());
app.use(apiRoutes);

// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })

db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
        console.log('App listening on PORT ' + PORT);
    });
});
