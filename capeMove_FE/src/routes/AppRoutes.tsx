import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import JourneyPlanner from '../pages/JourneyPlanner';
import RealtimeArrivals from '../pages/RealtimeArrivals';
import FareCalculator from '../pages/FareCalculator';
import ReportIncident from '../pages/ReportIncident';
import AdminDashboard from '../pages/AdminDashboard';
import UserProfile from '../pages/UserProfile';
import ProtectedRoute from '../components/common/ProtectedRoute';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<ProtectedRoute roles={['user', 'moderator', 'admin']} />}>
        <Route path="/journey" element={<JourneyPlanner />} />
        <Route path="/realtime" element={<RealtimeArrivals />} />
        <Route path="/fares" element={<FareCalculator />} />
        <Route path="/report" element={<ReportIncident />} />
        <Route path="/profile" element={<UserProfile />} />
      </Route>

      <Route element={<ProtectedRoute roles={['admin']} />}>
        <Route path="/admin" element={<AdminDashboard />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
