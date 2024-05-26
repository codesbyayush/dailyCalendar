import React, { useState } from "react";
import Header from "./components/header";
import Resources from "./components/resources";

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleMonthChange = (newDate) => {
    if(newDate.getMonth() === (new Date()).getMonth()){
      setCurrentDate(new Date());
      return;
    }
    setCurrentDate(newDate);
  };

  return (
    <>
      <div className="h-full">
        <Header onMonthChange={handleMonthChange} currentDate={currentDate} />
        <Resources currentDate={currentDate} />
      </div>
    </>
  );
}

export default App;