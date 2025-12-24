import { useState, useEffect } from "react";


const Navbar = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const indicator = document.querySelector(".scroll-indicator");
  
    let lastScrollY = 0;
  
    const onScroll = () => {
      const currentY = window.scrollY;
  
      // At top + user tries to scroll up
      if (currentY === 0) {
        indicator?.classList.add("visible");
      } else {
        indicator?.classList.remove("visible");
      }
  
      lastScrollY = currentY;
    };
  
    window.addEventListener("scroll", onScroll, { passive: true });
  
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  
  return (
    <>
      {/* Inline CSS for Navbar */}
      <style>{`
        .navbar {
          height: 88px;
          padding: 0 48px;
          background: linear-gradient(90deg, #1f2230 0%, #232536 100%);
          display: flex;
          align-items: center;
          justify-content: flex-start;
          position: relative;
          z-index: 100;
        }

        .navbar__logo img {
          height: 48px;
          width: auto;
          border-radius: 4px;
        }

        .navbar__right {
          margin-left: auto;
          display: flex;
          align-items: center;
          gap: 32px;
        }

        .navbar__links {
          display: flex;
          align-items: center;
          gap: 40px;
        }

        .navbar__links a {
          color: #ffffff;
          text-decoration: none;
          font-family: "Space Grotesk", sans-serif;
          font-size: 18px;
          font-weight: 500;
          position: relative;
        }

        .navbar__links a::after {
          content: "";
          position: absolute;
          bottom: -6px;
          left: 0;
          width: 0%;
          height: 2px;
          background: #ffffff;
          transition: width 0.25s ease;
        }

        .navbar__links a:hover::after {
          width: 100%;
        }

        .navbar__cta {
          background: #ffffff;
          border-radius: 8px;
          color: #1f2230;
          padding: 18px 32px;
          font-family: "Space Grotesk", sans-serif;
          font-size: 20px;
          font-weight: 700;
          border: none;
          cursor: pointer;
        }

        /* Hamburger */
        .menu-btn {
          display: none;
          background: none;
          border: none;
          color: white;
          font-size: 28px;
          cursor: pointer;
        }

        /* Mobile dropdown */
        .mobile-menu {
          position: absolute;
          top: 88px;
          left: 0;
          width: 100%;
          background: #1f2230;
          display: flex;
          flex-direction: column;
          gap: 24px;
          padding: 32px;
          transform: translateY(-10px);
          opacity: 0;
          pointer-events: none;
          transition: all 0.25s ease;
        }

        .mobile-menu.open {
          transform: translateY(0);
          opacity: 1;
          pointer-events: auto;
        }

        .mobile-menu a {
          color: white;
          font-size: 20px;
          text-decoration: none;
        }
        
        /* Scroll down indicator */
.scroll-indicator {
  position: fixed;
  top: 14px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  font-family: "Space Grotesk", sans-serif;
  font-size: 12px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #94a3b8;
  opacity: 0;
  pointer-events: none;
  z-index: 999;
  transition: opacity 0.25s ease;
}

.scroll-indicator.visible {
  opacity: 1;
}

/* Arrow */
.scroll-indicator .arrow {
  width: 10px;
  height: 10px;
  border-left: 2px solid #94a3b8;
  border-bottom: 2px solid #94a3b8;
  transform: rotate(-45deg);
  animation: bounce 1.6s infinite;
}

@keyframes bounce {
  0% { transform: translateY(0) rotate(-45deg); opacity: 0.4; }
  50% { transform: translateY(6px) rotate(-45deg); opacity: 1; }
  100% { transform: translateY(0) rotate(-45deg); opacity: 0.4; }
}      

.mobile-cta {
  margin-top: 12px;
  padding: 16px;
  border-radius: 12px;
  border: none;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
}

/* Responsive */
@media (max-width: 900px) {
  .navbar__links,
  .navbar__cta {
    display: none;

  .menu-btn {
    display: block;
  }
}
      `}</style>

      {/* Navbar */}
      <nav className="navbar">
       
        <div className="navbar__logo">
          <img src="/assets/logo.png" alt="Real Africa" />
        </div>

        <div className="navbar__right">
          <div className="navbar__links">
            <a href="/travel">Travel</a>
            <a href="/">Home</a>
            <a href="/blog">Blog</a>
            <a href="/about">About Us</a>
            <a href="/contact">Contact us</a>
          </div>

          <button className="navbar__cta">Get Featured</button>

          <button
            className="menu-btn"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </div>
      </nav>

      <div className="scroll-indicator">
          <span>Scroll down to explore</span>
        <div className="arrow"></div>
      </div>

      {/* Mobile Dropdown */}
      <div className={`mobile-menu ${open ? "open" : ""}`}>
        <a onClick={() => setOpen(false)} href="/travel">Travel</a>
        <a onClick={() => setOpen(false)} href="/">Home</a>
        <a onClick={() => setOpen(false)} href="/blog">Blog</a>
        <a onClick={() => setOpen(false)} href="/about">About Us</a>
        <a onClick={() => setOpen(false)} href="/contact">Contact us</a>

        <button className="mobile-cta">Get Featured</button>
      </div>
    </>
  );
};

export default Navbar;