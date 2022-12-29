import DeveloperItem from "@components/DeveloperItem";
import IconButton from "@components/IconButton";
import useGetRecommendDevlopers from "@hooks/useGetRecommendDevlopers";
import Layout from "@layout/Layout";
import { useNavigate } from "react-router-dom";

import classNames from "classnames/bind";
import style from "./DeveloperListPage.module.scss";
import { Alert } from "@mui/material";

const cx = classNames.bind(style);

function DeveloperListPage() {
  const nav = useNavigate();

  const { data: developerList, isLoading } = useGetRecommendDevlopers({
    refetchOnMount: true,
  });

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
      <div className={cx("container")}>
        {developerList && developerList?.length > 0 ? (
          developerList?.map((it) => (
            <DeveloperItem
              id={it.id}
              avatar_url={it.avatar_url}
              name={it.name}
              bio={it.user_detail_individual?.bio as string}
            />
          ))
        ) : (
          <Alert severity={"info"}>등록된 개발자가 없습니다</Alert>
        )}
      </div>
    </Layout>
  );
}

export default DeveloperListPage;
