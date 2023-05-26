import { Routes, Route, Navigate } from "react-router-dom";
import AuthRoutes from "../auth/routes/AuthRoutes";
import JournalRoutes from "../journal/routes/JournalRoutes";
import CheckingAuth from "../ui/components/CheckingAuth";
import { useCheckAuth } from "../hooks/useCheckAuth";

const AppRouter = () => {
  const status = useCheckAuth();

  if (status === "checking") {
    return <CheckingAuth />;
  }

  return (
    <Routes>
      {status === "authenticated" ? (
        //Journal app
        <Route path="/*" element={<JournalRoutes />} />
      ) : (
        //Login to app routes
        <Route path="/auth/*" element={<AuthRoutes />} />
      )}
      <Route path="/*" element={<Navigate to={"auth/login"} />} />
    </Routes>
  );
};

export default AppRouter;
