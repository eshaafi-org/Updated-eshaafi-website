import React, { useEffect } from 'react';

const Index = () => {
  useEffect(() => {
    // Check if the page has already been reloaded during this session
    if (!sessionStorage.getItem('hasReloaded')) {
      // Mark that the page has reloaded
      sessionStorage.setItem('hasReloaded', 'true');
      // Reload the page
      window.location.reload();
    }
  }, []);

  return (
    <div></div>
  );
};

export default Index;
