/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import {
  useParams,
} from 'react-router-dom';
import * as OSRS from 'osrs-trade-stats';

// type Await<T> = T extends {
//     then(onfulfilled?: (value: infer U) => unknown): unknown;
// } ? U : T;

// type ItemDetails = Await<ReturnType<typeof OSRS.getFromOfficialAPI>>;

// const DataLoader = (props : {itemID : number}) => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [data, setData] = useState<ItemDetails>();
//   const { itemID } = props;

//   useEffect(() => {
//     let didCancel = false;
//     async function fetchData() {
//       !didCancel && setIsLoading(true);
//       try {
//         const response = await OSRS.getFromOfficialAPI(itemID);
//         !didCancel && setData(response);
//       } catch (error) {
//         // Do something with error
//       } finally {
//         !didCancel && setIsLoading(false);
//       }
//     }
//     fetchData();
//     return () => { didCancel = true; };
//   }, [props.itemID]);

//   return isLoading ? (
//     <tr>
//       <td>Loading</td>
//       <td>Loading</td>
//     </tr>
//   ) : (
//     <tr>
//       <td>{data?.name}</td>
//       <td>{data?.current.price}</td>
//       <td>{data?.current}</td>
//     </tr>
//   );
// };

function Item() {
  const { id } = useParams<any>();

  return (
    <div>
      <h3>
        ID:
        {id}
      </h3>
    </div>
  );
}

export default Item;
