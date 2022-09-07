import {FirebaseAdmin} from "../../utils/firebase/FirebaseAdmin.js";
import {SMSHelper} from "../../utils/SMSHelper.js";

export async function get({request, url}) {
    await FirebaseAdmin.auth().verifyIdToken(request.headers.get("authorization"));

    const clients = await FirebaseAdmin.getCollectionArray("clients");
    let failed = [];

    // await Promise.all(clients.map(async (client) => {
    //     if (client?.phoneNumber) {
    //         try {
    //             await SMSHelper.sendText(client.phoneNumber,
    //                 `Balanced Aesthetics: New Revolutionary FDA Approved Weight Loss Supplement Semaglutide is Changing Lives!\n\nGet 2 Weeks On Us When You Order 2 Months or More!\n\nOur Patients on Average See 21% Weight Loss. No Restrictive Diet or Intense Exercise!\n\nSchedule Your Consultation Today!\n\n470-205-4019`
    //             )
    //         } catch (error) {
    //             failed.push(client);
    //             console.error(error);
    //         }
    //
    //     }
    // }))

    console.log("FAILED", failed);

    return {
        status: 200,
        body: {}
    }
}