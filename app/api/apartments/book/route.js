import aws from "aws-sdk";
import { Apart } from "@models/apartment";
import { BookModel } from "@models/book";
import { getArrayOfBookedDates } from "@utils/index";
import { connectToDB } from "@utils/database";

export const POST = async (req, res) => {
  try {
    await connectToDB();
    const {
      apartment_id,
      name,
      numberOfDays,
      checkInDate,
      checkOutDate,
      email,
      phone,
      adults,
      children,
      pets,
      total_price,
      price,
      apartmentName,
      bookingTime,
    } = req.body.valuesTosend;

    const apartment = await Apart.findOne({ _id: apartment_id });

    const bookingData = {
      apartment_id: apartment_id,
      name: name,
      numberOfDays: numberOfDays,
      checkInDate: new Date(checkInDate),
      checkOutDate: new Date(checkOutDate),
      email: email,
      phone: phone,
      adults: adults,
      children: children,
      pets: pets,
      total_price: total_price,
      price: price,
      apartmentName: apartmentName,
      bookingTime: bookingTime,
    };

    const bookedDays = getArrayOfBookedDates(
      bookingData.checkInDate,
      bookingData.checkOutDate
    );

    const newBooking = new BookModel(bookingData);
    newBooking.nonConfirmedBookedDays.push(...bookedDays);

    const savedBooking = await newBooking.save();

    const ses = new aws.SES();

    const params = {
      Source: "nataliakireewa@gmail.com",
      Destination: {
        ToAddresses: ["nataliaki@icloud.com", "ntf.elcor@gmail.com"],
      },
      Message: {
        Subject: {
          Data: "Booking Confirmation",
        },
        Body: {
          Text: {
            Data: `Thank you for your booking! Your booking id is ${savedBooking._id}`,
          },
        },
      },
    };

    ses.sendEmail(params, (err, data) => {
      if (err) {
        console.error("---Email error:", err);
        return new Response("Unable to send email to book, please, try again", {
          status: 300,
        });
      } else {
        console.log("---Email sent:", data);
      }
    });

    // Add the booking ID to apartment.bookings array
    apartment.bookings.push(savedBooking._id);

    const savedApartment = await apartment.save();

    const returnData = {
      data: savedBooking,
    };

    return new Response(JSON.stringify(returnData), { status: 200 });
  } catch (error) {
    console.error(error);
    const errorToReturn = {
      error: error,
    };
    return new Response(JSON.stringify(errorToReturn), { status: 500 });
  }
};
