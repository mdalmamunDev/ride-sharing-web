// src/router.js
import { createRouter, createWebHistory } from "vue-router";
import NotFoundPage from "../pages/NotFoundPage.vue"; // <- Create this component
import AuthLayout from "../components/AuthLayout.vue";
import AppLayout from "../components/AppLayout.vue";
import LoginPage from "../pages/auth/LoginPage.vue";
import ProfilePage from "@/pages/ProfilePage.vue";
import UserLayout from "@/components/UserLayout.vue";
import ChangePassPage from "@/pages/ChangePassPage.vue";
import SignupPage from "@/pages/auth/SignupPage.vue";
import BookingPage from "@/pages/BookingPage.vue";
import NavigatePage from "@/pages/NavigatePage.vue";
import MessagePage from "@/pages/MessagePage.vue";
import UserDetailsPage from "@/pages/UserDetailsPage.vue";
import MyRidesPage from "@/pages/MyRidesPage.vue";
import SupportPage from "@/pages/SupportPage.vue";
import CompleteAccountPage from "@/pages/auth/CompleteAccountPage.vue";
import DriverHomePage from "@/pages/DriverHomePage.vue";
import MyPaymentsPage from "@/pages/MyPaymentsPage.vue";

const routes = [
  {
    path: "/auth",
    component: AuthLayout,
    children: [
      { path: "", redirect: "auth/login" }, // Redirect to /auth/login
      { path: "login", component: LoginPage, meta: { title: "Login", dataUrl: "auth/login" } },
      { path: "signup", component: SignupPage, meta: { title: "Signup", dataUrl: "auth/register" } },
      // { path: "forgot-password", component: ForgotPasswordPage, meta: { title: "Forgot Password", dataUrl: "auth/forgot-password" } },
      // { path: "verify-email", component: VerifyEmailPage, meta: { title: "Verify Email", dataUrl: "auth/verify-otp" } },
      // { path: "reset-password", component: ResetPasswordPage, meta: { title: "Reset Password", dataUrl: "auth/forgot/reset-password" } },
    ],
  },
  { path: "/auth/complete", component: CompleteAccountPage, meta: { title: "Complete Account", dataUrl: "provider/complete-profile" } },


  {
    path: "/",
    component: AppLayout,
    children: [
      { path: "", component: BookingPage, meta: { title: "Book Ride", dataUrl: "job" } },
      { path: "d-home", component: DriverHomePage, meta: { title: "Home", dataUrl: "job/provider/requested" } },
      { path: "navigate", component: NavigatePage, meta: { title: "Navigate", dataUrl: "job" } },
      { path: "my-rides", component: MyRidesPage, meta: { title: "My Rides", dataUrl: "job/ongoing" } },
      { path: "support", component: SupportPage, meta: { title: "Help & Support", dataUrl: "support" } },
      { path: "messages", component: MessagePage, meta: { title: "Chat", dataUrl: "messages" } },
      { path: "payments", component: MyPaymentsPage, meta: { title: "Payments", dataUrl: "payment/history" } },
      { path: "user-details", component: UserDetailsPage, meta: { title: "User Details", dataUrl: "users" } },
      {
        path: "/",
        component: UserLayout,
        children: [
          { path: "profile", component: ProfilePage, meta: { title: "Profile", dataUrl: "user/me" } },
          { path: "reset-pass", component: ChangePassPage, meta: { title: "Reset Password", dataUrl: "auth/change-password" } },
          // { path: "settings", component: SettingsPage, meta: { title: "Settings", dataUrl: "settings" } },
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
  const publicPages = ['/auth/login', '/auth/signup', '/auth/forgot-password', '/auth/verify-email', '/auth/reset-password'];
  const token = localStorage.getItem('token');

  // If user is logged in, don't permit visiting public pages
  if (token && publicPages.includes(to.path)) {
    return next('/');
  }
  const authRequired = !publicPages.includes(to.path) && !to.path.startsWith('/auth');

  document.title = `Split Ride | ${to.meta.title}`;

  if (authRequired && !token) {
    return next('/auth/login');
  }
  next();
});

export default router;
