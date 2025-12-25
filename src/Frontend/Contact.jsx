import { useState } from "react";
import axios from "axios";
import "./Contact.css";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "https://trip-craft-backend.onrender.com/api/store",
        form
      );

      alert(res.data.message);
      setSent(true);
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      alert("Failed to send feedback ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-card">
        <h2>We’d love your feedback ✨</h2>
        <p className="subtitle">
          Share your suggestions, ideas, or issues to help improve Trip Craft.
        </p>

        {sent ? (
          <div className="success-msg">
            Thanks for your feedback! 💙
          </div>
        ) : (
          <form className="form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name (optional)"
              value={form.name}
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email (optional)"
              value={form.email}
              onChange={handleChange}
            />

            <textarea
              name="message"
              placeholder="Your suggestion or feedback..."
              value={form.message}
              onChange={handleChange}
              required
            />

            <button type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send Feedback"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Contact;
