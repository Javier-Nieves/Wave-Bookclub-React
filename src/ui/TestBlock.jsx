import { useTestBooks } from "../features/book/useTestBooks";
import Button from "./Button";

function TestBlock() {
  const { isLoading, uploadTestBooks } = useTestBooks();

  return (
    <div
      style={{
        padding: "10px",
        margin: "10px",
        border: "1px solid yellow",
        borderRadius: "10px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "var(--color-pale)",
      }}
    >
      <p style={{ color: "white", fontSize: "24px", margin: "5px" }}>
        Test books:
      </p>
      <Button
        disabled={isLoading}
        type="blackBtn"
        onClick={() => uploadTestBooks()}
      >
        {isLoading ? "Loading..." : "Upload"}
      </Button>
    </div>
  );
}

export default TestBlock;
