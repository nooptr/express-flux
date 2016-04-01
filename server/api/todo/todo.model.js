var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TodoSchema = new Schema({
    text: { type: String },
    complete: { type: Number, default: 0 },
    created: { type: Date, default: Date.now() },
    modified: { type: Date, default: Date.now() }
});

module.exports = mongoose.model("Todo", TodoSchema);



