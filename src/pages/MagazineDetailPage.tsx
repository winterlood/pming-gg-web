import style from "./MagazineDetailPage.module.scss";
import classNames from "classnames/bind";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "@layout/Layout";
import IconButton from "@components/IconButton";
import useGetNotionPageQuery from "@hooks/useGetNotionPageQuery";
import { NotionRenderer } from "react-notion";
import "react-notion/src/styles.css";
import useGetNotionPageInfoQuery from "@hooks/useGetNotionPageInfoQuery";
const cx = classNames.bind(style);

export default function MagazineDetailPage() {
  const nav = useNavigate();
  const { id } = useParams();
  const { data: blockData, isLoading: blockDataIsLoading } =
    useGetNotionPageQuery(id as string, {
      refetchOnMount: true,
    });
  const { data: pageData, isLoading: pageDataIsLoading } =
    useGetNotionPageInfoQuery(id as string);
  return (
    <Layout
      header={{
        pageName: "매거진",
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
      isLoading={blockDataIsLoading || pageDataIsLoading}
    >
      <div className={cx("container")}>
        <div className={cx("header")}>
          {pageData && <div className={cx("title")}>{pageData.title}</div>}
        </div>
        <div className={cx("body")}>
          {blockData && <NotionRenderer blockMap={blockData || {}} />}
        </div>
      </div>
    </Layout>
  );
}
