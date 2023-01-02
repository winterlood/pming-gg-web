import React, { useEffect } from "react";
import "./App.scss";
import { Routes, Route, useLocation } from "react-router-dom";
import RegisterPage from "@pages/RegisterPage";
import LoginPage from "@pages/LoginPage";
import EmailVerifiedPage from "@pages/EmailVerifiedPage";
import HomePage from "@pages/HomePage";
import ProfileEditPage from "@pages/ProfileEditPage";
import GitHubConnectPage from "@pages/GitHubConnectPage";
import GitHubCallback from "@pages/GitHubCallback";
import ProfilePage from "@pages/ProfilePage";
import AlarmPage from "@pages/AlarmPage";
import GitHubProfileEditPage from "@pages/GitHubProfileEditPage";
import JobPostEditPage from "@pages/JobPostEditPage";
import JobPostDetail from "@pages/JobPostDetail";
import JobListPage from "@pages/JobListPage";
import DeveloperListPage from "@pages/DeveloperListPage";
import DirectOfferPage from "@pages/DirectOfferPage";
import ContactPage from "@pages/ContactPage";
import MagazineDetailPage from "@pages/MagazineDetailPage";
import MagazineListPage from "@pages/MagazineListPage";
import TermPage from "@pages/TermPage";
import ForgotPasswordPage from "@pages/ForgotPasswordPage";
import ResetPasswordPage from "@pages/ResetPasswordPage";

function App() {
  const location = useLocation();
  const pathname = location.pathname;
  useEffect(() => {
    const stackLength: number = window.history.length;
    // @ts-ignore
    if (window.ReactNativeWebView) {
      // @ts-ignore
      window.ReactNativeWebView.postMessage(
        JSON.stringify({
          type: "nav",
          location: pathname,
          stackLength: stackLength,
        })
      );
    }
  }, [pathname]);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/email-verified" element={<EmailVerifiedPage />} />
        <Route path="/alarm" element={<AlarmPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile/:id" element={<ProfilePage />} />
        <Route path="/profile/create" element={<ProfileEditPage />} />
        <Route path="/profile/edit" element={<ProfileEditPage />} />
        <Route
          path="/profile/edit/github"
          element={<GitHubProfileEditPage />}
        />
        <Route path="/profile/individual/:id" element={<div>profile:id</div>} />
        <Route path="/profile/business/:id" element={<div>profile:id</div>} />
        <Route path="/jobs" element={<JobListPage />} />

        <Route path="/jobpost" element={<div>profile:id</div>} />
        <Route path="/jobpost/new" element={<JobPostEditPage />} />
        <Route path="/jobpost/edit/:id" element={<JobPostEditPage />} />
        <Route path="/jobpost/:id" element={<JobPostDetail />} />
        <Route path="/joboffer" element={<div>profile:id</div>} />
        <Route path="/joboffer/new" element={<div>profile:id</div>} />
        <Route path="/joboffer/edit/:id" element={<JobPostEditPage />} />
        <Route path="/joboffer/:id" element={<div>profile:id</div>} />
        <Route path="/githubconnect" element={<GitHubConnectPage />} />
        <Route path="/github-callback" element={<GitHubCallback />} />

        <Route path="/developers" element={<DeveloperListPage />} />
        <Route path="/direct-offer/:id" element={<DirectOfferPage />} />
        <Route path="/contact/:id" element={<ContactPage />} />
        <Route path="/magazine" element={<MagazineListPage />} />
        <Route path="/magazine/:id" element={<MagazineDetailPage />} />
        <Route path="/term" element={<TermPage />} />
        <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
        <Route path="/reset" element={<ResetPasswordPage />} />
      </Routes>
    </div>
  );
}

export default App;
