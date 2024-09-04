import { Hotel, Car, Activity, Clock, MapPin } from 'lucide-react';

const Toolbar = () => {
  const tools = [
    { name: 'Hotel', icon: Hotel },
    { name: 'Car', icon: Car },
    { name: 'Activities', icon: Activity },
    { name: 'ETA', icon: Clock },
    { name: 'Gate', icon: MapPin },
  ];

  return (
    <div className="toolbar bg-white rounded-lg shadow-md p-2 flex flex-col items-center space-y-4">
      {tools.map((tool) => (
        <button
          key={tool.name}
          className="toolbar-item p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
          aria-label={tool.name}
        >
          <tool.icon size={24} />
        </button>
      ))}
    </div>
  );
};

export default Toolbar;