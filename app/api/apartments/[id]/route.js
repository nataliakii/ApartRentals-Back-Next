import { connectToDB } from "@utils/database";
import { Apart } from "@models/apartment";
import { BookModel } from "@models/book";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();

    const { id } = params;
    const apartment = await Apart.findOne({ _id: id });
    if (!apartment) {
      new Response({
        status: 404,
        error: "There is no apartment with this id",
      });
    }

    const bookings = await BookModel.find({ apartment_id: apartment._id });
    const bookedDays = bookings.reduce(
      (acc, booking) => acc.concat(booking.bookedDays),
      []
    );
    const nonConfirmedBookedDays = bookings.reduce(
      (acc, booking) => acc.concat(booking.nonConfirmedBookedDays),
      []
    );
    const responseData = {
      apartment: apartment,
      booked: {
        bookedDays: bookedDays,
        nonConfirmedBookedDays: nonConfirmedBookedDays,
      },
    };
    return new Response(JSON.stringify(responseData), {
      status: 200,
    });
  } catch (error) {
    return new Response({ status: 500 }, JSON.stringify(error));
  }
};

export const DELETE = async (req, { params }) => {
  try {
    await connectToDB();

    const { id } = params;
    Apart.deleteOne({ _id: id }, (err, result) => {
      if (err) {
        return new Response({
          status: 501,
          error: err,
          message: "Error deleting apartment",
        });
      }

      if (result.deletedCount !== 0) {
        return new Response({
          data: `Apartment #${id} was deleted successfully`,
          status: 200,
        });
      }

      return new Response({
        status: 404,
        message: "No apartment with this id was found, nothing to delete",
      });
    });
  } catch (error) {
    return new Response({ status: 500 }, { error: error.message });
  }
};

export const PATCH = async (req, { params }) => {
  try {
    await connectToDB();

    const { id } = params;
    const apartment = await Apart.findOne({ id: Number(id) });

    if (!apartment) {
      return new Response({
        status: 404,
        error: "No apartment with this ID was found, nothing to update",
      });
    }

    const toggleOccupied = !apartment.occupied;
    const title = apartment.name;

    await Apart.updateOne(
      { id: Number(id) },
      { $set: { occupied: toggleOccupied } }
    );

    const updatedApartment = await Apart.findOne({ id: Number(id) });

    return new Response({
      data: JSON.stringify(updatedApartment),
      status: 200,
      message: `Apartment #${id} ${title} was updated successfully to occupied from ${apartment.occupied} to ${toggleOccupied}`,
    });
  } catch (error) {
    return new Response({ status: 500 }, { error: error.message });
  }
};
