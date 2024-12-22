// src/pages/PassportStats.jsx
import PageFlipBook from './PageFlipBook';
import QrModal from './QrModal';
import Sticker from './Sticker';
import StickerGallery from './StickerGallery';
import WorldMap from './WorldMap';
import './PassportStats.css';

/**
 * Example passport stats page that demonstrates multi-page flipping,
 * sticker gallery, and more.
 */
const PassportStats = () => {
  // We keep the flight data, trips, stickers in state
  const [currentFlight, setCurrentFlight] = useState({
    departureAirport: 'JFK',
    destinationAirport: 'LAX',
    airline: 'Delta Airlines',
    flightNumber: 'DL1234',
    departureTime: '2023-10-05 08:00',
    arrivalTime: '2023-10-05 11:00',
    flightDuration: '6h',
    distance: '3,945 km',
    gateNumber: 'A21',
    seat: '12B',
  });

  const [pastTrips, setPastTrips] = useState([
    {
      date: '2023-09-15',
      departureAirport: 'LAX',
      destinationAirport: 'ORD',
      flightTime: '4h',
      distance: '2,800 km',
      airline: 'United Airlines',
    },
    {
      date: '2023-08-10',
      departureAirport: 'ORD',
      destinationAirport: 'MIA',
      flightTime: '3h',
      distance: '1,900 km',
      airline: 'American Airlines',
    },
  ]);

  const [stickers, setStickers] = useState([]);
  const [travelStats, setTravelStats] = useState({
    flights: 10,
    distance: '25,000 km',
    flightTime: '40h',
    airports: 15,
    airlines: 5,
  });

  // For the sticker gallery
  const galleryStickers = [
    '/images/flag-usa.png',
    '/images/flag-uk.png',
    '/images/flag-japan.png',
    '/images/airline-delta.png',
    '/images/airline-united.png',
    // ...Add your own!
  ];

  // QR Modal state
  const [qrOpen, setQrOpen] = useState(false);

  // Load data from localStorage on mount
  useEffect(() => {
    const storedTrips = localStorage.getItem('pastTrips');
    const storedStickers = localStorage.getItem('stickers');
    const storedStats = localStorage.getItem('travelStats');

    if (storedTrips) setPastTrips(JSON.parse(storedTrips));
    if (storedStickers) setStickers(JSON.parse(storedStickers));
    if (storedStats) setTravelStats(JSON.parse(storedStats));
  }, []);

  // Save data to localStorage whenever changes happen
  useEffect(() => {
    localStorage.setItem('pastTrips', JSON.stringify(pastTrips));
  }, [pastTrips]);

  useEffect(() => {
    localStorage.setItem('stickers', JSON.stringify(stickers));
  }, [stickers]);

  useEffect(() => {
    localStorage.setItem('travelStats', JSON.stringify(travelStats));
  }, [travelStats]);

  /**
   * Handle uploading a new sticker (user file).
   */
  const handleStickerUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const newSticker = {
        src: reader.result,
        left: 50,
        top: 50,
        width: 80,
        height: 80,
        note: '',
      };
      setStickers((prev) => [...prev, newSticker]);
    };
    reader.readAsDataURL(file);
  };

  /**
   * Add a sticker from the gallery
   */
  const handleSelectStickerFromGallery = (src) => {
    const newSticker = {
      src,
      left: 100,
      top: 100,
      width: 80,
      height: 80,
      note: '',
    };
    setStickers([...stickers, newSticker]);
  };

  /**
   * Update sticker's position or note in the state.
   */
  const updateSticker = (index, newSticker) => {
    setStickers((prev) => {
      const updated = [...prev];
      updated[index] = newSticker;
      return updated;
    });
  };

  /**
   * Toggle QR Modal for the current flight
   */
  const toggleQrModal = () => {
    setQrOpen(!qrOpen);
  };

  /**
   * Simple filtering function - searching trips by airline, route, etc.
   */
  const [searchTerm, setSearchTerm] = useState('');
  const filteredTrips = pastTrips.filter((trip) => {
    return (
      trip.airline.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.departureAirport.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.destinationAirport.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="passport-container">
      <PageFlipBook width={800} height={600}>
        {/* ---- Page 1 (Cover / Title) ---- */}
        <div className="passport-page page-cover">
          <h1>Your Digital Passport</h1>
          <p>Flip to see your flights, stickers, and more!</p>
        </div>

        {/* ---- Page 2 (Current Flight Info) ---- */}
        <div className="passport-page">
          <h2>Current Flight Info</h2>
          <div className="flight-info">
            <p><strong>Departure:</strong> {currentFlight.departureAirport}</p>
            <p><strong>Destination:</strong> {currentFlight.destinationAirport}</p>
            <p><strong>Airline:</strong> {currentFlight.airline}</p>
            <p><strong>Flight #:</strong> {currentFlight.flightNumber}</p>
            <p><strong>Departure Time:</strong> {currentFlight.departureTime}</p>
            <p><strong>Arrival Time:</strong> {currentFlight.arrivalTime}</p>
            <p><strong>Duration:</strong> {currentFlight.flightDuration}</p>
            <p><strong>Distance:</strong> {currentFlight.distance}</p>
            <p><strong>Gate:</strong> {currentFlight.gateNumber}</p>
            <p><strong>Seat:</strong> {currentFlight.seat}</p>
          </div>
          <button type="button" onClick={toggleQrModal}>
            Show QR
          </button>
        </div>

        {/* ---- Page 3 (Travel History + Search) ---- */}
        <div className="passport-page">
          <h2>Travel History</h2>
          <input
            type="text"
            placeholder="Search by airline or airport..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="trip-search"
          />
          <div className="past-trips">
            {filteredTrips.map((trip, idx) => (
              <div key={idx} className="trip-card">
                <p><strong>Date:</strong> {trip.date}</p>
                <p><strong>Route:</strong> {trip.departureAirport} → {trip.destinationAirport}</p>
                <p><strong>Flight Time:</strong> {trip.flightTime}</p>
                <p><strong>Distance:</strong> {trip.distance}</p>
                <p><strong>Airline:</strong> {trip.airline}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ---- Page 4 (Interactive Map) ---- */}
        <div className="passport-page">
          <h2>Visited Airports</h2>
          <WorldMap trips={[...pastTrips, currentFlight]} />
        </div>

        {/* ---- Page 5 (Stickers) ---- */}
        <div className="passport-page sticker-page">
          <h2>Decorate Your Passport</h2>
          <div className="sticker-section">
            <label className="file-upload-label">
              <span>Upload Sticker</span>
              <input
                className="file-upload-input"
                type="file"
                accept="image/*"
                onChange={handleStickerUpload}
              />
            </label>

            <StickerGallery
              galleryStickers={galleryStickers}
              onSelectSticker={handleSelectStickerFromGallery}
            />
            <p>Drag stickers anywhere on the passport!</p>
          </div>
          {/* Stickers container with absolute positioning */}
          <div className="stickers-container">
            {stickers.map((sticker, index) => (
              <Sticker
                key={index}
                index={index}
                sticker={sticker}
                updateSticker={updateSticker}
              />
            ))}
          </div>
        </div>

        {/* ---- Page 6 (Travel Stats) ---- */}
        <div className="passport-page">
          <h2>Your Travel Stats</h2>
          <div className="stats-list">
            <p>Total Distance Flown: {travelStats.distance}</p>
            <p>Total Flight Time: {travelStats.flightTime}</p>
            <p>Total Airports Visited: {travelStats.airports}</p>
            <p>Total Airlines Used: {travelStats.airlines}</p>
            <p>Number of Flights: {travelStats.flights}</p>
          </div>
        </div>
      </PageFlipBook>

      {/* ---- QR MODAL ---- */}
      <QrModal isOpen={qrOpen} onClose={toggleQrModal} flight={currentFlight} />
    </div>
  );
};

export default PassportStats;
