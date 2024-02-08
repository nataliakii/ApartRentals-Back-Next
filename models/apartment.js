
import { Schema, model, models } from "mongoose";
import { BookModel } from "./book";
import  { SellSchema } from"./sell";

const apartSchema = new Schema({
  id: Number,
  name: { type: String, required: true },
  rooms: Number,
  kitchen: { type: Boolean, default: false },
  seaLine: { type: Number, min: 0 },
  photos: [String],
  purpose: {
    type: String,
    enum: ["rent", "sale"],
    default: "rent",
  },
  capacity: { type: Number, default: 3 },
  facilities: [],
  price: { type: Number, required: true },
  petFriendly: { type: Boolean, default: true },
  bookings: [{ type: Schema.Types.ObjectId, ref: "book" }],
  sells: [{ type: Schema.Types.ObjectId, ref: "sell", default: [] }],
  singleBeds: { type: Number, min: 0, default: 0 },
  doubleBeds: { type: Number, min: 0, default: 0 },
  singleSofas: { type: Number, min: 0, default: 0 },
  doubleSofas: { type: Number, min: 0, default: 0 },
  desc: {
    type: String,
    default:
      "Get ready to fall in love with our stunning apartments in the breathtaking paradise of Halkidiki, Greece. Book your slice of heaven today!",
  },
  distanceToSea: { type: Number },
});

const Apart = models.apart || model("apart", apartSchema);

export {Apart}
