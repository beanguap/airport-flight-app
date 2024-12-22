// src/components/PageFlipBook.jsx
import React, { forwardRef } from 'react';
import HTMLFlipBook from 'react-pageflip';

const PageFlipBook = forwardRef(({ children, width, height }, ref) => {
  return (
    <div className="flipbook-outer-wrapper">
      <div className="flipbook-wrapper">
        <HTMLFlipBook
          width={width}
          height={height}
          // ...
          ref={ref} // attach ref here
          mobileScrollSupport={true}
          useMouseEvents={true}
        >
          {children}
        </HTMLFlipBook>
      </div>

      {/* Page turn buttons */}
      <button
        className="page-turner left"
        onClick={() => ref.current?.pageFlip().flipPrev()}
        aria-label="Previous page"
      >
        <div className="page-turner-icon" />
      </button>
      <button
        className="page-turner right"
        onClick={() => ref.current?.pageFlip().flipNext()}
        aria-label="Next page"
      >
        <div className="page-turner-icon" />
      </button>
    </div>
  );
});

export default PageFlipBook;
