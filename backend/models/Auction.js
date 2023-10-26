
import mongoose from "mongoose";

const auctionSchema = new mongoose.Schema({
  spiceName: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  // Add any other fields relevant to your auction model
});

const Auction = mongoose.model("Auction", auctionSchema);

export { Auction };