
import { connectToDB } from '@utils/database'; 
import { Apart } from '@models/apartment'; 

export const GET = async(req, res) =>{

  try {
      await connectToDB(); 
      console.log('hello from connected')

    const apartments = await Apart.find({});
    if (apartments.length < 1) {
      return new Response ({ status: 404, success: false, error: 'No match' });
    }

    const roomsSet = Array.from(new Set(apartments.map((apartment) => apartment.rooms)));
    const seaLineSet = Array.from(new Set(apartments.map((apartment) => apartment.seaLine)));

      const numberOfnonOccupied = apartments.filter( ( apartment ) => !apartment.occupied ).length;
      
           const responseData = {
            roomsSet,
            seaLineSet,
            apartments,
            numberOfnonOccupied
        };

    return new Response (JSON.stringify(responseData));
  } catch (error) {
    return new Response ({ success: false, error: error.message });
  }
}
