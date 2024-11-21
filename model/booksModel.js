const mongoose = require("mongoose");
const booksModel = mongoose.model("books", {
    id: {type: Number, required: true},
    title: {type: String, required: true},
    author: {type: String, required: true},
    published_at: {type: Date, required: true},
    updated_at: {type: Date, required: true},
    created_at: {type: Date, required: true},
});
module.exports = booksModel;