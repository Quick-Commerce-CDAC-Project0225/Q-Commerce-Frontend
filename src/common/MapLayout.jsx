import React from 'react';

// This layout component simply renders the page component passed to it.
// It's used for full-screen pages like maps where you don't want a navbar.
const MapLayout = ({ children }) => {
  return <>{children}</>;
};

export default MapLayout;
