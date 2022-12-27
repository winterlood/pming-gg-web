import AlarmItem from "@components/AlarmItem";
import useGetAlarmQuery from "@hooks/useGetAlarmQuery";
import Layout from "@layout/Layout";
import classNames from "classnames/bind";
import style from "./AlarmPage.module.scss";

const cx = classNames.bind(style);

function AlarmPage() {
  const { data, isLoading } = useGetAlarmQuery({ refetchOnMount: true });
  return (
    <Layout
      header={{
        pageName: "알람",
      }}
      footer
      isLoading={isLoading}
    >
      <div className={cx("container")}>
        <div className={cx("body")}>
          {data && data.map((it) => <AlarmItem key={it.id} {...it} />)}
        </div>
      </div>
    </Layout>
  );
}
export default AlarmPage;
