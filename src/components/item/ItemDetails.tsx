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
  const [data, setData] = useState('');

  useEffect(() => {
    let didCancel = false;
    async function fetchData() {
      !didCancel && setIsLoading(true);
      try {
        const response = await OSRS.getFromOfficialAPI(props.itemID);
        !didCancel && setData(response.name);
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
    </tr>
  ) : (
    <tr>
      <td>{data}</td>
      <td>{data}</td>
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
          <td>item</td>
          <td>price</td>
        </tr>
        <DataLoader itemID={id as any} />
      </tbody>
    </table>
  );

  return (
    <div>
      <h3>
        ID:
        {id}
        {data}
      </h3>
    </div>
  );
}

export default Item;
