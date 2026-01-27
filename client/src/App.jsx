import React from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import GetMentoredPage from './pages/get-mentored';
import InterviewPage from './pages/categories/Interviews'
import TravelPage from './pages/travel'
import AboutUsPage from './pages/about-us'
import MainLayout from './components/Layout/MainLayout';
import Categories from './pages/categories/opportunities';
import FeaturedCEOs from './pages/categories/features-ceos';
import InterviewSelect from './pages/interview-detail';
import Technology from './pages/categories/technology';
import { useAuth } from "./lib/authContext";
import Auth from "./pages/Auth";
import { AuthProvider } from "./lib/authContext"
import Communities from './pages/communities'
import CommunityPage from './pages/CommunityPage';
import AdminLayout from "../admin/AdminLayout";
import AdminDashboard from "../admin/AdminDashboard";
import AdminUsers from "../admin/AdminUsers";



function App() {
  const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-zinc-500">Loading…</p>
        </div>
      );
    }

    if (!user) {
      return <Navigate to="/auth" replace state={{ from: location.pathname }} />;
    }

    return children;
  };

  const AdminRoute = ({ children }) => {
    const { user, profile, loading } = useAuth();
    console.log("AUTH PROFILE:", profile);
    console.log("USER:", user);
    console.log("PROFILE:", profile);
    if (loading && !user) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-zinc-500">Loading…</p>
        </div>
      );
    }

    if (!user) {
      return <Navigate to="/auth" replace />;
    }

    if (!profile || profile.role?.toLowerCase() !== "admin") {
      return <Navigate to="/" replace />;
    }

    return children;
  };

  return (
    <AuthProvider>
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route
            path="/"
            element={
              <Home />
            }
          />
          <Route path="/travel" element={             
              <TravelPage />}/>

          <Route path="/about-us" element={<AboutUsPage />} />
          <Route path="/get-mentored" element={
            <ProtectedRoute>
            <GetMentoredPage />
            </ProtectedRoute>} />
          <Route path="/interviews" element={<InterviewPage />} />
          <Route path="/communities" element={<Communities />} />
          <Route path="/opportunities" element={<Categories />} />
          <Route path="/featured-ceos" element={<FeaturedCEOs />} />
          <Route path="/technology" element={
            <ProtectedRoute>
            <Technology /> 
            </ProtectedRoute> } />
        <Route
          path="/communities/:slug"
          element={<CommunityPage />}
        />        
          <Route path="/interviews/:slug" element={<InterviewSelect />} />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<AdminUsers />} />
          </Route>
        </Routes>
      </MainLayout>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;