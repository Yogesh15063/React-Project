import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseURI = 'http://localhost:8080';

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: baseURI }), // Fix the typo here
  endpoints: (builder) => ({
    // get categories
    getCategories: builder.query({
      query: () => '/api/categories',
      providesTags:['categories'],
    }),
    // get labels
    getLabels: builder.query({
      query: () => '/api/labels',
      providesTags: ['transaction'] 
    }),
    // add new Transaction
    addTransaction: builder.mutation({
      query: (initialTransaction) => ({
        //post:'http://localhost:8080/api/transaction'
        url: '/api/transaction',
        method: "POST",
        body:initialTransaction
      }),
      invalidatesTags:['transaction']
    }),
    //delete record
    deleteTransaciton:builder.mutation({
        query:recordId=>({
            url:'/api/transaction',
            method:"DELETE",
            body:recordId
        }),
        invalidatesTags:['transaction']
    })
  }),
});

export const { useGetLabelsQuery } = apiSlice; 

export default apiSlice;
