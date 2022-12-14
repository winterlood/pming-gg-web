import AlarmItem from "@components/AlarmItem";
import useGetAlarmQuery from "@hooks/useGetAlarmQuery";
import Layout from "@layout/Layout";
import { Alert } from "@mui/material";
import classNames from "classnames/bind";
import style from "./AlarmPage.module.scss";

const cx = classNames.bind(style);

function AlarmPage() {
  const { data, isLoading } = useGetAlarmQuery({ refetchOnMount: true });
  const filteredData = data && data.filter((it) => it.job_post && it.send_user);
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
          {filteredData && filteredData.length > 0 ? (
            filteredData.map((it) => <AlarmItem key={it.id} {...it} />)
          ) : (
            <Alert severity={"info"}>아직 알림이 없습니다</Alert>
          )}
        </div>
      </div>
    </Layout>
  );
}
export default AlarmPage;
