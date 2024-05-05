import Main from "./Main";
import User from "../features/user/User";
import Sidebar from "../ui/Sidebar";
import RightColumn from "../ui/RightColumn";

function AppLayout() {
  return (
    <Main>
      {/* <User /> */}
      <Sidebar />
      <RightColumn />
    </Main>
  );
}

export default AppLayout;
