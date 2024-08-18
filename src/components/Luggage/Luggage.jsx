import './Luggage.css';

const Luggage = () => {
  // Sample data for luggage items
  const luggageItems = [
    { id: 1, name: 'Suitcase', image: 'suitcase.jpg' },
    { id: 2, name: 'Backpack', image: 'backpack.jpg' },
    { id: 3, name: 'Carry-on', image: 'carryon.jpg' },
    // Add more items as needed
  ];

  return (
    <div className="luggage-container">
      <h1>My Luggage</h1>
      <div className="luggage-shelf">
        {luggageItems.map((item) => (
          <div key={item.id} className="luggage-item">
            <div className="luggage-image-container">
              <img src={item.image} alt={item.name} className="luggage-image" />
            </div>
            <div className="luggage-name">{item.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Luggage;