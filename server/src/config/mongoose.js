const mongoose = require("mongoose");
export const AutoIncrement = require('mongoose-sequence')(mongoose);

module.exports = app => {
    mongoose.connect('mongodb://localhost:27017/figfin-techtest', {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false
    })
    .then(res => console.log("mongo conneceted"))
    .catch(err => console.log(err))

    mongoose.Promise = global.Promise;
    
    process.on("SIGINT", cleanup);
    process.on("SIGTERM", cleanup);
    process.on("SIGHUP", cleanup);
    
    if (app) {
        app.set("mongoose", mongoose);
    }
};

function cleanup() {
    mongoose.connection.close(function () {
        process.exit(0);
    });
}