const mongoose = require("mongoose")
module.exports = () => {
    return mongoose.connect(
        "mongodb+srv://mayank8887:8077520633@cluster0.vb0gn.mongodb.net/Web15-fileuploads?retryWrites=true&w=majority"
        )
};