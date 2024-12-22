// src/components/PageFlipBook.jsx
import { forwardRef } from 'react';
import HTMLFlipBook from 'react-pageflip';

/**
 * This component wraps the react-pageflip library to create a "book-like" UI.
 * We forward a ref so we can control the flipbook from a parent component if desired (e.g., turn pages programmatically).
 */
const PageFlipBook = forwardRef(({ children, width, height }, ref) => {
  return (
    <HTMLFlipBook
      width={width}
      height={height}
      minWidth={315}
      maxWidth={2000}
      minHeight={400}
      maxHeight={2500}
      drawShadow={true}
      showCover={false}
      mobileScrollSupport={false}
      ref={ref}
      className="flipbook-container"
    >
      {children}
    </HTMLFlipBook>
  );
});

export default PageFlipBook;
