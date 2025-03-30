import React from 'react'
import changes from "./changes"
import Change from "../../components/Change"

interface ChangeType {
  id: string;
  title: string;
  desc: string;
  date: string;
  iconPath: string;
}

const Home = () => {
  // Sort changes by date (most recent first)
  const sortedChanges = [...changes].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Get today's changes
  const todayChanges = sortedChanges.filter(change => {
    const changeDate = new Date(change.date);
    const today = new Date('2025-03-30');
    return changeDate.toDateString() === today.toDateString();
  });

  // Get other changes
  const previousChanges = sortedChanges.filter(change => {
    const changeDate = new Date(change.date);
    const today = new Date('2025-03-30');
    return changeDate.toDateString() !== today.toDateString();
  });

  return (
    <main className='w-full h-full flex items-center justify-center flex-col gap-8'>
      {/* Today's Changes Section */}
      <section className='flex flex-col gap-4 w-full'>
        <div className='flex items-center gap-2'>
          <div className='w-2 h-2 rounded-full bg-green-500'/>
          <h2 className='text-xl font-medium'>Today's Updates</h2>
        </div>
        {todayChanges.length > 0 ? (
          todayChanges.map((change) => (
            <Change
              key={change.id}
              id={change.id}
              title={change.title}
              desc={change.desc}
              date={change.date}
              iconPath={change.iconPath}
            />
          ))
        ) : (
          <p className='text-[#7F5539]/80'>No updates today</p>
        )}
      </section>

      {/* Previous Changes Section */}
      <section className='flex flex-col gap-4 bg-[#E6CCB2] w-full p-8 rounded-lg border-2 border-[#9C6644] mb-24'>
        <h2 className='text-xl font-medium mb-2'>Previous Updates</h2>
        {previousChanges.map((change) => (
          <Change
            key={change.id}
            id={change.id}
            title={change.title}
            desc={change.desc}
            date={change.date}
            iconPath={change.iconPath}
          />
        ))}
      </section>
    </main>
  )
}

export default Home