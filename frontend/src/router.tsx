import React, { useEffect } from "react";
import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  ScrollRestoration,
  useNavigate,
} from "@tanstack/react-router";
import { Layout } from "./components/layout/Layout";
import { LandingPage } from "./pages/LandingPage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { Dashboard } from "./pages/Dashboard";
import { MarketDetail } from "./pages/MarketDetail";
import { Performance } from "./pages/Performance";
import { Methodology } from "./pages/Methodology";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { AdminMarkets } from "./pages/admin/AdminMarkets";
import { AdminSignals } from "./pages/admin/AdminSignals";
import { AdminSystem } from "./pages/admin/AdminSystem";
import { useAuth } from "./context/AuthContext";
import { ToastContainer } from "./components/ui/Toast";

// Root Route
const rootRoute = createRootRoute({
  component: () => (
    <>
      <ScrollRestoration />
      <Outlet />
      <ToastContainer />
    </>
  ),
});

// Auth Guard Wrapper
const ProtectedRoute = ({
  children,
  admin = false,
}: {
  children: React.ReactNode;
  admin?: boolean;
}) => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) return;
    if (!user) {
      navigate({ to: "/login" });
    } else if (admin && user.role !== "admin") {
      navigate({ to: "/dashboard" });
    }
  }, [user, isLoading, admin, navigate]);

  if (isLoading) return null;
  if (!user) return null;
  if (admin && user.role !== "admin") return null;

  return <Layout isAdmin={admin}>{children}</Layout>;
};

// Named route components (stable references — no inline arrows)
const DashboardPage = () => (
  <ProtectedRoute>
    <Dashboard />
  </ProtectedRoute>
);
const MarketPage = () => (
  <ProtectedRoute>
    <MarketDetail />
  </ProtectedRoute>
);
const PerformancePage = () => (
  <ProtectedRoute>
    <Performance />
  </ProtectedRoute>
);
const AdminPage = () => (
  <ProtectedRoute admin>
    <AdminDashboard />
  </ProtectedRoute>
);
const AdminMarketsPage = () => (
  <ProtectedRoute admin>
    <AdminMarkets />
  </ProtectedRoute>
);
const AdminSignalsPage = () => (
  <ProtectedRoute admin>
    <AdminSignals />
  </ProtectedRoute>
);
const AdminSystemPage = () => (
  <ProtectedRoute admin>
    <AdminSystem />
  </ProtectedRoute>
);

// Route Definitions
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: LandingPage,
});
const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
});
const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/register",
  component: RegisterPage,
});
const methodologyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/methodology",
  component: Methodology,
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: DashboardPage,
});
const marketRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/market/$id",
  component: MarketPage,
});
const performanceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/performance",
  component: PerformancePage,
});

// Admin Routes
const adminIndexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminPage,
});
const adminMarketsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/markets",
  component: AdminMarketsPage,
});
const adminSignalsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/signals",
  component: AdminSignalsPage,
});
const adminSystemRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/system",
  component: AdminSystemPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  registerRoute,
  dashboardRoute,
  marketRoute,
  performanceRoute,
  methodologyRoute,
  adminIndexRoute,
  adminMarketsRoute,
  adminSignalsRoute,
  adminSystemRoute,
]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
