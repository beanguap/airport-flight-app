import { QRCodeSVG } from 'qrcode.react';  // Change import to use named import
import './QrModal.css';

const QrModal = ({ isOpen, onClose, flight }) => {
  if (!isOpen || !flight) return null;

  const qrValue = JSON.stringify(flight);

  return (
    <div className="qr-modal-backdrop" onClick={onClose}>
      <div className="qr-modal" onClick={(e) => e.stopPropagation()}>
        <h2>Flight QR Code</h2>
        <QRCodeSVG  // Changed from QRCode to QRCodeSVG
          value={qrValue}
          size={180}
          level="H"
          includeMargin={true}
          bgColor="#ffffff"
          fgColor="#000000"
        />
        <p>
          Scan with a QR code reader to see flight data:
          <br />
          {flight.flightNumber} • {flight.airline}
        </p>
        <button type="button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default QrModal;