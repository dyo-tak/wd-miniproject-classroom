const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const notesSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      default: () => {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, "0");
        const minutes = now.getMinutes().toString().padStart(2, "0");
        return `${hours}:${minutes}`;
      },
    },
    date: {
      type: String,
      default: () => {
        const myDate = new Date(); // Create a Date object with the current date and time

        const year = myDate.getFullYear();
        const month = myDate.getMonth() + 1; // Note that months are 0-indexed, so we add 1
        const day = myDate.getDate();

        const formattedDate = `${year}-${month
          .toString()
          .padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
        return formattedDate;
      },
    },
    theory: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notes", notesSchema);
