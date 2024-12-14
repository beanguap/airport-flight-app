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
          });
        } else {
          reject("Failed to fetch flight data");
        }
      }, 1000); // Simulate a 1-second delay
    });
  };
  