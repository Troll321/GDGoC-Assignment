const booksModel = require("../model/booksModel.js");
const counterModel = require("../model/counterModel.js");

function formatDate(date) {
    return `${date.getFullYear()}-${date.getUTCMonth()+1}-${date.getDate()}`;
}

function outFilter(book) {
    const output = {...book._doc};
    output.published_at = formatDate(output.published_at);
    output.updated_at = output.updated_at.toISOString();
    output.created_at = output.created_at.toISOString();
    delete output._id;
    delete output.__v;
    return output;
}

async function handleBooksCREATE(req, res) {
    const book = new booksModel(req.body);
    book.created_at = Date.now();
    book.updated_at = Date.now();
    const nowCounter = await counterModel.findOne();
    book.id = nowCounter.id;
    nowCounter.id++;
    await nowCounter.save();
    try {
        await book.save();
    } catch {
        res.status(400).json({message: "Invalid Body"});
        return ;
    }
    res.status(201).json({
        message: "Book created successfully",
        data: outFilter(book)
    });
}

async function handleBooksREAD(req, res) {
    res.status(200).json({
        data: (await booksModel.find()).map((nowBook)=>{return outFilter(nowBook);})
    });
}

async function handleBooksREAD_ID(req, res) {
    res.status(200).json({
        data: outFilter(await booksModel.findOne({id: req.params.id}))
    });
}

async function handleBooksUPDATE(req, res) {
    const book = await booksModel.findOneAndUpdate({id: req.params.id}, {title: req.body.title || "", updated_at: Date.now()}, {new: true});
    res.status(200).json({
        message: "Book updated successfully",
        data: outFilter(book)
    });
}

async function handleBooksDELETE(req, res) {
    await booksModel.deleteOne({ id: req.params.id });
    res.status(200).json({
        message: "Book deleted successfully"
    });
}

module.exports = {handleBooksCREATE, handleBooksREAD, handleBooksREAD_ID, handleBooksUPDATE, handleBooksDELETE}