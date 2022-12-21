import useGithubLoginMutation from "@hooks/useGithubLoginMutation";
import { api_types } from "@types";
import { useEffect } from "react";
import {
  useNavigate,
  useParams,
  useLocation,
  useSearchParams,
} from "react-router-dom";

function GitHubCallback() {
  const nav = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { mutate } = useGithubLoginMutation();

  const code = searchParams.get("code");

  useEffect(() => {
    mutate(code, {
      onSuccess: (data) => {
        const { access_token } = data.data as api_types.GithubLoginResult;
        console.log(access_token);
      },
      onError: () => {
        alert("깃허브 로그인 중 오류가 발생했습니다. 다시 시도하세요");
        nav("/githubconnect");
      },
    });
  }, []);

  return <div>code : {code} </div>;
}
export default GitHubCallback;
