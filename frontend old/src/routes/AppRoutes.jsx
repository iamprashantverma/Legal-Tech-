import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import NotFound from "../pages/NotFound";
import Unauthorized from "../pages/Unauthorized";

import ProtectedRoute from "./ProtectedRoute";
import LawyerRoute from "./LawyerRoute";
import ClientRoute from "./ClientRoute";

import LawyerLayout from "../layout/LawyerLayout";
import LawyerDashboard from "../pages/lawyer/LawyerDashBoard";
import CaseList from "../pages/lawyer/CaseList";
import CaseDetails from "../pages/lawyer/CaseDetails";

import ClientLayout from "../layout/ClientLayout";
import ClientDashboard from "../pages/client/ClientDashboard";
import IntakeForm from "../pages/client/IntakeForm";
import IntakeSuccess from "../pages/client/IntakeSuccess";
import Intakes from "../component/common/Intakes";
import IntakeDetails from "../pages/client/IntakeDetails";

import { getMyIntakes,getMyCases} from "../service/api/client-service";
import {getPendingIntakes} from "../service/api/lawyer-service.js";

const AppRoutes = () => {

  return (
    <Routes>
      {/* PUBLIC */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* PROTECTED */}
      <Route element={<ProtectedRoute/>}>
        
        {/* LAWYER */}
        <Route element={<LawyerRoute/>}>
          <Route path="/lawyer" element={<LawyerLayout />}>
            <Route index element={<LawyerDashboard />} />
            <Route path="cases" element={<CaseList />} />

             {/* CASES  no filter */}
            <Route
              path="intake-review"
              element={
                <Intakes
                  fetchFn={getPendingIntakes}
                  showFilter={false}
                  showComment={true}
                />
              }
            />
            <Route path="cases/:id" element={<CaseDetails />} />
          </Route>
        </Route>

        {/* CLIENT */}
        <Route element={<ClientRoute/>}>
          <Route path="/client" element={<ClientLayout />}>
            <Route index element={<ClientDashboard />} />

            {/* CASES  no filter */}
            <Route
              path="cases"
              element={
                <Intakes
                  fetchFn={getMyCases}
                  showFilter={false}
                />
              }
            />

            {/* INTAKES  filter enabled */}
            <Route
              path="intakes"
              element={
                <Intakes
                  fetchFn={getMyIntakes}
                  showFilter={true}
                />
              }
            />

            <Route path="intakes/:id" element={<IntakeDetails />} />
            <Route path="intake-form" element={<IntakeForm />} />
            <Route path="form-success" element={<IntakeSuccess />} />
            
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
