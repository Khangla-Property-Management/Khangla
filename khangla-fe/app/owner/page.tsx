"use client";

import { useState } from "react";
import OwnerPage from "@/components/owner-page";
import OwnerLanding from "@/components/owner-landing";

export default function HomePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleGetStarted = () => {
    setIsAuthenticated(true);
  };

  if (!isAuthenticated) {
    return (
      <div className="prelogin-background">
        <OwnerLanding onGetStarted={handleGetStarted} />
      </div>
    );
  }

  return <OwnerPage />;
}
