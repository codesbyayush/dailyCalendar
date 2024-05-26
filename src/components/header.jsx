function Header({ onMonthChange, currentDate }) {
  const handleMonthChange = (offset) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + offset);
    onMonthChange(newDate);
  };

  return (
    <div className="sticky top-0 flex w-full bg-gray-50 justify-between px-4 text-2xl font-semibold text-blue-500 py-2 z-50 items-center">
      <h1>{currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}</h1>
      <div className='flex gap-3 text-base items-center justify-between'>
        <button onClick={() => handleMonthChange(-1)} className=' font-bold'>{'<'}</button>
        <button onClick={() => handleMonthChange(0)} className=''>Today</button>
        <button onClick={() => handleMonthChange(1)} className=' font-bold'>{'>'}</button>
      </div>
    </div>
  );
}

export default Header;