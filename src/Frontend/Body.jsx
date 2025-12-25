import { useState } from "react";
import axios from "axios";
import './Body.css';


function Body() {
  const [tour, setTour] = useState({
    from: "",
    to: "",
    days: "",
    budget:"",
  });

  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    setTour({ ...tour, [e.target.name]: e.target.value });
  };

  const onSubmit = async () => {
    if (!tour.from || !tour.to || !tour.days) return;

    try {
      setLoading(true);
      setTrip(null);

      const res = await axios.post("https://trip-craft-backend.onrender.com/api/travel", tour);

      
      setTrip(res.data);
    } catch (err) {
      console.error("Error occurred:", err);
      setTrip({ error: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="body">
      <div className="travel-card">
        <h2>Plan Your Trip ✈️</h2>

        <div className="input-group">
          <input
            type="text"
            name="from"
            placeholder="From (e.g., Hyderabad)"
            value={tour.from}
            onChange={onChange}
          />
          <input
            type="text"
            name="to"
            placeholder="Destination (e.g., Goa)"
            value={tour.to}
            onChange={onChange}
          />
          <input
            type="number"
            name="days"
            placeholder="Number of days"
            value={tour.days}
            onChange={onChange}
          />
          
          <select
  name="budget"
  value={tour.budget}
  onChange={onChange}
  className="budget-select"
>
  <option value="">Select Budget</option>
  <option value="high">High</option>
  <option value="medium">Medium</option>
  <option value="low">Low</option>
</select>
        </div>

        <button onClick={onSubmit} disabled={loading}>
          {loading ? "Planning..." : "Create Trip"}
        </button>

        
        {loading && <div className="loading">Generating itinerary...</div>}

        
        {trip && !trip.error && (
          <div className="trip-plan">
            <h3>Total Estimated Cost: ₹{trip.total_cost}</h3>
            {trip.trip_plan.map((day, index) => (
              <div key={index} className="day-card">
                <h4>Day {day.day}</h4>
                <ul>
                  {day.activities.map((act, i) => (
                    <li key={i}>{act}</li>
                  ))}
                </ul>
                <div className="costs">
                  <span>Transport: ₹{day.costs.transport}</span>
                  <span>Stay: ₹{day.costs.stay}</span>
                  <span>Food: ₹{day.costs.food}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        
        {trip && trip.error && <p className="error">{trip.error}</p>}
      </div>
    </section>
  );
}

export default Body;
