import IconButton from "@components/IconButton";
import MagazineCraousel from "@components/MagazineCarousel";
import withOnlyProfiledUser from "@hoc/withOnlyProfiledUser";
import useAuthUser from "@hooks/useAuthUser";
import Layout from "@layout/Layout";
import { RootState } from "@store/createStore";
import { api_types, common_types } from "@types";
import { useSelector } from "react-redux";

function IndividualHome() {
  return <div></div>;
}

function BusinessHome() {
  return <div></div>;
}

function HomePage() {
  const { user } = useAuthUser();

  return (
    <Layout
      header={{
        pageName: "홈",
        rightButton: (
          <IconButton type={"light"} icon={"alarm"} onClick={() => {}} />
        ),
      }}
      footer
    >
      <div>
        <MagazineCraousel />
      </div>
    </Layout>
  );
}

export default withOnlyProfiledUser(HomePage);
