"use client";
import { useState, useEffect } from "react";
import { getSession } from "next-auth/react";

const useClientSession = (p) => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const sessionHandler = async () => {
      const session = await getSession();
      setSession(session);
    };
    sessionHandler();
  }, [p]);

  return [session];
};

export default useClientSession;
