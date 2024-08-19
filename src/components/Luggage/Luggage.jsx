import { useState } from 'react';
import './Luggage.css';

const Luggage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [suitcaseItems, setSuitcaseItems] = useState([
    { id: 1, name: 'T-shirts', quantity: 5 },
    { id: 2, name: 'Pants', quantity: 3 },
    { id: 3, name: 'Underwear', quantity: 7 },
    { id: 4, name: 'Socks', quantity: 7 },
    { id: 5, name: 'Toiletries', quantity: 1 },
  ]);
  const [newItemName, setNewItemName] = useState('');
  const [newItemQuantity, setNewItemQuantity] = useState(1);

  const luggageItems = [
    { id: 1, name: 'Suitcase', image: 'src/assets/SuitCase.png' },
    { id: 2, name: 'Backpack', image: 'src/assets/Backpack.png' },
    { id: 3, name: 'Carry-on', image: 'src/assets/Carryon.png' },
  ];

  const [luggages, setLuggages] = useState([
    { id: 1, type: 'Suitcase', owner: 'John Doe', tripName: 'Summer Vacation', date: '2024-08-18' },
    { id: 2, type: 'Backpack', owner: 'Jane Doe', tripName: 'Business Trip', date: '2024-07-20' },
  ]);

  const [filter, setFilter] = useState({ type: 'All', owner: 'All', trip: 'All' });

  const handleItemClick = (itemName) => {
    if (itemName === 'Suitcase') {
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleQuantityChange = (id, newQuantity) => {
    setSuitcaseItems(suitcaseItems.map(item => 
      item.id === id ? { ...item, quantity: parseInt(newQuantity) } : item
    ));
  };

  const handleAddItem = () => {
    if (newItemName.trim()) {
      setSuitcaseItems([...suitcaseItems, { 
        id: suitcaseItems.length + 1, 
        name: newItemName.trim(), 
        quantity: newItemQuantity 
      }]);
      setNewItemName('');
      setNewItemQuantity(1);
    }
  };

  const handleRemoveItem = (id) => {
    setSuitcaseItems(suitcaseItems.filter(item => item.id !== id));
  };

  const handleFilterChange = (key, value) => {
    setFilter({ ...filter, [key]: value });
  };

  const filteredLuggages = luggages.filter((luggage) => {
    return (
      (filter.type === 'All' || luggage.type === filter.type) &&
      (filter.owner === 'All' || luggage.owner === filter.owner) &&
      (filter.trip === 'All' || luggage.tripName === filter.trip)
    );
  });

  const handleCreateLuggage = (newLuggage) => {
    setLuggages([...luggages, { id: luggages.length + 1, ...newLuggage }]);
    setIsCreateModalOpen(false);
  };

  const handleOpenCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  return (
    <div className="luggage-page">
      <div className="luggage-navbar">
        <select onChange={(e) => handleFilterChange('type', e.target.value)}>
          <option value="All">All Types</option>
          {luggageItems.map(item => (
            <option key={item.id} value={item.name}>{item.name}</option>
          ))}
        </select>
        <select onChange={(e) => handleFilterChange('owner', e.target.value)}>
          <option value="All">All Owners</option>
          {Array.from(new Set(luggages.map(luggage => luggage.owner))).map((owner, idx) => (
            <option key={idx} value={owner}>{owner}</option>
          ))}
        </select>
        <select onChange={(e) => handleFilterChange('trip', e.target.value)}>
          <option value="All">All Trips</option>
          {Array.from(new Set(luggages.map(luggage => luggage.tripName))).map((trip, idx) => (
            <option key={idx} value={trip}>{trip}</option>
          ))}
        </select>
        <button className="add-luggage-button" onClick={handleOpenCreateModal}>+</button>
      </div>

      <div className="luggage-container">
        <h1>My Luggage</h1>
        <div className="luggage-shelf">
          {filteredLuggages.map((luggage) => (
            <div 
              key={luggage.id} 
              className="luggage-item" 
              onClick={() => handleItemClick(luggage.type)}
            >
              <div className="luggage-image-container">
                <img 
                  src={luggageItems.find(item => item.name === luggage.type)?.image} 
                  alt={luggage.type} 
                  className="luggage-image" 
                />
              </div>
              <div className="luggage-name">{luggage.type}</div>
              <div className="luggage-info">Owner: {luggage.owner}</div>
              <div className="luggage-info">Trip: {luggage.tripName}</div>
              <div className="luggage-info">Date: {luggage.date}</div>
            </div>
          ))}
        </div>

        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>Suitcase Contents</h2>
              <ul className="item-list">
                {suitcaseItems.map(item => (
                  <li key={item.id} className="item">
                    <span>{item.name}</span>
                    <input 
                      type="number" 
                      value={item.quantity} 
                      onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                      min="0"
                    />
                    <button className="remove-button" onClick={() => handleRemoveItem(item.id)}>Remove</button>
                  </li>
                ))}
              </ul>
              <div className="add-item">
                <input 
                  type="text" 
                  value={newItemName} 
                  onChange={(e) => setNewItemName(e.target.value)}
                  placeholder="New item name"
                />
                <input 
                  type="number" 
                  value={newItemQuantity} 
                  onChange={(e) => setNewItemQuantity(parseInt(e.target.value, 10))}
                  min="1"
                />
                <button onClick={handleAddItem}>Add Item</button>
              </div>
              <button className="close-button" onClick={handleCloseModal}>Close</button>
            </div>
          </div>
        )}

        {isCreateModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>Create New Luggage</h2>
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const newLuggage = {
                  type: formData.get('type'),
                  owner: formData.get('owner'),
                  tripName: formData.get('tripName'),
                  date: formData.get('date'),
                };
                handleCreateLuggage(newLuggage);
              }}>
                <div className="form-group">
                  <label htmlFor="type">Luggage Type:</label>
                  <select name="type" id="type" required>
                    {luggageItems.map(item => (
                      <option key={item.id} value={item.name}>{item.name}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="owner">Owner:</label>
                  <input type="text" id="owner" name="owner" required />
                </div>
                <div className="form-group">
                  <label htmlFor="tripName">Trip Name:</label>
                  <input type="text" id="tripName" name="tripName" required />
                </div>
                <div className="form-group">
                  <label htmlFor="date">Date:</label>
                  <input type="date" id="date" name="date" required />
                </div>
                <button type="submit" className="submit-button">Create</button>
                <button type="button" className="close-button" onClick={handleCloseCreateModal}>Cancel</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Luggage;
