import  { useEffect } from 'react';
import './toolbar.css';

const ToolbarItem = ({ title, subtitle }) => (
    <div className="toolbar-item">
        <h2>{title}</h2>
        {subtitle && <p>{subtitle}</p>}
    </div>
);


const Toolbar = () => {
    useEffect(() => {
        const container = document.querySelector('.toolbar-container');
        let isScrolling;

        const handleScroll = () => {
            clearTimeout(isScrolling);
            isScrolling = setTimeout(() => {
                snapToClosestItem();
            }, 100);
        };

        container.addEventListener('scroll', handleScroll);

        // Cleanup event listener on component unmount
        return () => {
            container.removeEventListener('scroll', handleScroll);
        };

        function snapToClosestItem() {
            const items = Array.from(document.querySelectorAll('.toolbar-item'));
            const scrollPosition = container.scrollTop;
            const itemHeight = items[0].offsetHeight;

            // Determine the closest item based on current scroll position
            const closestIndex = Math.round(scrollPosition / itemHeight);

            // Smoothly scroll to the closest item
            container.scrollTo({
                top: closestIndex * itemHeight,
                behavior: 'smooth'
            });
        }
    }, []);

    return (
        <div className="toolbar-container">
            <ToolbarItem title="Current Time" />
            <ToolbarItem title="Current Weather" />
            <ToolbarItem title="Luggage" />
            <ToolbarItem title="Destination" />
            <ToolbarItem title="Another Item" />
        </div>
    );
};

export default Toolbar;
