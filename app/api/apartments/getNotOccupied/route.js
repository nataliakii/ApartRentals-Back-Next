import { connectToDB } from "@utils/database";
import { Apart } from "@models/apartment";

export const GET = async (req, { params }) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  try {
    await connectToDB();
    const query = { occupied: 0 };
    const rows = await Apart.find(query);
    console.log("rows", rows);

    if (rows.length < 1)
      return new Response({
        status: 300,
        error:
          "WOW! It's a high season! Sadly, but all apartments are occupied",
      });
    const returnData = { data: rows };

    return new Response(JSON.stringify(returnData), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
};
