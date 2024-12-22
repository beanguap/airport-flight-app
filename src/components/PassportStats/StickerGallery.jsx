import './StickerGallery.css';

/**
 * Accepts a list of `galleryStickers` (URLs) and a callback `onSelectSticker(src)`
 */
const StickerGallery = ({ galleryStickers, onSelectSticker }) => {
  return (
    <div className="sticker-gallery">
      <h3>Sticker Gallery</h3>
      <div className="gallery-grid">
        {galleryStickers.map((src, idx) => (
          <div
            key={idx}
            className="gallery-item"
            onClick={() => onSelectSticker(src)}
          >
            <img src={src} alt={`Gallery sticker ${idx}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default StickerGallery;
