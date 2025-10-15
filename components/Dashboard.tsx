import React from 'react';

interface DashboardProps {
  onStart: () => void;
  isLoggedIn: boolean;
}

const BrainCircuitIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.572L16.5 21.75l-.398-1.178a3.375 3.375 0 00-2.455-2.456L12.75 18l1.178-.398a3.375 3.375 0 002.455-2.456L16.5 14.25l.398 1.178a3.375 3.375 0 002.456 2.456L20.25 18l-1.178.398a3.375 3.375 0 00-2.456 2.456z" />
    </svg>
);
  
const ClipboardCheckIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.125 2.25h-4.5c-1.125 0-2.062.938-2.062 2.063v15.374c0 1.125.938 2.063 2.063 2.063h12.75c1.125 0 2.063-.938 2.063-2.063V12.313M9 9.75M9 12.75M9 15.75M12 9.75M12 12.75M12 15.75M15 9.75M15 12.75M15 15.75M15.375 2.25L12 6l-3.375-3.75" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2.25 2.25L15 9" />
    </svg>
);

const InfoCard: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
    <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
        <div className="flex items-center text-sky-600 mb-4">
            {icon}
            <h3 className="text-2xl font-bold ml-3">{title}</h3>
        </div>
        <p className="text-slate-600 leading-relaxed">{children}</p>
    </div>
);


const Dashboard: React.FC<DashboardProps> = ({ onStart, isLoggedIn }) => {
  return (
    <div className="flex flex-col items-center text-center space-y-16" >
      <div className="bg-gradient-to-br from-white to-slate-50 p-12 md:p-20 rounded-2xl shadow-xl w-full max-w-5xl">
        <h2 className="text-5xl md:text-6xl font-extrabold text-slate-800 mb-6">Early Detection for a Brighter Future</h2>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-10">
          NeuroCare offers a series of engaging cognitive games and analyses designed to identify early signs of cognitive decline, such as Alzheimer's and dementia. Early awareness can lead to better management and quality of life.
        </p>
        <button
          onClick={onStart}
          className="px-10 py-5 bg-sky-500 text-white font-bold rounded-full text-xl hover:bg-sky-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-sky-300"
        >
          Start Free Assessment
        </button>
      </div>

      <div className="w-full max-w-5xl grid md:grid-cols-2 gap-10">
        <InfoCard title="Cognitive Decline" icon={<BrainCircuitIcon className="w-10 h-10" />}>
            It's the gradual loss of brain functions like memory and thinking skills. While some decline is normal with age, significant loss can be a sign of conditions like dementia or Alzheimer's.
        </InfoCard>
         <InfoCard title="Early Detection" icon={<ClipboardCheckIcon className="w-10 h-10" />}>
            Identifying cognitive issues early provides the best opportunity to seek medical advice and explore management options. It empowers individuals and families to plan for the future.
        </InfoCard>
      </div>
    </div>
  );
};

export default Dashboard;