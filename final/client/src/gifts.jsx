import React, { useState, useEffect } from "react";
import "./App.css";
//my gifts page componet and form with api calls to server to get and post gift data, I realized the app,jsx was getting lare so i made another react file. 
export default function Gifts() {
  const [giftList, setGiftList] = useState([]);
  const [formData, setFormData] = useState({
    fullName: "",
    contact: "",
    gift: "",
    image: "",
  });

  useEffect(() => {
    fetch("/api/gifts")
      .then(res => res.json())
      .then(data => setGiftList(data))
      .catch(err => console.error(err));
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!formData.fullName || !formData.gift) return;

    fetch("/api/gifts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((newGift) => {
        setGiftList((prev) => [...prev, newGift]);
        setFormData({ fullName: "", contact: "", gift: "", image: "" });
      })
      .catch((err) => console.error(err));
  }

  return (
    <div className="gifts-page">
      <h1>Gifts</h1>
      <img
        src="gift.jpg"
        alt="Gifts"
        style={{ maxWidth: "100%", display: "block", margin: "20px auto" }}
      />

      <form className="gifts-form" onSubmit={handleSubmit}>
        <label>
          Full Name:
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Contact Info:
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
          />
        </label>

        <label>
          Gift:
          <input
            type="text"
            name="gift"
            value={formData.gift}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Image URL:
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
          />
        </label>

        <button type="submit">Add Gift</button>
      </form>

      <div className="gift-cards-container">
        {giftList.map((gift, i) => (
          <div key={i} className="gift-card">
            {gift.image && <img src={gift.image} alt={gift.gift} />}
            <p>
              <strong>{gift.fullName}</strong>
            </p>
            {gift.contact && <p>{gift.contact}</p>}
            <p>{gift.gift}</p>
          </div>
        ))}
      </div>

      <footer>Elisiah & Victoria 2026</footer>
    </div>
  );
}