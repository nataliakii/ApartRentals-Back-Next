import { Schema, model, models } from "mongoose";
import  {apart } from"./apartment";

const bookSchema = new Schema({
  apartment_id: { type: Schema.Types.ObjectId, ref: "apart", required: true },
  name: { type: String, required: true },
  numberOfDays: { type: Number, required: true },
  checkInDate: { type: Date, required: true },
  checkOutDate: { type: Date, required: true },
  checkInTime: { type: Date },
  checkOutTime: { type: Date },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  adults: { type: Number, required: true },
  children: { type: Number, required: true },
  pets: { type: Number, required: true },
  total_price: { type: Number, required: true },
  price: { type: Number, required: true },
  confirmed: { type: Boolean, default: false },
  apartmentName: { type: String },
  bookingTime: Date,
  bookedDays: [],
  nonConfirmedBookedDays: [],
});
const BookModel = models.book || model("book", bookSchema);

export { BookModel, bookSchema };
