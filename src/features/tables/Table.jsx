import { useEffect } from "react";
import { useViews } from "../../contexts/ViewsContext";
import Switch from "../../ui/Switch";
import ReadingTableTemplate from "./ReadingTableTemplate";
import HistoryTableTemplate from "./HistoryTableTemplate";
import SearchTableTemplate from "../search/SearchTableTemplate";

export default function Table({ section = "classic" }) {
  const { currentView, changeView } = useViews();

  useEffect(
    function () {
      currentView !== section && changeView(section);
    },
    [changeView, currentView, section]
  );

  if (section === "history") return <HistoryTableTemplate />;

  if (section === "search") return <SearchTableTemplate />;

  if (section === "classic" || section === "modern")
    return (
      <>
        <Switch section={section} />
        <ReadingTableTemplate section={section} />
      </>
    );
}
