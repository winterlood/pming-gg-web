import IconButton from "@components/IconButton";
import MagazineItem from "@components/MagazineItem";
import useGetMagazineListQuery from "@hooks/useGetMagazineListQuery";
import Layout from "@layout/Layout";
import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";
import style from "./MagazineListPage.module.scss";
const cx = classNames.bind(style);
export default function MagazineListPage() {
  const { data: magazineList, isLoading } = useGetMagazineListQuery({
    refetchOnMount: true,
  });

  const nav = useNavigate();
  return (
    <Layout
      header={{
        pageName: "프밍 매거진",
        leftButton: (
          <IconButton type={"light"} icon={"goback"} onClick={() => nav(-1)} />
        ),
      }}
      isLoading={isLoading}
    >
      <div className={cx("container")}>
        <div className={cx("body")}>
          {magazineList &&
            magazineList.map((magazine) => (
              <MagazineItem key={magazine.id} {...magazine} />
            ))}
        </div>
      </div>
    </Layout>
  );
}
