/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-expressions */
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

const DataLoader = (props : {itemID : number}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<ItemDetails>();
  const { itemID } = props;

  useEffect(() => {
    let didCancel = false;
    async function fetchData() {
      !didCancel && setIsLoading(true);
      try {
        const response = await OSRS.getFromOfficialAPI(itemID);
        !didCancel && setData(response);
      } catch (error) {
        // Do something with error
      } finally {
        !didCancel && setIsLoading(false);
      }
    }
    fetchData();
    return () => { didCancel = true; };
  }, [props.itemID]);

  return isLoading ? (
    <tr>
      <td>Loading</td>
      <td>Loading</td>
      <td>Loading</td>
    </tr>
  ) : (
    <tr>
      <td>
        <img src={data?.icon} alt={`icon of ${data?.name}`} />
        {data?.name}
      </td>
      <td>{data?.current.price}</td>
    </tr>
  );
};

function Item() {
  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  const { id } = useParams<any>();

  const data = (
    <table>
      <tbody>
        <tr>
          <td>Item</td>
          <td>Price</td>
          <td>Change</td>
        </tr>
        <DataLoader itemID={id as any} />
      </tbody>
    </table>
  );

  return (
    <div>
      <h3>
        {data}
      </h3>
    </div>
  );
}

export default Item;
