import React from 'react';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";


const Navbar = ({ onGetFeatured }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const indicator = document.querySelector(".scroll-indicator");
  
    const onWheel = (e) => {
      // Only trigger if user scrolls UP at the top
      if (window.scrollY === 0 && e.deltaY < 0) {
        indicator?.classList.add("visible");
  
        // auto-hide after a moment
        clearTimeout(window.__scrollHintTimeout);
        window.__scrollHintTimeout = setTimeout(() => {
          indicator?.classList.remove("visible");
        }, 1200);
      }
    };
  
    window.addEventListener("wheel", onWheel, { passive: true });
  
    return () => {
      window.removeEventListener("wheel", onWheel);
    };
  }, []);
  
  return (
    <>
      {/* Inline CSS for Navbar */}
      <style>{`
        body {
          overflow-x: hidden;
        }
        :root {
          --font-grotesk: "Space Grotesk", system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
        }
        *, *::before, *::after {
          box-sizing: border-box;
        }
        .navbar {
          height: 88px;
          padding: 0 16px;
          background: linear-gradient(90deg, #1f2230 0%, #232536 100%);
          display: flex;
          align-items: center;
          justify-content: flex-start;
          position: relative;
          z-index: 1001;
          box-sizing: border-box;
          width: 100%;
          overflow-x: hidden;
          max-width: 100vw;
          overflow: hidden;
        }

        .navbar__logo img {
          height: clamp(32px, 5vw, 48px);
          width: auto;
          border-radius: 4px;
        }

        .navbar__right {
          margin-left: auto;
          display: flex;
          align-items: center;
          gap: 32px;
          min-width: 0;
          flex-shrink: 1;
        }

        .navbar__links {
          display: flex;
          align-items: center;
          gap: 40px;
          flex-wrap: nowrap;
          white-space: nowrap;
        }

        .navbar__links a {
          color: #ffffff;
          text-decoration: none;
          font-family: var(--font-grotesk);
          font-size: 18px;
          font-weight: 500;
          position: relative;
        }
        .navbar__cta {
          text-decoration: none !important;
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
        .navbar__cta::after {
          display: none !important;
        }

        .navbar__links a:hover::after {
          width: 100%;
        }

        .navbar__cta {
          background: #ffffff;
          border-radius: 8px;
          color: #1f2230;
          padding: 18px 32px;
          font-family: var(--font-grotesk);
          font-size: 20px;
          font-weight: 700;
          border: none;
          cursor: pointer;
          white-space: nowrap;
          flex-shrink: 0;
        }

        /* Hamburger */
        .menu-btn {
          display: none;
          background: none;
          border: none;
          color: white;
          font-size: 28px;
          cursor: pointer;
          line-height: 1;
        }

        /* Mobile dropdown */
        .mobile-menu {
          position: fixed;
          top: 72px;
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
          z-index: 1000;
          box-sizing: border-box;
          overflow-x: hidden;
          max-width: 100vw;
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
          font-family: var(--font-grotesk);
          padding: 8px 0;
        }
        
        .mobile-menu .mobile-cta {
          color: #1f2230 !important;
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
  font-family: var(--font-grotesk);
  font-size: 12px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #94a3b8;
  opacity: 0;
  pointer-events: none;
  z-index: 999;
  transition: opacity 0.25s ease;
  max-width: 100%;
  width: fit-content;
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
  font-family: var(--font-grotesk);
  text-decoration: none !important;
  color: #1f2230 !important;
  background: #ffffff;
  text-align: center;
  display: block;
}

.mobile-cta:hover,
.mobile-cta:active,
.mobile-cta:focus,
.mobile-cta:visited {
  text-decoration: none;
  color: #1f2230;
}

/* Responsive */
@media (max-width: 900px) {
  .navbar__links,
  .navbar__cta {
    display: none;
  }

  .menu-btn {
    display: block;
  }

  .navbar {
    height: 72px;
    padding: 0 16px;
  }

  .navbar__logo img {
    height: 36px;
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
            
            <Link to="/">Home</Link>
            <Link to="/about-us">About Us</Link>
            <Link to="/travel">Travel</Link>
            
            <button
              className="navbar__cta"
              style={{
                background: "transparent",
                color: "#ffffff",
                padding: 0,
                fontSize: "18px",
                fontWeight: 500,
                cursor: "pointer",
              }}
              onClick={onGetFeatured}
            >
              Get Featured
            </button>
            <Link to="/technology">Tech</Link>
            <Link to="/communities">Communities</Link>
          </div>
          
          <Link
  to="/communities"
  state={{ from: "mentored" }}
  className="navbar__cta"
>
  Get Mentored
</Link>
      
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
        <Link onClick={() => setOpen(false)} to="/travel">Travel</Link>
        <Link onClick={() => setOpen(false)} to="/">Home</Link>
        <Link onClick={() => setOpen(false)} to="/blog">Blog</Link>
        <Link onClick={() => setOpen(false)} to="/about-us">About Us</Link>
        <Link onClick={() => setOpen(false)} to="/technology">Tech</Link>
        
    
        <button
          onClick={() => {
            setOpen(false);
            onGetFeatured();
          }}
          style={{
            background: "none",
            border: "none",
            padding: 0,
            color: "white",
            fontSize: "20px",
            textAlign: "left",
            cursor: "pointer",
            fontFamily: "var(--font-grotesk)",
          }}
        >
          Get Featured
        </button>

        <Link
          to="/communities"
          className="mobile-cta"
          state={{ from: "mentored" }}
        >
          Get Mentored
        </Link>
      </div>
    </>
  );
};

export default Navbar;