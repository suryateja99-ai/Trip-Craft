import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./TripIdeas.css";

const destinations = [
  {
    name: "Goa",
    images: [
      "https://images.pexels.com/photos/1433052/pexels-photo-1433052.jpeg",
      "https://images.pexels.com/photos/1000445/pexels-photo-1000445.jpeg",
      "https://images.pexels.com/photos/2174660/pexels-photo-2174660.jpeg"
    ],
    description: "Famous for beaches, nightlife, seafood, and Portuguese heritage."
  },
  {
    name: "Ooty",
    images: [
      "https://images.pexels.com/photos/32366710/pexels-photo-32366710.jpeg?cs=srgb&dl=pexels-neha-parganihaa-2152600083-32366710.jpg&fm=jpg",
      "https://images.pexels.com/photos/34696645/pexels-photo-34696645.jpeg",
      "https://images.pexels.com/photos/16239705/pexels-photo-16239705.jpeg"
    ],
    description: "Tea plantations, Cool weather, and Hill views."
  },
  {
    name: "Manali",
    images: [
      "https://images.pexels.com/photos/5205097/pexels-photo-5205097.jpeg",
      "https://images.pexels.com/photos/795155/pexels-photo-795155.jpeg",
      "https://images.pexels.com/photos/7086906/pexels-photo-7086906.jpeg"
    ],
    description: "Hill station with adventure sports, snow activities, and scenic landscapes."
  }
];

function TripIdeas() {
  const navigate = useNavigate();

  return (
    <div className="trip-ideas-page">
      {destinations.map((dest, index) => (
        <DestinationCard key={index} destination={dest} navigate={navigate} />
      ))}
    </div>
  );
}

function DestinationCard({ destination, navigate }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % destination.images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [destination.images.length]);

  const handleClick = () => {
    navigate("/", { state: { to: destination.name } });
  };

  return (
    <motion.div
      className="destination-card"
      onClick={handleClick}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="slide-wrapper">
        <motion.div
          className="slide-track"
          animate={{ x: `-${currentIndex * 100}%` }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          {destination.images.map((img, i) => (
            <img src={img} alt={destination.name} key={i} className="dest-img" />
          ))}
        </motion.div>
      </div>

      <motion.div
        className="dest-info"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h2>{destination.name}</h2>
        <p>{destination.description}</p>
        <p className="click-text">Click to plan your trip →</p>
      </motion.div>
    </motion.div>
  );
}

export default TripIdeas;
