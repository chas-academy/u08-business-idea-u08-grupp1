import "./Navbar.css"

const Navbar = () => {
  return (
    <nav>
      <div className="nav-bar">
        <div className="pages">
          <ul>
            <li><a href="#"><img src="/public/SWC.png" className="logo" alt="SWC Logo"/></a></li>
            <li className="search"><a href="#" aria-label="search"><i id="search" className="fas fa-search"></i>Search</a></li>
            <li className="about-us"><a href="#about-us" >About Us</a></li>
          </ul>
        </div>
      </div>
         
      <div className="mobile-nav">
        <div className="mobile-pages">
          <ul>
            <li><a href="#" aria-label="home"><i className="fa-solid fa-house"></i></a>Home</li>
            <li><a href="#" aria-label="references"><i className="fa-solid fa-user-group"></i></a>About Us</li>
            <li><a href="#" aria-label="knowledge"><i className="fa-solid fa-search"></i></a>Search</li>
            <li><a href="#" aria-label="portfolio"><i className="fa-solid fa-dumbbell"></i></a>Utegym</li>
            <li><a href="#" aria-label="profile"><i className="fa-solid fa-user"></i></a>Profile</li>
          </ul>
        </div>
      </div>
      
    </nav>
  );
};

export default Navbar;
