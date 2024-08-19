import { useState } from 'react';
import './Luggage.css';

const Luggage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  return (
    <div className="luggage-container">
      <h1>My Luggage</h1>
      <div className="luggage-shelf">
        {luggageItems.map((item) => (
          <div key={item.id} className="luggage-item" onClick={() => handleItemClick(item.name)}>
            <div className="luggage-image-container">
              <img src={item.image} alt={item.name} className="luggage-image" />
            </div>
            <div className="luggage-name">{item.name}</div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className={`modal-overlay ${isModalOpen ? 'active' : ''}`}>
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
                  <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
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
                onChange={(e) => setNewItemQuantity(parseInt(e.target.value))}
                min="1"
              />
              <button onClick={handleAddItem}>Add Item</button>
            </div>
            <button className="close-button" onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Luggage;
