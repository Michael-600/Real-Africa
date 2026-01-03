import React from 'react';
import CategoriesSection from "../choose_category";
import Footer from "../footer";
import Seats from '../member'

export default function PageLayout({ children, sayFooter = true }) {
  return (
    <>
      {children}

      {/* Shared sections */}
      <CategoriesSection />
      <Seats />
      
    </>
  );
}