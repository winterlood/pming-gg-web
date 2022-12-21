import IconButton from "@components/IconButton";
import withOnlyProfiledUser from "@hoc/withOnlyProfiledUser";
import Layout from "@layout/Layout";

function HomePage() {
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
      <div></div>
    </Layout>
  );
}

export default withOnlyProfiledUser(HomePage);
