import { uploadTestBooks } from "../services/apiBooks";
import Button from "./Button";

function TestBlock() {
  return (
    <Button type="brightBtn" onClick={uploadTestBooks}>
      Upload test books
    </Button>
  );
}

export default TestBlock;
