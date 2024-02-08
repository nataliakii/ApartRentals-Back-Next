import { connectToDB } from "@utils/database";
import { Apart } from "@models/apartment";

export const GET = async (req, res) => {
  try {
    await connectToDB();
    console.log("hello from connected");

    const apartments = await Apart.find({});
    if (apartments.length < 1) {
      return new Response("No match", { status: 404 });
    }

    const roomsSet = Array.from(
      new Set(apartments.map((apartment) => apartment.rooms))
    );
    const seaLineSet = Array.from(
      new Set(apartments.map((apartment) => apartment.seaLine))
    );

    const numberOfnonOccupied = apartments.filter(
      (apartment) => !apartment.occupied
    ).length;

    const responseData = {
      roomsSet,
      seaLineSet,
      apartments,
      numberOfnonOccupied,
    };

    return new Response(JSON.stringify(responseData), { status: 200 });
  } catch (error) {
    return new Response("server failed to proceed with  this request", {
      status: 500,
    });
  }
};
