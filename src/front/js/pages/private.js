import React, { useState, useEffect } from "react";

export const PrivatePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      setIsLoading(false);
      return;
    }

    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    fetch(
      "https://benbungle-laughing-disco-w6g4q49x5wrhg49v-3001.preview.app.github.dev/private",
      options
    )
      .then((response) => {
        if (response.ok) {
          setIsLoggedIn(true);
        } else {
          throw new Error("Authentication failed");
        }
      })
      .catch((error) => {
        console.error(error);
        // redirect to login page
        window.location.href = "/login";
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    window.location.href = "/login";
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isLoggedIn) {
    return <div>You are not authorized to view this page.</div>;
  }

  return (
    <div className="text-center mt-5">
      <h1>Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
      <p>

      </p>
      <h1 className="alert-success">
        Congratulations!<br></br> You're on the private Dashboard!
      </h1>
    </div>
  );
};
