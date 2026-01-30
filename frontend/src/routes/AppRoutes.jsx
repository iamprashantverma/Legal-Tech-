import { Routes, Route } from "react-router-dom";

import PublicRoutes from "../routes/PublicRoutes";
import ClientRoutes from "./privateRoutes/ClientRoutes";
import LawyerRoutes from "./privateRoutes/LawyerRoutes";
import ProtectedRoutes from "./ProtectedRoutes";

import Layout from "../component/common/Layout";
import DashBoard from "../pages/client/DashBoard";
import Intakes from "../component/common/Intakes";
import IntakeDetails from "../component/common/IntakeDetails";
import IntakeForm from "../component/client/IntakeForm";
import AuditLogDetails from "../component/admin/AuditLogDetails";
import AuditLogList from "../component/admin/AuditLogList";

const AppRoutes = () => {
  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route element={<Layout />}>
        <Route path="/*" element={<PublicRoutes />} />
        
      </Route>

      {/* PROTECTED ROUTES */}
      <Route element={<ProtectedRoutes />}>
        <Route element={<Layout />}>
          
          {/* CLIENT ROUTES */}
          <Route element={<ClientRoutes />}>
            <Route path="/client" element={<DashBoard />} />
            <Route path="/client/intakes" element = {<Intakes />} />
            <Route path="/client/intakes/:id" element = {<IntakeDetails />} />
            <Route path="client/intake/create" element = {<IntakeForm/>} />
            <Route path="/client/audit-logs" element = {<AuditLogList/> } />
            <Route path="/client/audit-logs/:entityType/:entityId" element={<AuditLogDetails />} />
          </Route>

          {/* LAWYER ROUTES */}
          <Route element={<LawyerRoutes />}>
            <Route path="/lawyer" element={<p> Welcome to DashBoard  Lawyer </p>} />
            <Route path="/lawyer/intake-review" element={<Intakes />} />
            <Route
              path="/lawyer/intake-review/:id"
              element={<IntakeDetails />}
            />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
