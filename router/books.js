const { handleBooksCREATE, handleBooksREAD, handleBooksREAD_ID, handleBooksUPDATE, handleBooksDELETE} = require("../controller/booksHandler.js")
const express = require("express");
const booksModel = require("../model/booksModel.js");
const router = express.Router();

async function validateID(req, res, next) {
    if (req.params.id === undefined || req.params.id === null) {
        next();
        return ;
    }
    const nowID = parseInt(req.params.id);
    if (isNaN(nowID)) {
        res.status(400).json({message: "Invalid ID"});
        return ;
    }
    req.params.id = nowID;
    const hasil = await booksModel.findOne({id: nowID});
    if (hasil === null) {
        res.status(404).json({message: "Book not found"});
        return ;
    }
    next();
}

router.use(express.json());
router.post("/", handleBooksCREATE);
router.get("/", handleBooksREAD);
router.get("/:id", validateID, handleBooksREAD_ID);
router.put("/:id", validateID, handleBooksUPDATE);
router.delete("/:id", validateID, handleBooksDELETE);

module.exports = router;