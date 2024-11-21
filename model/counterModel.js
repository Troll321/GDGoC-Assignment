const mongoose = require("mongoose");
const counterModel = mongoose.model("counter", {
    id: {type: Number, required: true},
});
module.exports = counterModel;