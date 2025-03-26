import { Modal } from "@mantine/core";
import { useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import SocialsLogin from "./SocialsLogins";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";
import Otp from "./Otp";
import AccountType from "./AccountType";
import { AUTH_VIEWS } from "@/constants/auth-config";

function AuthModal({ opened, onClose, initialView = AUTH_VIEWS.ACCOUNT_TYPE }) {
  const [currentView, setCurrentView] = useState(initialView);
  const [authData, setAuthData] = useState({});
  
  const handleViewChange = (view, data = {}) => {
    setAuthData(prev => ({...prev, ...data}));
    setCurrentView(view);
  };

  const handleClose = () => {
    // setCurrentView(AUTH_VIEWS.ACCOUNT_TYPE);
    setAuthData({});
    onClose();
  };

  const renderView = () => {
    switch(currentView) {
      case AUTH_VIEWS.ACCOUNT_TYPE:
        return (
          <AccountType 
            onSelectType={(type) => {
              handleViewChange(AUTH_VIEWS.SIGN_UP, { accountType: type });
            }}
          />
        );
        
      case AUTH_VIEWS.SOCIAL_LOGIN:
        return (
          <SocialsLogin
            accountType={authData.accountType}
            onEmailLogin={() => handleViewChange(AUTH_VIEWS.SIGN_IN)}
            onSignUp={() => handleViewChange(AUTH_VIEWS.SIGN_UP)}
          />
        );

      case AUTH_VIEWS.SIGN_IN:
        return (
          <SignIn
            onForgotPassword={() => handleViewChange(AUTH_VIEWS.FORGOT_PASSWORD)}
            onSignUp={() => handleViewChange(AUTH_VIEWS.SIGN_UP)}
            onSuccess={handleClose}
            onBack={() => handleViewChange(AUTH_VIEWS.SOCIAL_LOGIN)}
          />
        );

      case AUTH_VIEWS.SIGN_UP:
        return (
          <SignUp
            accountType={authData.accountType}
            onSignIn={() => handleViewChange(AUTH_VIEWS.SOCIAL_LOGIN)}
            onSuccess={(email) => handleViewChange(AUTH_VIEWS.OTP, { email })}
            onBack={() => handleViewChange(AUTH_VIEWS.ACCOUNT_TYPE)}
          />
        );

      case AUTH_VIEWS.FORGOT_PASSWORD:
        return (
          <ForgotPassword
            onBack={() => handleViewChange(AUTH_VIEWS.SIGN_IN)}
            onSuccess={(token) => handleViewChange(AUTH_VIEWS.RESET_PASSWORD, { token })}
          />
        );

      case AUTH_VIEWS.RESET_PASSWORD:
        return (
          <ResetPassword
            token={authData.token}
            onSuccess={handleClose}
          />
        );

      case AUTH_VIEWS.OTP:
        return (
          <Otp
            email={authData.email}
            onSuccess={handleClose}
            onBack={() => handleViewChange(AUTH_VIEWS.SIGN_UP)}
          />
        );

      default:
        return null;
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      withCloseButton={false}
      centered
      size={currentView === AUTH_VIEWS.ACCOUNT_TYPE ? "lg" : 527}
      padding="xl"
    >
      {renderView()}
    </Modal>
  );
}

export default AuthModal;