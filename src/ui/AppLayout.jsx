import Main from "./Main";
import User from "../features/user/User";
import Sidebar from "./Sidebar";
import RightColumn from "./RightColumn";
import Message from "./Message";

function AppLayout() {
  return (
    <Main>
      <User />
      <Message />
      <Sidebar />
      <RightColumn />
    </Main>
  );
}

export default AppLayout;
