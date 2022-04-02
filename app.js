const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const Ticket = require("./models/ticket");
const methodOverride = require("method-override");

    // Connect MongoDB via mongoose

mongoose.connect("mongodb://localhost:27017/bugtracker", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
// Catch error
mongoose.connection.on("error", console.error.bind(console, "connection error:"));
mongoose.connection.once("open", () => {
    console.log("Database Connected");
});

    // Setup express app

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

    // Routes

// Home
app.get("/", (req, res) => {
    res.render("index");
});
// Tickets dashboard
app.get("/tickets", async (req, res) => {
    const tickets = await Ticket.find({});
    res.render("tickets/index", { tickets });
});
// New Ticket
app.get("/tickets/new", (req, res) => {
    res.render("tickets/new");
});
app.post("/tickets", async (req, res) => {
    const ticket = new Ticket(req.body.ticket);
    await ticket.save();
    res.redirect(`/tickets/${ticket._id}`);
});
// Show Ticket
app.get("/tickets/:id", async (req, res) => {
    const ticket = await Ticket.findById(req.params.id);
    res.render("tickets/show", { ticket });
});
// Edit Ticket
app.get("/tickets/:id/edit", async (req, res) => {
    const ticket = await Ticket.findById(req.params.id);
    res.render("tickets/edit", { ticket });
});
app.put("/tickets/:id", async (req, res) => {
    const { id } = req.params;
    const ticket = await Ticket.findByIdAndUpdate(id, { ...req.body.ticket });
    res.redirect(`/tickets/${ticket._id}`);
});
app.delete("/tickets/:id", async (req, res) => {
    const { id } = req.params;
    const ticket = await Ticket.findByIdAndDelete(id);
    res.redirect("/tickets");
})

    // Start Server

app.listen(3000, ()=> {
    console.log("Server Started");
});