import style from "./NotionProfilePage.module.scss";
import classNames from "classnames/bind";
import Layout from "@layout/Layout";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import IconButton from "@components/IconButton";
import { NotionRenderer } from "react-notion";
import useGetNotionPageQuery from "@hooks/useGetNotionPageQuery";
import useGetNotionPageInfoQuery from "@hooks/useGetNotionPageInfoQuery";
import useGetProfileQuery from "@hooks/useGetProfileQuery";

const cx = classNames.bind(style);

export default function NotionProfilePage() {
  const nav = useNavigate();

  const [searchParam] = useSearchParams();
  const user_id = searchParam.get("user_id");
  const profile_id = searchParam.get("profile_id");

  const { data: profileQueryData, isLoading: profileQueryLoading } =
    useGetProfileQuery(user_id as string, {
      refetchOnMount: true,
      enabled: !!user_id,
    });
  const { data: blockData, isLoading: blockDataIsLoading } =
    useGetNotionPageQuery(profile_id as string, {
      refetchOnMount: true,
    });
  const { data: pageData, isLoading: pageDataIsLoading } =
    useGetNotionPageInfoQuery(profile_id as string);

  return (
    <Layout
      header={{
        pageName: "상세 프로필",
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
    >
      <div className={cx("container")}>
        <div className={cx("header")}>
          <div className={cx("title")}>{profileQueryData?.name}</div>
        </div>
        <div className={cx("body")}>
          {blockData && <NotionRenderer blockMap={blockData || {}} />}
        </div>
      </div>
    </Layout>
  );
}
