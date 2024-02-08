import { Apart } from "@models/apartment";
import { connectToDB } from "@utils/database";

export const GET = async (req, res, { params }) => {
  const { query } = params;
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  const queries = query.split("&");
  console.log("queries", queries);
  let q = {};
  queries.forEach((param) => {
    const [key, value] = param.split("=");
    switch (key) {
      case "rooms":
      case "seaLine":
      case "capacity":
        q[key] = parseInt(value);
        break;
      case "name":
      case "network":
        q[key] = { $regex: value, $options: "i" };
        break;
      case "kitchen":
        q[key] = value === "true";
        break;
      default:
        // Handle unknown parameters if needed
        break;
    }
  });

  try {
    await connectToDB();
    const aparts = await Apart.find(q).exec();

    if (aparts.length < 1) {
      return new Response({
        message: "No match within these query parameters",
        status: 404,
      });
    }

    return new Response(JSON.stringify(aparts), { status: 200 });
  } catch (err) {
    return new Response("error with querying ", {
      status: 500,
    });
  }
};
