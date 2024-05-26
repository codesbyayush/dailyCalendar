import { tailwindColors } from "../data";
import { useState, useEffect, useRef } from "react";

export default function DrawEvent(props) {
  const { start: st, width: wi, setObjRes, setData, res, objRes } = props;

  const [start, setStart] = useState(st);
  const [width, setWidth] = useState(wi);
  const [dragst, setDragSt] = useState();

  const colorIndex = useRef(Math.floor(Math.random()*56))

  // Effect to update the global data state when start or width changes
  useEffect(() => {
    setData((prevData) => {
      const newData = [...prevData];
      const eventIndex = newData[res].findIndex(event => event.id === props.objRes.id);
      if (eventIndex > -1) {
        newData[res][eventIndex] = {
          ...newData[res][eventIndex],
          start: (start ) , // Convert back to original units
          width: (width ) 
        };
        // Sort events by start time after updating
        newData[res].sort((a, b) => a.start - b.start);
      }
      return newData;
    });
  }, [start, width, setData, res, props.objRes.id]);



  const handleKeyDown = (event) => {
    if (event.key === 'Backspace') {
      event.preventDefault();
      const confirmDelete = window.confirm("Do you really want to delete this event?");
      if (confirmDelete) {
        setData((prevData) => {
          const newData = [...prevData];
          const resourceEvents = newData[res];
          const eventIndex = resourceEvents.findIndex(event => event.id === objRes.id);
          if (eventIndex > -1) {
            resourceEvents.splice(eventIndex, 1);
          }
          return newData;
        });
      }
    }
  };

  return (
    <div
      className={`absolute ${tailwindColors[colorIndex.current]} opacity-80 focus:opacity-100 hover:opacity-100 rounded-lg text-ellipsis pl-2 pr-2 py-2 whitespace-nowrap overflow-hidden z-30 group min-w-0 flex`}
      style={{ width: `${width}px`, left: `${start}px` }}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      
    >
      <button
        className="rounded  h-full w-4 hidden absolute group-hover:block group-focus:block top-0 left-0 cursor-ew-resize"
        draggable
        onDragStartCapture={(e) => {
          setDragSt(e.clientX);
        }}
        onDragEndCapture={(e) => {
          const newWidth = width - e.clientX + dragst;
          setWidth(newWidth > 0 ? newWidth : 2);
          const newStart = start + e.clientX - dragst;
          setStart(newStart > 0 ? newStart : 2);
        }}
      >
        <span className="rounded-full bg-black h-2 w-2 hidden absolute -left-0.5 top-1/3 group-hover:block group-focus:block translate-y-1/3"></span>
      </button>
      <p
className="w-full cursor-move text-sm font-semibold"
        draggable
        onDragStartCapture={(e) => {
          setDragSt(e.clientX);
        }}
        onDragStart={(e) => {
          const eventData = { id: props.objRes.id, res: props.objRes.res };
          e.dataTransfer.setData("text/plain", JSON.stringify(eventData));
        }}
        onDragEndCapture={(e) => {
          const newStart = start + e.clientX - dragst;
          setStart(newStart > 0 ? newStart : 2);
        }}>
      <span>New Event</span><br />
      <span className="text-xs text-ellipsis overflow-hidden">{`From ${(parseInt(st) % (24 * 4)/4)}hrs to ${(parseInt(st+wi) % (24 * 4)/4)}hrs`}</span>
      </p>
      <button
        className="rounded  h-full w-4 hidden absolute group-hover:block group-focus:block top-0 right-0 cursor-ew-resize"
        draggable
        onDragStartCapture={(e) => {
          setDragSt(e.clientX);
        }}
        onDragEndCapture={(e) => {
          const newWidth = width + e.clientX - dragst;
          setWidth(newWidth > 0 ? newWidth : 2);
        }}
      >
        <span className="rounded-full bg-black h-2 w-2 hidden absolute -right-0.5 top-1/3 group-hover:block group-focus:block translate-y-1/3"></span>
      </button>
    </div>
  );
}