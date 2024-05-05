import Main from "../Components/Main";
import User from "../Components/User";
import Sidebar from "../Components/Sidebar";
import RightColumn from "../Components/RightColumn";

function AppLayout() {
  return (
    <Main>
      <User />
      <Sidebar />
      <RightColumn />
    </Main>
  );
}

export default AppLayout;
