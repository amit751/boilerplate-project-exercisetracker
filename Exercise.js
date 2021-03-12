const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});
const exerciseSchema = new mongoose.Schema({
  _id: String,
  description: String,
  duration: Number,
  date: {
    type: Date,
    default: new Date().toISOString().slice(0, 10).replace("T", " "),
  },
});

// duration, and optionally date.
const Exercise = mongoose.model("Exercise", exerciseSchema);

exerciseSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    // returnedObject._id = returnedObject._id.toString();
    // delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = Exercise;
