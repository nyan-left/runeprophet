/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import {
  useParams,
} from 'react-router-dom';
import * as OSRS from 'osrs-trade-stats';

type Await<T> = T extends {
    then(onfulfilled?: (value: infer U) => unknown): unknown;
} ? U : T;

type ItemDetails = Await<ReturnType<typeof OSRS.getFromOfficialAPI>>;

function Item() {
  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  const { id } = useParams<any>();
  const [itemDetails, setItemDetails] = useState<ItemDetails>();

  useEffect(() => {
    // OSRS.getFromOfficialAPI(id).then((item) => {
    //   setItemDetails(item);
    // });
  }, []);

  // const data = (
  //   <table>
  //     <tbody>
  //       <tr>
  //         <td>item</td>
  //         <td>price</td>
  //       </tr>
  //       <tr>
  //         <td>{itemDetails?.name}</td>
  //         <td>{itemDetails?.current.price}</td>
  //       </tr>
  //     </tbody>
  //   </table>
  // );

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
