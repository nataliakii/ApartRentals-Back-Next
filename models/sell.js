import { Schema, model, models } from "mongoose";

const sellSchema = new Schema({
  apartment_id: { type: Schema.Types.ObjectId, ref: "apart", required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  message: { type: String, required: false },
  confirmed: { type: Boolean, default: false },
  apartmentName: { type: String, required: true },
  bookingTime: Date,
});
const SellModel = models.sell || model("sell", sellSchema);

export { SellModel, sellSchema };
