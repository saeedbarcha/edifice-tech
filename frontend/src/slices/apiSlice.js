import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants';


const baseQuery = fetchBaseQuery({ baseUrl:BASE_URL });

export const apiSlice = createApi({
    baseQuery,
    tagTypes:['Products', 'Users', 'Blogs', 'Education', 'Experience', 'Projects', 'Gallery', 'About Company', 'Course', 'Service', 'Upload Iamge', 'Admission Batch', 'Enrollment', 'Faqs', 'Reviews', 'Admin Dashboard'],
    endpoints: (builder) =>({}),
});