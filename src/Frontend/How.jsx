import "./How.css";
import { motion } from "framer-motion";
import { FaPlaneDeparture, FaTrain, FaHotel, FaRobot } from "react-icons/fa";
import { Link } from "react-router-dom";

const stepVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6 }
  })
};

function How() {
  return (
    <div className="how-page">
      <div className="how-container">
        {/* AI Badge */}
        <div className="ai-badge">
          <FaRobot /> Powered by GPT-OSS-120B
        </div>

        <h1>How TripCraft Works</h1>
        <p className="subtitle">
          Smart, realistic travel planning powered by advanced AI
        </p>

        <div className="steps">
          {[
            {
              title: "Enter Your Trip Details",
              icon: <FaPlaneDeparture />,
              text:
                "Provide origin, destination, number of days, and budget level."
            },
            {
              title: "AI Plans Real Routes",
              icon: <FaTrain />,
              text:
                "We use real airports, railway stations, and transport systems."
            },
            {
              title: "Budget-Aware Experiences",
              icon: <FaHotel />,
              text:
                "From budget stays to luxury hotels — your budget controls everything."
            },
            {
              title: "Day-Wise Itinerary",
              icon: <FaPlaneDeparture />,
              text:
                "Activities, transport, food, and stay — organized day by day."
            },
            {
              title: "Transparent Cost Breakdown",
              icon: <FaTrain />,
              text:
                "Each day includes estimated costs plus a total trip budget."
            }
          ].map((step, index) => (
            <motion.div
              className="step-card"
              key={index}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stepVariants}
            >
              <div className="step-icon">{step.icon}</div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <Link to="/" className="cta-button">
          Plan My Trip
        </Link>
      </div>
    </div>
  );
}

export default How;
