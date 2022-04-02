const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TicketSchema = new Schema({
    priority: String,
    subject: String,
    description: String,
    assignee: String
});

module.exports = mongoose.model("Ticket", TicketSchema);