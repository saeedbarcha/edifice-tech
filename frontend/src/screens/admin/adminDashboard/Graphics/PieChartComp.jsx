import React, { useState } from "react";
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer, Legend } from "recharts";
import { useGetAdmissionEnrollmentsDetailQuery } from "../../../../slices/adminDashboardApiSlice";
import { Form, Select } from 'react-bootstrap';
import "./Style.css";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]; // Define colors for each segment

const PieChartComp = () => {
  const { data: admissionEnrollmentDetail, isLoading, error } = useGetAdmissionEnrollmentsDetailQuery();
   
  const [indexVal, setIndexVal] = useState(0);
  const [selectedBatch, setSelectedBatch] = useState("select");


   
  if (isLoading) return <p>Loading admission enrollment details...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // const coursesData = admissionEnrollmentDetail[indexVal]?.courses || []; // Handle potential undefined courses
  const coursesData = admissionEnrollmentDetail[admissionEnrollmentDetail.length -1 ]?.courses || [];
   const pieChartData = coursesData.map((course) => ({
    name: course.name,
    value: course.enrollments, 
   }));


  return (
    <div className="chartContainer">
      <div className="chartTitleContainer">
        <h6>Enrollments Progress</h6>
        <Form.Select aria-label="Select Batch" value={selectedBatch} onChange={(e) => setIndexVal(e.target.key)}>
        
          {admissionEnrollmentDetail?.map((batch, index) => (
            <option key={index} value={batch._id}>{batch.admissionBatchName}</option>
          ))}
        </Form.Select>
      </div>
      <h1 className="chart-heading">Courses</h1>
      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={pieChartData} 
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={150}
            fill="#8884d8"
            label
          >
            {pieChartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};


export default PieChartComp;
