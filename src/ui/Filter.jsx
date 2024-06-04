import { useSearchParams } from "react-router-dom";
import Button from "./Button";
import styles from "./Filter.module.css";

function Filter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get("period") || "all";

  function handleClick(value) {
    searchParams.set("period", value);
    setSearchParams(searchParams);
  }
  const options = [
    { label: "All", value: "all" },
    { label: "Modern", value: "modern" },
    { label: "Classic", value: "classic" },
  ];
  return (
    <div className={styles.filterContainer}>
      {options.map((option) => (
        <Button
          type={option.value === currentFilter ? `activeBtn` : ""}
          disabled={option.value === currentFilter}
          onClick={() => handleClick(option.value)}
          key={option.value}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
}

export default Filter;
