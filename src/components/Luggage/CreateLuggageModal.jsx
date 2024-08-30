import PropTypes from 'prop-types';

const CreateLuggageModal = ({ isOpen, onClose, onSubmit, luggageItems = [] }) => {
  if (!isOpen) return null;

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newLuggage = Object.fromEntries(formData.entries());
    onSubmit(newLuggage);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Create New Luggage</h2>
        <form onSubmit={handleSubmit} className="create-luggage-form">
          <div className="form-group">
            <label htmlFor="luggageType">Luggage Type:</label>
            <select name="luggageType" id="luggageType" required>
              {luggageItems.map((luggageItem) => (
                <option key={luggageItem.id} value={luggageItem.name}>{luggageItem.name}</option>
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
            <label htmlFor="departureDate">Departure Date:</label>
            <div className="date-input-wrapper">
              <input type="date" id="departureDate" name="departureDate" required />
            </div>
          </div>
          <div className="form-actions">
            <button type="submit" className="create-button">Create</button>
            <button type="button" className="close-button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

CreateLuggageModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  luggageItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
};

CreateLuggageModal.defaultProps = {
  luggageItems: [],
};

export default CreateLuggageModal;