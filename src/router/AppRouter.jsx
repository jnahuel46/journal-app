import React from "react";
import { Routes, Route } from "react-router-dom";
import AuthRoutes from "../auth/routes/AuthRoutes";
import JournalRoutes from "../journal/routes/JournalRoutes";

const AppRouter = () => {
  return (
    <Routes>
      {/* Login to app routes*/}
      <Route path="/auth/*" element={<AuthRoutes />} />

      {/* Journal app */}
      <Route path="/*" element={<JournalRoutes />} />
    </Routes>
  );
};

export default AppRouter;
