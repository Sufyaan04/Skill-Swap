import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const OAuthCallback = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = params.get("token");
    const error = params.get("error");

    if (error) {
      navigate("/login?error=oauth_failed");
      return;
    }

    if (token) {
      localStorage.setItem("token", token);
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div className="flex min-h-svh items-center justify-center bg-muted">
      <div className="flex flex-col items-center gap-3">
        <div className="ss-spinner ss-spinner-lg" />
        <p className="text-sm text-muted-foreground">Signing you in...</p>
      </div>
    </div>
  );
};

export default OAuthCallback;