// src/router.js
import { createRouter, createWebHistory } from "vue-router";
import NotFoundPage from "../pages/NotFoundPage.vue"; // <- Create this component
import AuthLayout from "../components/AuthLayout.vue";
import AppLayout from "../components/AppLayout.vue";
import LoginPage from "../pages/auth/LoginPage.vue";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage.vue";
import VerifyEmailPage from "../pages/auth/VerifyEmailPage.vue";
import ResetPasswordPage from "../pages/auth/ResetPasswordPage.vue";
import ReportPage from "../pages/ReportPage.vue";
import ClientsAccountsPage from "../pages/ClientsAccountsPage.vue"; // <- Create this component
import EquipmentsPage from "../pages/EquipmentsPage.vue"; // <- Create this component
import ProfilePage from "@/pages/ProfilePage.vue";
import UserLayout from "@/components/UserLayout.vue";
import ChangePassPage from "@/pages/ChangePassPage.vue";
import EquipmentDetailsPage from "@/pages/EquipmentDetailsPage.vue";
import SettingsPage from "@/pages/SettingsPage.vue";

const routes = [
  {
    path: "/auth",
    component: AuthLayout,
    children: [
      { path: "", redirect: "auth/login" }, // Redirect to /auth/login
      { path: "login", component: LoginPage, meta: { title: "Login", dataUrl: "auth/sign-in" } },
      { path: "forgot-password", component: ForgotPasswordPage, meta: { title: "Forgot Password", dataUrl: "auth/forgot-password" } },
      { path: "verify-email", component: VerifyEmailPage, meta: { title: "Verify Email", dataUrl: "auth/verify-otp" } },
      { path: "reset-password", component: ResetPasswordPage, meta: { title: "Reset Password", dataUrl: "auth/forgot/reset-password" } },
    ],
  },

  {
    path: "/",
    component: AppLayout,
    children: [
      { path: "", redirect: "/clients" }, // Redirect to /clients
      { path: "clients", component: ClientsAccountsPage, meta: { title: "Client Accounts", dataUrl: "clients" } },
      { path: "equipments", component: EquipmentsPage, meta: { title: "Equipments", dataUrl: "equipments" } },
      { path: "equipment-details", component: EquipmentDetailsPage, meta: { title: "Equipment Details", dataUrl: "equipments" } },
      { path: "report", component: ReportPage, meta: { title: "Report", dataUrl: "clients/report" } },
      {
        path: "/",
        component: UserLayout,
        children: [
          { path: "profile", component: ProfilePage, meta: { title: "Profile", dataUrl: "user/profile" } },
          { path: "reset-pass", component: ChangePassPage, meta: { title: "Reset Password", dataUrl: "auth/reset-password" } },
          { path: "settings", component: SettingsPage, meta: { title: "Settings", dataUrl: "settings" } },
        ],
      },
    ]
  },

  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFoundPage, meta: { title: "404 - Page Not Found" } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const publicPages = ['/auth/login', '/auth/forgot-password', '/auth/verify-email', '/auth/reset-password'];
  const token = localStorage.getItem('token');

  // If user is logged in, don't permit visiting public pages
  if (token && publicPages.includes(to.path)) {
    return next('/');
  }
  const authRequired = !publicPages.includes(to.path) && !to.path.startsWith('/auth');

  document.title = `ACES | ${to.meta.title}`;

  if (authRequired && !token) {
    return next('/auth/login');
  }
  next();
});

export default router;
