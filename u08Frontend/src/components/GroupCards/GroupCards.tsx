import "./GroupCards.css";

const GroupCards = () => {
  return (
    <div className="team" id="about-us">

  <h2>About Us</h2>
  <hr className="titleHR"/>
  <div className="aboutUs">
    <p>This is a fullstack school project created with react, node-express and a mongoDB. The assignment was to create an application based upon a business idea. We have decided to make an application that leads a user to the closest outdoor gym, located in the Stockholm area.</p>
    <p>We achieved this by using the Stockholm Service API and the Google Maps API.</p>
    <p>This application is not inteded for commercial use of any kind.</p>
  </div>
  

        <h2>Meet The Team</h2>
        <hr className="titleHR" />
    <div className="groupCards">
      <div className="card">
        <div className="card-image">
          <img src="/Arron-Reed.png" alt="Arron Reed" />
        </div>
        <p className="name">Arron Reed</p>
        <p>FullStack Developer</p>
        <p>
        He possesses a laugh that rivals a hyena's. It's infectious, and heard from miles away. If Arron finds something funny, you'll know, even if you're in a different time zone.
        </p>
        <div className="socials">
          <button className="github">
            <i className="fab fa-github"></i>
          </button>
          <button className="twitter">
            <i className="fab fa-twitter"></i>
          </button>
          <button className="pinterest">
            <i className="fab fa-pinterest-p"></i>
          </button>
        </div>
      </div>

      <div className="card">
        <div className="card-image">
          <img src="/Fredrik-Gullin.jfif" alt="Fredrik Gullin" />
        </div>
        <p className="name">Fredrik Gullin</p>
        <p>ScumMaster</p>
        <p>
        The Air Guitar enthusiast taking music to a whole new level. With his imaginary crowd, you question whether his talent lies in music or the power of imagination.
        </p>
        <div className="socials">
          <button className="github">
            <i className="fa-brands fa-github"></i>
          </button>
          <button className="twitter">
            <i className="fa-brands fa-twitter"></i>
          </button>
          <button className="pinterest">
            <i className="fa-brands fa-pinterest-p"></i>
          </button>
        </div>
      </div>

      <div className="card">
        <div className="card-image">
          <img src="/Victor-Hedegran.jfif" alt="Victor Hedegran" />
        </div>
        <p className="name">Victor Hedegran</p>
        <p>FullStack Developer</p>
        <p>
        The human hot sauce detector. He can taste the slightest hint of spice in any dish, even when it's claimed to be mild. Scoville scale? Victor's taste buds have a scale of it own. 
        </p>
        <div className="socials">
          <button className="github">
            <i className="fab fa-github"></i>
          </button>
          <button className="twitter">
            <i className="fab fa-twitter"></i>
          </button>
          <button className="pinterest">
            <i className="fab fa-pinterest-p"></i>
          </button>
        </div>
      </div>

      <div className="card">
        <div className="card-image">
          <img src="/Malin-Bragazzi.jfif" alt="Malin Bragazzi" />
        </div>
        <p className="name">Malin Bragazzi</p>
        <p>FullStack Developer</p>
        <p>
        The woman with an inexplicable power to attract stray cats. If she's in the park or walking down the street, feline friends seem magnetically drawn to her.
        </p>
        <div className="socials">
          <button className="github">
            <i className="fab fa-github"></i>
          </button>
          <button className="twitter">
            <i className="fab fa-twitter"></i>
          </button>
          <button className="pinterest">
            <i className="fab fa-pinterest-p"></i>
          </button>
        </div>
      </div>

      <div className="card">
        <div className="card-image">
          <img src="/Khadizatul-Qubra.jfif" alt="Khadizatul Qubra" />
        </div>
        <p className="name">Khadizatul Qubra</p>
        <p>FullStack Developer</p>
        <p>
        Khadiza has a photographic memory, but only for song lyrics. She can flawlessly recite every '90s pop hit' but will forget your name seconds after meeting you!
        </p>
        <div className="socials">
          <button className="github">
            <i className="fab fa-github"></i>
          </button>
          <button className="twitter">
            <i className="fab fa-twitter"></i>
          </button>
          <button className="pinterest">
            <i className="fab fa-pinterest-p"></i>
          </button>
        </div>
      </div>

      <div className="card">
        <div className="card-image">
          <img src="/Vincent-Wigardt.jfif" alt="Vincent Wigardt" />
        </div>
        <p className="name">Vincent Wigardt</p>
        <p>FullStack Developer</p>
        <p>
        The man blessed with the ability to perfectly mimic the sound of a trombone with his armpit. His talent leaves audiences in awe trying to perform their own notes.
        </p>
        <div className="socials">
          <button className="github">
            <i className="fab fa-github"></i>
          </button>
          <button className="twitter">
            <i className="fab fa-twitter"></i>
          </button>
          <button className="pinterest">
            <i className="fab fa-pinterest-p"></i>
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default GroupCards;
