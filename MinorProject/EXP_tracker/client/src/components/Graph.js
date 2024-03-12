import React from 'react'
import Label from './Label';
import {Chart, ArcElement} from 'chart.js';
import {Doughnut} from 'react-chartjs-2';
import {chart_Data, getTotal} from '../helper/helper'
import { default as api } from '../store/apiSlice';
Chart.register(ArcElement);




export default function Graph() {
  const { data, isFetching, isSuccess, isError } = api.useGetLabelsQuery(); // Fix the import

  let graphData;
  

  if (isFetching) {
    graphData = <div>Fetching</div>;
  } else if (isSuccess && data && data.length > 0) { // Check if data is not empty
    chart_Data(data)
    graphData =<Doughnut {...chart_Data(data)}></Doughnut>
  } else if (isError) {
    graphData = <div>Error</div>;
  }
  return (
    <div className='flex justify-content max-w-xs mx-auto'>
        <div className='item'>
            <div style={{position:'relative'}} className='chart relative'>
            {graphData}
                <h3 style={{  position: 'absolute', left: '0', right:'0',top:'40%', }} className='title mb-4 font-bold'>Total
                <span className='block text-3xl text-emerald-400'>₹ {getTotal(data)??0}</span>
                </h3>
            </div>
            <div className='flex flex-col py-10 gap-4'>
               <Label/>
            </div>
        </div>
    </div>
  )
}
