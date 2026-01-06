import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    // This runs AFTER navigation and beats browser restoration
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;