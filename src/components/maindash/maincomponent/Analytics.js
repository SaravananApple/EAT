import React, { useState } from "react";
import Chart from "react-apexcharts";
import "../maincomponent/Analytics.css";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const Analytics = () => {
  const [line, setLine] = useState(false);
  const [bar, setBar] = useState(false);
  const [pie, setPie] = useState(false);
  const data = {
    options: {
      title: {
        text: "Sales",
        align: "left",
      },
      chart: {
        id: "apexchart-example",
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
        title: {
          text: "Year",
        },
      },
      yaxis: {
        title: {
          text: "Series",
        },
      },
      grid: {
        show: true,
      },
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: "smooth",
      },
    },
    series: [
      {
        name: "series-1",
        data: [30, 40, 35, 50, 49, 60, 70, 100, 300],
      },
    ],
  };

  const pieChart = {
    options: {
      chart: {
        width: 100,

        type: "pie",
        toolbar: {
          show: true,
          tools: {
            download: true,
            selection: true,
            zoom: true,
            zoomin: true,
            zoomout: true,
            pan: true,
            reset: true,
          },
        },
      },
      dataLabels: {
        enabled: true,
      },
      legend: {
        show: true,
      },

      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
      labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
    },
    series: [44, 55, 13, 43, 22],
  };

  const [selectedCity, setSelectedCity] = useState(null);
  const cities = [
    { name: "TODAY", code: "NY" },
    { name: "WEEK", code: "RM" },
    { name: "YEAR", code: "LDN" },
  ];

  return (
    <>
      {/* <div className="line">
        {line && (
          <Chart
            options={data.options}
            series={data.series}
            type="line"
            width={800}
            height={600}
          />
        )}
        {bar && (
          <Chart
            options={data.options}
            series={data.series}
            type="bar"
            width={800}
            height={600}
          />
        )}
        {pie && (
          <Chart
            options={pieChart.options}
            series={pieChart.series}
            type="pie"
            width={800}
            height={600}
          />
        )}
      </div>

      <div className="flex justify-content-around flex-wrap chart">
        <div className="flex align-items-center justify-content-center  h-4rem  font-bold border-round-3xl  text-xl chart">
          <Button
            label="Line Chart"
            severity="warning"
            onClick={() => {
              setLine(true);
              setBar(false);
              setPie(false);
            }}
          />
        </div>
        <div className="flex  align-items-center justify-content-center  ml-8 w-26rem h-4rem   font-bold  border-round-3xl text-xl chart">
          <Button
            label="Bar Chart"
            severity="info"
            onClick={() => {
              setLine(false);
              setBar(true);
              setPie(false);
            }}
          />
        </div>
        <div className="flex  align-items-center justify-content-center ml-8 w-26rem  h-4rem  font-bold border-round-3xl  text-xl chart">
          <Button
            label="Pie Chart"
            severity="danger"
            onClick={() => {
              setLine(false);
              setBar(false);
              setPie(true);
            }}
          />
        </div>
        <div className="flex  align-items-center justify-content-center  ml-8 h-4rem  font-bold border-round-3xl  text-xl chart">
          <Button
            label="Line Chart"
            severity="success"
            onClick={() => {
              setLine(true);
              setBar(false);
              setPie(false);
            }}
          />
        </div>
      </div> */}
      <div className="flex gap-10">
        <div className=" surface-ground grid gap-6 md:gap-8 md:px-6 lg:grid-cols-2 ml-7 mt-3 border-round-xl ">
          <div>
            <CardContent>
              <Typography
                className="font-bold"
                color="text.secondary"
                gutterBottom
              >
                File Counts
              </Typography>
              <Chart
                options={data.options}
                series={data.series}
                type="line"
                width={600}
                height={450}
              />
            </CardContent>
          </div>
        </div>
        <div className=" surface-ground grid gap-6 md:gap-8 md:px-6 lg:grid-cols-2 ml-7 mt-3 border-round-xl">
          <div>
            <CardContent>
              <Typography
                className="font-bold"
                color="text.secondary"
                gutterBottom
              >
                Error Counts
              </Typography>
              <Chart
                options={data.options}
                series={data.series}
                type="bar"
                width={600}
                height={450}
              />
            </CardContent>
          </div>
        </div>
      </div>
      <div className=" surface-ground grid gap-6 md:gap-8 md:px-6 lg:grid-cols-2 ml-7 mt-3 border-round-xl">
        <div>
          <CardContent className="ml-3">
            <Typography
              className="font-bold"
              color="text.secondary"
              gutterBottom
            >
              Error Correction
            </Typography>

            <div className="ml-36">
              <Chart
                options={pieChart.options}
                series={pieChart.series}
                type="pie"
                width={800}
                height={380}
              />
            </div>
          </CardContent>
        </div>
      </div>
    </>
  );
};

export default Analytics;
