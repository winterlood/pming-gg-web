import { ResponsiveRadar } from "@nivo/radar";

interface Props {
  totalRepoCount: number;
  totalCommitCount: number;
  totalIssueCount: number;
  totalPRCount: number;
  totalReviewCount: number;
}

function GithubGeneralStatChart(props: Props) {
  const {
    totalRepoCount,
    totalCommitCount,
    totalIssueCount,
    totalPRCount,
    totalReviewCount,
  } = props;
  const sum = Object.values(props).reduce((acc, value) => {
    return acc + value;
  }, 0);

  return (
    <div style={{ width: "100%", height: "400px", margin: "0 auto" }}>
      <ResponsiveRadar
        data={[
          {
            name: "총 커밋 수",
            ratio: totalCommitCount / sum,
            count: totalCommitCount,
          },
          {
            name: "총 이슈 수",
            ratio: totalIssueCount / sum,
            count: totalIssueCount,
          },
          {
            name: "총 PR 수",
            ratio: totalPRCount / sum,
            count: totalPRCount,
          },
          {
            name: "총 리뷰 수",
            ratio: totalReviewCount / sum,
            count: totalReviewCount,
          },
        ]}
        keys={["count"]}
        indexBy="name"
        // valueFormat=">-.2%"
        margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
        borderColor={{ from: "color" }}
        gridLabelOffset={30}
        dotSize={1}
        dotColor={{ theme: "background" }}
        dotBorderWidth={5}
        colors={{ scheme: "nivo" }}
        blendMode="multiply"
        motionConfig="wobbly"
      />
    </div>
  );
}
export default GithubGeneralStatChart;
