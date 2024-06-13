import React from "react";
import { Form } from "react-bootstrap";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, Tooltip } from 'recharts';
const pdata = [
  {
    name: 'Python',
    student: 13,
    fees: 10
  },
  {
    name: 'Javascript',
    fees: 12
  },
  {
    name: 'PHP',
    fees: 10
  },
  {
    name: 'Java',
    student: 10,
    fees: 5
  },
  {
    name: 'C#',
    student: 9,
    fees: 4
  },
  {
    name: 'C++',
    student: 10,
    fees: 8
  },
];

const BarChartComp = () => {
  return (
    <>
      <div className="chartContainer">
        <div className="chartTitleContainer">
          <h6>Enrollments Progress</h6>
          {/* <Form.Select aria-label="Select Batch" value={selectedBatch} onChange={(e) => setSelectedBatch(e.target.value)}> */}
          <Form.Select aria-label="Select Batch" style={{ with: "200px" }}>

            {/* {allBatches?.map((batch) => (
              <option key={batch._id} value={batch._id}>{batch.title}</option>
            ))} */}
          </Form.Select>
        </div>
        <h1 className="chart-heading">Courses</h1>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart className="barChart" data={pdata} margin={{ top: 20, right: 50, left: 20, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" /> {/* Adjust strokeDasharray for a subtle grid pattern */}
            <XAxis dataKey="name" interval="preserveStartEnd" tick={{ dx: -10 }} tickFormatter={(value) => value + " Programming"} />
            <YAxis dataKey="student" interval="preserveStartEnd" />
            <Tooltip contentStyle={{ backgroundColor: 'brown', padding: '10px' }} /> {/* Add padding for better readability */}
            <Legend />
            <Bar dataKey="student" strokeWidth={10} stroke="#ff0000" activeDot={{ r: 8 }} fill="#ff0000" type="monotone" /> {/* Red bars with activeDot */}
            <Bar dataKey="fees" strokeWidth={5} stroke="#007bff" activeDot={{ r: 4 }} fill="#007bff" type="natural" /> {/* Blue bars with activeDot */}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default BarChartComp;