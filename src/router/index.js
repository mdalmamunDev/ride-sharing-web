// src/router.js
import { createRouter, createWebHistory } from "vue-router";
import NotFoundPage from "../pages/NotFoundPage.vue"; // <- Create this component
import AuthLayout from "../components/AuthLayout.vue";
import AppLayout from "../components/AppLayout.vue";
import LoginPage from "../pages/auth/LoginPage.vue";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage.vue";
import VerifyEmailPage from "../pages/auth/VerifyEmailPage.vue";
import ResetPasswordPage from "../pages/auth/ResetPasswordPage.vue";
import ProfilePage from "@/pages/ProfilePage.vue";
import UserLayout from "@/components/UserLayout.vue";
import ChangePassPage from "@/pages/ChangePassPage.vue";
import SettingsPage from "@/pages/SettingsPage.vue";
import SignupPage from "@/pages/auth/SignupPage.vue";
import BookingPage from "@/pages/BookingPage.vue";
import NavigatePage from "@/pages/NavigatePage.vue";
import MessagePage from "@/pages/MessagePage.vue";
import UserDetailsPage from "@/pages/UserDetailsPage.vue";
import MyRidesPage from "@/pages/MyRidesPage.vue";
import SupportPage from "@/pages/SupportPage.vue";
import CompleteAccountPage from "@/pages/auth/CompleteAccountPage.vue";
import DriverHomePage from "@/pages/DriverHomePage.vue";

const routes = [
  {
    path: "/auth",
    component: AuthLayout,
    children: [
      { path: "", redirect: "auth/login" }, // Redirect to /auth/login
      { path: "login", component: LoginPage, meta: { title: "Login", dataUrl: "auth/sign-in" } },
      { path: "signup", component: SignupPage, meta: { title: "Signup", dataUrl: "auth/sign-up" } },
      { path: "forgot-password", component: ForgotPasswordPage, meta: { title: "Forgot Password", dataUrl: "auth/forgot-password" } },
      { path: "verify-email", component: VerifyEmailPage, meta: { title: "Verify Email", dataUrl: "auth/verify-otp" } },
      { path: "reset-password", component: ResetPasswordPage, meta: { title: "Reset Password", dataUrl: "auth/forgot/reset-password" } },
    ],
  },
  { path: "/auth/complete", component: CompleteAccountPage, meta: { title: "Complete Account", dataUrl: "auth/complete" } },


  {
    path: "/",
    component: AppLayout,
    children: [
      { path: "", component: BookingPage, meta: { title: "Book Ride", dataUrl: "booking" } },
      { path: "d-home", component: DriverHomePage, meta: { title: "Home", dataUrl: "driver-home" } },
      { path: "navigate", component: NavigatePage, meta: { title: "Navigate", dataUrl: "navigate" } },
      { path: "my-rides", component: MyRidesPage, meta: { title: "My Rides", dataUrl: "clients" } },
      { path: "support", component: SupportPage, meta: { title: "Help & Support", dataUrl: "support" } },
      { path: "messages", component: MessagePage, meta: { title: "Chat", dataUrl: "messages" } },
      { path: "user-details", component: UserDetailsPage, meta: { title: "User Details", dataUrl: "users" } },
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
    // return next('/');
  }
  const authRequired = !publicPages.includes(to.path) && !to.path.startsWith('/auth');

  document.title = `Split Ride | ${to.meta.title}`;

  if (authRequired && !token) {
    // return next('/auth/login');
  }
  next();
});

export default router;
