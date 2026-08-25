import { useEffect, useRef } from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import flatpickr from "flatpickr";
import ChartTab from "../common/ChartTab";
import { CalenderIcon } from "../icons";

export default function StatisticsChart() {
  const datePickerRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!datePickerRef.current) return;

    const today = new Date();

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 6);

    const fp = flatpickr(datePickerRef.current, {
      mode: "range",
      static: true,
      monthSelectorType: "static",
      dateFormat: "M d",
      defaultDate: [sevenDaysAgo, today],
      clickOpens: true,

      prevArrow:
        '<svg class="stroke-current" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.5 15L7.5 10L12.5 5" stroke="" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',

      nextArrow:
        '<svg class="stroke-current" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 15L12.5 10L7.5 5" stroke="" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    });

    return () => {
      fp.destroy();
    };
  }, []);

  const options: ApexOptions = {
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "area",
      height: 310,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },

    colors: ["#465FFF", "#9CB9FF"],

    legend: {
      show: false,
    },

    stroke: {
      curve: "straight",
      width: [2, 2],
    },

    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0,
      },
    },

    markers: {
      size: 0,
      strokeColors: "#fff",
      strokeWidth: 2,

      hover: {
        size: 6,
      },
    },

    grid: {
      xaxis: {
        lines: {
          show: false,
        },
      },

      yaxis: {
        lines: {
          show: true,
        },
      },

      padding: {
        left: 0,
        right: 0,
      },
    },

    dataLabels: {
      enabled: false,
    },

    tooltip: {
      enabled: true,

      x: {
        format: "dd MMM yyyy",
      },
    },

    xaxis: {
      type: "category",

      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],

      axisBorder: {
        show: false,
      },

      axisTicks: {
        show: false,
      },

      tooltip: {
        enabled: false,
      },
    },

    yaxis: {
      labels: {
        style: {
          fontSize: "12px",
          colors: ["#6B7280"],
        },
      },

      title: {
        text: "",
      },
    },

    responsive: [
      {
        breakpoint: 640,

        options: {
          chart: {
            height: 280,
          },

          xaxis: {
            labels: {
              style: {
                fontSize: "10px",
              },
            },
          },

          yaxis: {
            labels: {
              style: {
                fontSize: "10px",
              },
            },
          },
        },
      },
    ],
  };

  const series = [
    {
      name: "Sales",

      data: [
        180,
        190,
        170,
        160,
        175,
        165,
        170,
        205,
        230,
        210,
        240,
        235,
      ],
    },

    {
      name: "Revenue",

      data: [
        40,
        30,
        50,
        40,
        55,
        40,
        70,
        100,
        110,
        120,
        150,
        140,
      ],
    },
  ];

  return (
    <div className="w-full min-w-0 overflow-hidden rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">

      {/* Header */}
      <div className="mb-6 flex min-w-0 flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        {/* Title */}
        <div className="min-w-0">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Statistics
          </h3>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Target you've set for each month
          </p>
        </div>

        {/* Controls */}
        <div className="flex min-w-0 flex-wrap items-center gap-3 lg:justify-end">

          <ChartTab />

          {/* Date Picker */}
          <div className="relative inline-flex shrink-0 items-center">

            <CalenderIcon
              className="
                pointer-events-none
                absolute
                left-1/2
                top-1/2
                z-10
                size-5
                -translate-x-1/2
                -translate-y-1/2
                text-gray-500
                dark:text-gray-400
                lg:left-3
                lg:translate-x-0
              "
            />

            <input
              ref={datePickerRef}
              type="text"
              placeholder="Select date range"
              className="
                h-10
                w-10
                cursor-pointer
                rounded-lg
                border
                border-gray-200
                bg-white
                text-transparent
                outline-none
                dark:border-gray-700
                dark:bg-gray-800
                lg:w-40
                lg:pl-10
                lg:pr-3
                lg:text-gray-700
                dark:lg:text-gray-300
              "
            />
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="w-full min-w-0 overflow-hidden">
        <Chart
          options={options}
          series={series}
          type="area"
          height={310}
          width="100%"
        />
      </div>
    </div>
  );
}