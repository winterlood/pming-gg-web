import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function EmailVerifiedPage() {
  const nav = useNavigate();
  useEffect(() => {
    alert(
      "이메일 인증에 성공했습니다! 확인을 누르면 로그인 페이지로 이동합니다"
    );
    nav("/login", { replace: true });
  }, []);
  return <div></div>;
}
export default EmailVerifiedPage;
