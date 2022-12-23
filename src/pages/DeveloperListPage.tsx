import DeveloperItem from "@components/DeveloperItem";
import IconButton from "@components/IconButton";
import useGetRecommendDevlopers from "@hooks/useGetRecommendDevlopers";
import Layout from "@layout/Layout";
import { useNavigate } from "react-router-dom";

function DeveloperListPage() {
  const nav = useNavigate();

  const { data: developerList, isLoading } = useGetRecommendDevlopers({
    refetchOnMount: true,
  });

  console.log(developerList);

  return (
    <Layout
      header={{
        pageName: "추천 개발자",
        leftButton: (
          <IconButton
            type={"light"}
            icon={"goback"}
            onClick={() => {
              nav(-1);
            }}
          />
        ),
      }}
      footer
      isLoading={isLoading}
    >
      <div>
        {developerList?.map((it) => (
          <DeveloperItem
            id={it.id}
            avatar_url={it.avatar_url}
            name={it.username}
            bio={it.user_detail_individual?.bio as string}
          />
        ))}
      </div>
    </Layout>
  );
}

export default DeveloperListPage;
