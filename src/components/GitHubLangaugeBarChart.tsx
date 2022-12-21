import { ResponsivePie } from "@nivo/pie";
import { api_types } from "@types";

interface LanaguageChageProps {
  languageData: api_types.GitHubHistory["totalLangList"];
}

function GitHubLangaugeBarChart({ languageData }: LanaguageChageProps) {
  const langTotalSize = languageData.reduce((acc, lang) => {
    return acc + lang.size;
  }, 0);

  const formattedLangList = languageData.map((lang) => ({
    id: lang.name,
    label: lang.name,
    value: lang.size / langTotalSize,
  }));
  return <div></div>;
}
export default GitHubLangaugeBarChart;
