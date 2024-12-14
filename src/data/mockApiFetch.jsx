
export const mockApiFetch = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = true; // Simulate success or failure
      if (success) {
        resolve({
          airline: { name: "Air Canada", logo: "/src/assets/air-canada-logo.png" },
          flightNumber: "AC456",
          departureTime: "12:45 PM",
          arrivalTime: "3:30 PM",
          departureAirport: "MIA", // Miami International Airport
          arrivalAirport: "LAX", // Los Angeles International Airport
          status: "On Time",
          gate: "C12",
          terminal: "1",
          duration: "5h 45m",
          // Added other flights data
          otherFlights: [
            {
              airline: { name: "Delta Airlines", logo: "/src/assets/delta-logo.png" },
              flightNumber: "DL789",
              departureTime: "1:15 PM",
              arrivalTime: "4:00 PM",
              departureAirport: "MIA",
              arrivalAirport: "JFK",
              status: "Delayed",
              gate: "D5",
              terminal: "2",
              duration: "2h 45m",
            },
            {
              airline: { name: "American Airlines", logo: "/src/assets/american-airlines-logo.png" },
              flightNumber: "AA123",
              departureTime: "2:30 PM",
              arrivalTime: "5:15 PM",
              departureAirport: "MIA",
              arrivalAirport: "ORD",
              status: "On Time",
              gate: "E8",
              terminal: "3",
              duration: "2h 45m",
            },
            // ...other flights...
          ],
        });
      } else {
        reject("Failed to fetch flight data");
      }
    }, 1000); // Simulate a 1-second delay
  });
};