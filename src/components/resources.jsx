import { useState } from "react";
import { useEffect } from "react";
import { resources, exdata } from "../data";
import RenderEvent from "./renderResourceEvents";




export default function Resources({ currentDate }) {
  const monthKey = currentDate.getMonth() + 1; // Get current month as key

  // Initialize state from local storage or use default data from exdata
  const [data, setData] = useState(() => {
    const storedData = localStorage.getItem('resourceData');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      return parsedData[monthKey] || exdata[monthKey] || [];
    }
    return exdata[monthKey] || [];
  });
  const daysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const [dates, setDates] = useState([]);
  useEffect(() => {
    const daysCount = daysInMonth(currentDate);
    const newDates = [];
    for (let i = 1; i <= daysCount; i++) {
      newDates.push(i);
    }
    setDates(newDates);
    setData(() => {
    const storedData = localStorage.getItem('resourceData');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      return parsedData[monthKey] || exdata[monthKey] || [];
    }
    return exdata[monthKey] || [];
  })
  }, [currentDate]);

  // Update local storage whenever data changes
  useEffect(() => {
    const storedData = localStorage.getItem('resourceData');
    const newData = storedData ? JSON.parse(storedData) : {};
    newData[monthKey] = data;
    localStorage.setItem('resourceData', JSON.stringify(newData));
  }, [data]);

  return (
    <div className="grid h-screen overflow-scroll w-full relative scrollbar-custom">
      <div
        className={`grid grid-cols-34 sticky top-0 z-50 bg-white items-center`}
      >
        <div className="col-span-3 whitespace-nowrap h-full sticky left-0 bg-white border py-1"></div>
        {dates.map((date) => (
          <div
            key={date}
            className={`col-span-1 border px-2 py-1 whitespace-nowrap ${date === currentDate.getDate() ? 'bg-blue-500 rounded text-white' : ''}`}
          >
            {date}  {currentDate.toLocaleString('default', { month: 'long' })}
          </div>
        ))}
      </div>
      {resources.map((res) => {
        return (
          <div key={res} className={`grid grid-cols-34`}>
            <div className="col-span-3 whitespace-nowrap h-full sticky left-0 bg-white z-40 pl-6 pr-4 py-4 border font-semibold">
              Resource - {res.toString()}
            </div>
            <div className="col-span-31 space-y-2">
              <RenderEvent propsData={data} setdata={setData} res={res} dates={dates}/>
            </div>
          </div>
        );
      })}
    </div>
  );
}

