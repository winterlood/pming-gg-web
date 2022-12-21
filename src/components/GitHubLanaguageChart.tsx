import { ResponsivePie } from "@nivo/pie";
import { ResponsiveBar } from "@nivo/bar";
import { api_types } from "@types";

interface LanaguageChageProps {
  languageData: api_types.GitHubHistory["totalLangList"];
  type: "pie" | "bar";
}

function GitHubLanaguageChart({ languageData, type }: LanaguageChageProps) {
  const langTotalSize = languageData.reduce((acc, lang) => {
    return acc + lang.size;
  }, 0);

  const formattedLangList = languageData.map((lang) => ({
    id: lang.name,
    label: lang.name,
    value: lang.size / langTotalSize,
  }));

  if (type === "bar") {
    return (
      <div style={{ width: "100%", height: "400px", margin: "0 auto" }}>
        <ResponsiveBar
          valueFormat=" >-.2%"
          data={formattedLangList.slice(0, 5)}
          keys={["value"]}
          indexBy="id"
          layout="horizontal"
          margin={{ top: 50, right: 60, bottom: 50, left: 60 }}
          padding={0.3}
          valueScale={{ type: "linear" }}
          indexScale={{ type: "band", round: true }}
          colors={{ scheme: "nivo" }}
          defs={[
            {
              id: "dots",
              type: "patternDots",
              background: "inherit",
              color: "#38bcb2",
              size: 4,
              padding: 1,
              stagger: true,
            },
            {
              id: "lines",
              type: "patternLines",
              background: "inherit",
              color: "#eed312",
              rotation: -45,
              lineWidth: 6,
              spacing: 10,
            },
          ]}
          borderColor={{
            from: "color",
            modifiers: [["darker", 1.6]],
          }}
          labelTextColor={{
            from: "color",
            modifiers: [["darker", 1.6]],
          }}
          role="application"
        />
      </div>
    );
  } else {
    return (
      <div style={{ width: "100%", height: "400px", margin: "0 auto" }}>
        <ResponsivePie
          valueFormat=" >-.2%"
          data={formattedLangList.slice(0, 6)}
          margin={{ top: 10, right: 100, bottom: 10, left: 100 }}
          innerRadius={0.5}
          padAngle={0.7}
          cornerRadius={3}
          activeOuterRadiusOffset={8}
          borderWidth={1}
          borderColor={{
            from: "color",
            modifiers: [["darker", 0.2]],
          }}
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsTextColor="#333333"
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: "color" }}
          arcLabelsSkipAngle={10}
          arcLabelsTextColor={{
            from: "color",
            modifiers: [["darker", 2]],
          }}
          defs={[
            {
              id: "dots",
              type: "patternDots",
              background: "inherit",
              color: "rgba(255, 255, 255, 0.3)",
              size: 4,
              padding: 1,
              stagger: true,
            },
            {
              id: "lines",
              type: "patternLines",
              background: "inherit",
              color: "rgba(255, 255, 255, 0.3)",
              rotation: -45,
              lineWidth: 6,
              spacing: 10,
            },
          ]}
        />
      </div>
    );
  }
}
export default GitHubLanaguageChart;
