// useGetData hook for converting JSON data (north / east - long / lat).
import { useEffect } from "react";

// interface Gym {
//     id: number;
//     name: string;
//     // Add other properties as needed
// }

//const apiURL = "https://apigw.stockholm.se/noauth/virtualhittaservicedmz/rest/serviceunits/" + [id];
const apiURL =
  "https://apigw.stockholm.se/NoAuth/VirtualhittaserviceDMZ/Rest/serviceunits?&filter[servicetype.id]=122&page[limit]=1500&page[offset]=0&sort=name";

export const UseGetData = () => {
  useEffect(() => {
    fetchGymLocations();
    getImage();
    getGymInfo();
  }, []);

  //fetch all gym information
  async function fetchGymLocations() {
    try {
      const response = await fetch(apiURL);
      const responseJson = await response.json();
      const uteGyms = responseJson.data;
      //                console.log(uteGyms)
      const arronData = uteGyms.map((uteGym: any) => ({
        address: uteGym.attributes.address,
        //            location: uteGym.attributes.location.north + ", " + uteGym.attributes.location.east,
        //            id: uteGym.id,
      }));

      //           const ids = JSON.stringify(arronData)
      //           console.log(arronData)
      //           const ids2 = ids.replace(/{"id":"/g, '"');
      //           console.log(ids2)
      //           const ids3 = ids2.replace(/"},/g, '", ');
      //           console.log(ids3)
      //           const idArray = ids3.replace(/"}/g, '"');
      //           console.log(idArray)
      //           getGymInfo()
    } catch (error) {
      console.error("Error fetching gym locations: ", error);
      return [];
    }
  }

  async function getImage() {
    const imageURL =
      "https://apigw.stockholm.se/noauth/virtualhittaservicedmz/rest/serviceunits/12756/image";
    //        const imageURL = `https://apigw.stockholm.se/noauth/virtualhittaservicedmz/rest/serviceunits/${id}/image`

    try {
      const response = await fetch(imageURL);
      const responseJson = await response.json();
      const info = responseJson.data;
      const image = info.attributes.base64Data;
      //            console.log(image)  add below into your return (hook)
      //            <img src={`data:image/jpeg;base64,${image}`} />
    } catch (error) {
      console.error("Error fetching gym locations: ", error);
      return [];
    }
  }

  // fetch a single specific gym information
  async function getGymInfo() {
    const gymIds = [
      "12756",
      "15335",
      "14997",
      "15474",
      "15453",
      "12757",
      "14826",
      "13617",
      "15486",
      "13619",
      "14827",
      "15160",
      "12752",
      "13620",
      "12753",
      "13621",
      "13623",
      "15209",
      "14829",
      "13680",
      "13625",
      "13627",
      "13628",
      "15316",
      "14993",
      "12754",
      "14825",
      "13629",
      "12769",
      "13678",
      "13630",
      "13631",
      "14749",
      "15425",
      "14828",
      "13632",
      "14745",
      "15072",
      "12758",
      "13633",
      "15242",
      "13634",
      "13635",
      "14569",
      "12759",
      "13636",
      "13637",
      "15208",
      "13638",
      "15336",
      "14746",
      "14969",
      "14992",
      "13639",
      "14991",
      "12772",
      "13640",
      "15317",
      "13641",
      "13642",
      "13643",
      "13713",
      "13644",
      "13645",
      "15275",
      "13646",
      "12760",
      "13647",
      "13648",
      "13649",
      "13650",
      "13651",
      "12771",
      "13652",
      "12770",
      "13653",
      "15176",
      "14799",
      "13654",
      "13655",
      "13656",
      "15528",
      "13657",
      "15454",
      "13658",
      "13659",
      "15315",
      "13660",
      "15198",
      "14823",
      "13661",
      "15299",
      "13663",
      "13675",
      "12762",
      "13662",
      "13676",
      "12763",
    ];

    for (const id of gymIds) {
      const gymApiURL = `https://apigw.stockholm.se/noauth/virtualhittaservicedmz/rest/serviceunits/${id}`;

      try {
        const response = await fetch(gymApiURL);
        const responseJson = await response.json();
        const shit = responseJson.data;

        //                console.log(shit)

        //                console.log(shit.attributes.name)
        //                console.log(shit.attributes.shortDescription)
        //                console.log(shit.attributes.contentSections[17].content)

        //                const gymData = gyms.map((gym: any) => ({
        //                    description: gym.attributes.address,
        //                    id: gym.id,
        //                    }));

        //                    console.log(gymData)
      } catch (error) {
        console.error("Error fetching gym locations: ", error);
        return [];
      }
    }
  }

  //    try {
  //        const response = await fetch(apiURL);
  //        const responseJson = await response.json();
  ////        const uteGyms = responseJson.data;

  //        const arronData = uteGyms.map((uteGym: any) => ({
  //            name: uteGym.attributes.name,
  //            address: uteGym.attributes.address,
  //            location: uteGym.attributes.location.north + ", " + uteGym.attributes.location.east,
  //            id: uteGym.id,
  //            }));
  //            console.log(uteGyms)
  //        }

  //        catch (error) {
  //            console.error('Error fetching gym locations: ', error);
  //            return [];
  //            }
  //    }

  //    const imageUrl = ""
  //        return this <img src={`data:image/jpeg;base64,${imageUrl}`} />
  //        <img src={`data:image/jpeg;base64,${image}`} />

  return (
    <>
      <h1>UseGetData</h1>
    </>
  );
};
