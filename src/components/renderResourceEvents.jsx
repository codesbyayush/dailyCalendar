import DrawEvent from "./drawEvent";
import { useState } from "react";


export default function RenderEvent(props) {
  const [objRes, setObjRes] = useState();
  const setData = props.setdata;
  const res = props.res;
  const arr = props.propsData[res];
  const dates = props.dates

  const addNewEvent = (date) => {
    setData((data) => {
      const newEvent = {
        id: Date.now(),
        start: (date - 1) * 24 * 4,
        width: 24 * 4,
      };
      const newdata = [...data];
      if (!newdata[res]) {
        newdata[res] = [newEvent];
      } else {
        newdata[res].push(newEvent);
        // Sort events by start time
        newdata[res].sort((a, b) => a.start - b.start);
      }
      return newdata;
    });
  };

  // Change of resource handler for an event
  const resChange = (e) => {
    e.preventDefault();

    const eventData = JSON.parse(e.dataTransfer.getData("text/plain"));
    
    if (eventData.res === res) return;
    setData((prevData) => {
      const newData = [...prevData];
      // Find and remove the event object from its original resource
      const originalResourceIndex = eventData.res;
      const eventIndex = newData[originalResourceIndex].findIndex(event => event.id === eventData.id);
      if (eventIndex > -1) {
        const [eventObj] = newData[originalResourceIndex].splice(eventIndex, 1);
        // Add the event object to the current resource
        newData[res].push(eventObj);
        // Sort events by start time
        newData[res].sort((a, b) => a.start - b.start);
      }
      return newData;
    });
  };

  // Layout algorithm to position events in non-overlapping rows
  const layoutEvents = (events) => {
    const rows = [];
    events.forEach(event => {
      let placed = false;
      for (let i = 0; i < rows.length && !placed; i++) {
        let overlap = false;
        for (let j = 0; j < rows[i].length; j++) {
          const currentEvent = rows[i][j];
          if (!(event.start >= currentEvent.start + currentEvent.width || event.start + event.width <= currentEvent.start)) {
            overlap = true;
            break;
          }
        }
        if (!overlap) {
          rows[i].push(event);
          placed = true;
        }
      }
      if (!placed) {
        rows.push([event]);
      }
    });
    return rows;
  };

  const eventRows = layoutEvents(arr || []);

  return (
    <>
      <div
        className="w-full h-full relative"
        onDrop={(e) => {
          resChange(e);
        }}
        onDragOver={(e) => e.preventDefault()}
      >
        <div className="absolute w-full h-full grid grid-flow-col grid-cols-31 mt-0">
          {dates.map((date) => (
            <button
              key={date}
              className="border col-span-1 h-full py-2"
              onDoubleClickCapture={() => addNewEvent(date)}
            ></button>
          ))}
        </div>
        <div style={{ gridTemplateRows: `repeat(${eventRows.length}, 60px)`}} className="grid gap-2 py-2">
        {eventRows.map((row, rowIndex) => (
          <div key={rowIndex} className="grid gap-2 w-0 py-2 px-0.5 relative">
            {row.map((entry, ind) => (
              <DrawEvent
                key={entry.id}
                start={entry.start}
                width={entry.width}
                objRes={{ id: entry.id, res: res }}
                setObjRes={setObjRes}
                res={res}
                setData={setData}
              />
            ))}
          </div>
        ))}
        </div>
      </div>
    </>
  );
}

