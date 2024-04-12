const mongoose = require('mongoose');

const JournalSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    publisher:{
        type: String,
    },
    onlineISSN:{
        type: String,
        // unique: true,
    },
    url:{
        type: String,
    },
    accessStartDate:{
        type: Date,
    },
    accessEndDate:{
        type:Date
    },
    dateOfPublication:{
        type: Date,
    }
});

module.exports = mongoose.model("journals", JournalSchema);