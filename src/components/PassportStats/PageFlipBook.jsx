// src/components/PageFlipBook.jsx (or src/pages/PageFlipBook.jsx)
import React, { forwardRef } from 'react';
import HTMLFlipBook from 'react-pageflip';
import './PageFlipBook.css';

const PageFlipBook = forwardRef(({ children }, ref) => {
  return (
    <div className="flipbook-outer-wrapper">
      <div className="flipbook-wrapper">
        <HTMLFlipBook
          ref={ref}
          /**
           * You can still provide nominal widths/heights here,
           * but we will override in CSS to ensure it's responsive.
           */
          width={800}
          height={600}
          minWidth={300}
          maxWidth={1400} 
          minHeight={400}
          maxHeight={1200}
          drawShadow
          showCover={false}
          mobileScrollSupport
          useMouseEvents={false} 
          flipDuration={600}
          className="flipbook-container"
        >
          {children}
        </HTMLFlipBook>
      </div>

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
