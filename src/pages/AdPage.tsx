import IconButton from "@components/IconButton";
import Layout from "@layout/Layout";
import classNames from "classnames/bind";
import style from "./AdPage.module.scss";
import { useNavigate } from "react-router-dom";
import { NotionRenderer } from "react-notion";
import useGetNotionPageQuery from "@hooks/useGetNotionPageQuery";

const AD_PAGE_ID = "d5bc636df4974de8b6709b042c2cda23";

export default function AdPage() {
  const nav = useNavigate();

  const { data: blockData, isLoading: blockDataIsLoading } =
    useGetNotionPageQuery(AD_PAGE_ID as string, {
      refetchOnMount: true,
    });

  return (
    <Layout
      header={{
        pageName: "광고",
        leftButton: (
          <IconButton
            type={"light"}
            icon={"goback"}
            onClick={() => {
              nav("/login");
            }}
          />
        ),
      }}
      isLoading={blockDataIsLoading}
    >
      <NotionRenderer blockMap={blockData || {}} />
    </Layout>
  );
}
