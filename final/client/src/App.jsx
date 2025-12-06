import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Gifts from "./gifts";
import Sketch from "react-p5";


// p5 external libary
function P5Sketch() {
  let hearts = [];

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(400, 400).parent(canvasParentRef);
    hearts.push({ x: 120, y: 300, dir: -1, letter: 'V' });
    hearts.push({ x: 280, y: 300, dir: 1, letter: 'E' });
  };

  const draw = (p5) => {
    p5.background(255);

    hearts.forEach((heart) => {
      heart.y += heart.dir * 1.5;
      if (heart.y < 100 || heart.y > 300) heart.dir *= -1;

      p5.fill('#ff0000');
      p5.noStroke();
      p5.beginShape();
      p5.vertex(heart.x, heart.y);
      p5.bezierVertex(heart.x - 25, heart.y - 25, heart.x - 50, heart.y + 15, heart.x, heart.y + 50);
      p5.bezierVertex(heart.x + 50, heart.y + 15, heart.x + 25, heart.y - 25, heart.x, heart.y);
      p5.endShape(p5.CLOSE);

      p5.fill('#b8860b');
      p5.textAlign(p5.CENTER, p5.CENTER);
      p5.textSize(24);
      p5.text(heart.letter, heart.x, heart.y + 10);
    });
  };

  return (
    <div className="p5-container">
      <Sketch setup={setup} draw={draw} />
    </div>
  );
}
// Slide show componet provided by W3Schools. I used this in instead of flickity, bc I never did figure out why the code would not work.
function Slideshow() {
  const [slideIndex, setSlideIndex] = useState(1);

  const slides = [
    { src: "img1.jpg" },
    { src: "img2.jpg" },
    { src: "img3.jpg" },
  ];

  function nextSlide(n) {
    let newIndex = slideIndex + n;
    if (newIndex > slides.length) newIndex = 1;
    if (newIndex < 1) newIndex = slides.length;
    setSlideIndex(newIndex);
  }

  function goToSlide(n) {
    setSlideIndex(n);
  }

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide(1);
    }, 4000);

    return () => clearInterval(timer);
  }, [slideIndex]);

  return (
    <>
      <div className="slideshow-container">
        {slides.map((slide, i) => (
          <div
            key={i}
            className="mySlides fade"
            style={{ display: slideIndex === i + 1 ? "block" : "none" }}
          >
            <div className="numbertext">{i + 1} / {slides.length}</div>
            <img src={slide.src} style={{ width: "100%" }} alt="" />
          </div>
        ))}

        <a className="prev" onClick={() => nextSlide(-1)}>❮</a>
        <a className="next" onClick={() => nextSlide(1)}>❯</a>
      </div>

      <br />

      <div style={{ textAlign: "center" }}>
        {slides.map((_, i) => (
          <span
            key={i}
            className={`dot ${slideIndex === i + 1 ? "active" : ""}`}
            onClick={() => goToSlide(i + 1)}
          ></span>
        ))}
      </div>
    </>
  );
}
// used bible api to fetch psalms 23 and display the verses on the page.
function BibleVerses() {
  const [verses, setVerses] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_KEY = "mBlA5ZHpue1TRgVlI16vt";
  const bibleId = "de4e12af7f28f599-02";
  const chapterId = "PSA.23";

  useEffect(() => {
    async function loadVerses() {
      try {
        const response = await fetch(
          `https://rest.api.bible/v1/bibles/${bibleId}/chapters/${chapterId}/verses`,
          { headers: { "api-key": API_KEY } }
        );

        const data = await response.json();
        if (!data.data) {
          setLoading(false);
          return;
        }

        const ids = data.data.map(v => v.id);
        const verseList = [];

        for (let id of ids) {
          const vRes = await fetch(
            `https://rest.api.bible/v1/bibles/${bibleId}/verses/${id}`,
            { headers: { "api-key": API_KEY } }
          );

          const vData = await vRes.json();

          verseList.push({
            id: id,
            reference: vData.data.reference,
            text: vData.data.content
          });
        }

        setVerses(verseList);
      } catch (err) {
        console.log("Error loading verses:", err);
      }
      setLoading(false);
    }

    loadVerses();
  }, []);

  return (
    <>
      <h1>Psalms 23</h1>
      {loading ? (
        <p>Loading verses...</p>
      ) : (
        <div>
          {verses.map(v => (
            <div key={v.id} style={{ marginBottom: "14px" }}>
              <strong>{v.reference}</strong>
              <div dangerouslySetInnerHTML={{ __html: v.text }}></div>
            </div>
          ))}
        </div>
      )}
      <footer>Elisiah & Victoria 2026</footer>
    </>
  );
}
// Home componet with welcome message, slideshow, engagement and proposal stories.
function Home() {
  return (
    <>
      <h1>Welcome to Elisiah & Victoria's Wedding</h1>
      <Slideshow />
      <p>
        If you have received this website link, please consider this a formal
        invitation to our wedding!
        <br />
        We are so excited to celebrate this special day surrounded by our
        family and friends. Your presence will make the day even more
        memorable.
        <br />
        With love,
        <br />
        Elisiah & Victoria
      </p>
      <P5Sketch />

      <h2>Engagement</h2>
      <img src="engagement.jpg" alt="Engagement" />
      <p>
        Our engagement was a truly magical moment that marked the beginning of
        our journey toward marriage. From the laughter and joy to the heartfelt
        promises we shared, it was a day full of love and excitement. We can't
        wait to share this special chapter of our lives with all of you and
        celebrate the love that brought us together.
      </p>

      <h3>Proposal</h3>
      <img src="proposal.jpg.jpg" alt="Proposal" />
      <p>
        Elisiah proposed to Victoria on a beautiful evening, under a sky
        painted with the warm colors of sunset. Surrounded by the serenity of
        the moment and the happiness of the occasion, it was a heartfelt
        proposal filled with laughter, tears of joy, and promises for a future
        together. This unforgettable moment truly captured the love and
        commitment we share, and we are thrilled to celebrate it with our
        family and friends.
      </p>

      <footer>Elisiah & Victoria 2026</footer>
    </>
  );
}
//rsvp form componet to collect guest information and submit to me.
function RSVP() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    numPeople: 1,
    allergies: "",
    additionalInfo: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    fetch('/api/rsvps', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then(res => res.json())
      .then(() => {
        alert("RSVP submitted!");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          numPeople: 1,
          allergies: "",
          additionalInfo: "",
        });
      })
      .catch(console.error);
  }

  return (
    <>
      <h1>RSVP</h1>
      <form onSubmit={handleSubmit}>
        <label>
          First Name: <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
        </label>
        <label>
          Last Name: <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
        </label>
        <label>
          Email: <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>
        <label>
          Phone Number: <input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
        </label>
        <label>
          Number of People: <input type="number" name="numPeople" value={formData.numPeople} onChange={handleChange} min="1" />
        </label>
        <label>
          Allergies: <textarea name="allergies" value={formData.allergies} onChange={handleChange} rows="3" />
        </label>
        <label>
          Additional Info: <textarea name="additionalInfo" value={formData.additionalInfo} onChange={handleChange} rows="4" />
        </label>
        <button type="submit">Submit RSVP</button>
      </form>
      <footer>Elisiah & Victoria 2026</footer>
    </>
  );
}
// this is not the actual venue, for privacy reasons. but it gives an idea of what to expect.
function VenueDetails() {
  return (
    <>
      <h1>Venue Details</h1>

      <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
        <img
          src="venue.jpg"
          alt="Wequassett Resort"
          style={{ width: "30%", borderRadius: "8px" }}
        />
        <img
          src="venue2.jpg"
          alt="Wequassett Resort"
          style={{ width: "30%", borderRadius: "8px" }}
        />
        <img
          src="venue3.jpg"
          alt="Wequassett Resort"
          style={{ width: "30%", borderRadius: "8px" }}
        />
      </div>

      <p>
        We are thrilled to celebrate our wedding at the beautiful{" "}
        <strong>Wequassett Resort and Golf Club</strong> in Chatham, Massachusetts.
        Nestled on the elbow of Cape Cod, this romantic waterfront resort offers a
        sophisticated and scenic backdrop for our special day, featuring manicured
        seaside lawns, lush floral gardens, and stunning views of Pleasant Bay.
      </p>

      <p>
        The resort provides a variety of exquisite spaces for both the ceremony and reception.
        Couples can choose to say their vows on the Grand Lawn or the Garden Terrace with its
        dramatic glass doors opening to the bay. The Pavilion offers an elegant setting for the
        reception, accommodating up to 250 guests, complete with tables, chairs, audio equipment,
        and a dance floor. Every corner is perfect for creating lasting memories.
      </p>

      <p>
        Guests will enjoy comfortable accommodations with over 120 suites available, many featuring
        patios or decks. The resort also offers wonderful amenities such as a golf course, pool,
        boating, and fitness center. Additional facilities include ample parking, wheelchair access,
        and shuttle service, ensuring a seamless experience for everyone attending.
      </p>

      <p>
        From the gorgeous waterfront views to the personalized service, we are excited to present
        this incredible venue to our family and friends. We can’t wait to celebrate love, laughter,
        and togetherness in this unforgettable location!
      </p>

      <footer>Elisiah & Victoria 2026</footer>
    </>
  );
}
//router logic, links to different pages.
export default function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>{" "}
        <Link to="/rsvp">RSVP</Link>{" "}
        <Link to="/venue">Venue</Link>{" "}
        <Link to="/psalms">Verses</Link>{" "}
        <Link to="/gifts">Gifts</Link>
      </nav>

      <hr />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rsvp" element={<RSVP />} />
        <Route path="/venue" element={<VenueDetails />} />
        <Route path="/psalms" element={<BibleVerses />} />
        <Route path="/gifts" element={<Gifts />} />
      </Routes>
    </Router>
  );
}