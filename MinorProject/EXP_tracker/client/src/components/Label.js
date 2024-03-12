import React from 'react';
import { default as api } from '../store/apiSlice';
import { getLabels } from '../helper/helper';

function LabelComponent({ data }) {
  if (!data) return <></>;

  return (
    <div className="labels flex justify-between py-2">
      <div className="flex gap-2">
        <div className='w-2 h-2 rounded py-4' style={{ backgroundColor: data.color }}></div>
        <h3 className='text-md'>
          {data.type}
        </h3>
      </div>
      <h3 className='font-bold'>{Math.round(data.percent)}%</h3>
    </div>
  );
}

export default function Label() {
  const { data, isFetching, isSuccess, isError } = api.useGetLabelsQuery(); // Fix the import

  let Transactions;

  if (isFetching) {
    Transactions = <div>Fetching</div>;
  } else if (isSuccess && data && data.length > 0) { // Check if data is not empty
    Transactions = getLabels(data).map((item, i) => <LabelComponent key={i} data={item} />);
  } else if (isError) {
    Transactions = <div>Error</div>;
  }

  return (
    <div>
      <div>
        {Transactions}
      </div>
    </div>
  );
}
