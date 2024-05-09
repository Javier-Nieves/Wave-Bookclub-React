import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { useBooks } from "./BooksContext";
import { CLASSIC_LIMIT } from "../utils/config";
import { useAuth } from "./AuthContext";

const ViewsContext = createContext();

const initialState = {
  currentView: "modern",
  defaultStyle: "modern",
  message: null,
  //   message: { style: "good", text: "You are logged in" },
};

function reducer(state, action) {
  switch (action.type) {
    case "setDefaultStyle":
      // payload - upcoming book's year
      return {
        ...state,
        defaultStyle: action.payload < CLASSIC_LIMIT ? "modern" : "classic",
      };
    case "changeView":
      return {
        ...state,
        currentView: action.payload,
      };
    case "message/show":
      // payload is {style: ('good', 'bad'), text: text}
      return {
        ...state,
        message: action.payload,
      };
    case "message/delete":
      return {
        ...state,
        message: null,
      };
    default:
      throw new Error("Unknown action");
  }
}

function ViewsProvider({ children }) {
  const [{ defaultStyle, currentView, message }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const { upcomingBook } = useBooks();
  const { isLoggedIn } = useAuth();

  function showMessage(text, style = "good") {
    console.log("received message: ", text);
    if (!message) dispatch({ type: "message/show", payload: { text, style } });
    setTimeout(() => {
      dispatch({ type: "message/delete" });
    }, 2000);
  }

  // setting default app style based on the upcomming book type (modern or classic)
  useEffect(
    function () {
      if (!upcomingBook) return;
      dispatch({ type: "setDefaultStyle", payload: upcomingBook.year });
    },
    [upcomingBook]
  );

  // logged in message
  //   useEffect(
  //     function () {
  //       isLoggedIn && showMessage("You are logged in");
  //     },
  //     [isLoggedIn]
  //   );

  function changeView(view) {
    if (currentView === view) return;
    dispatch({ type: "changeView", payload: view });
    //   bookToShow && clearBookToShow();
  }

  return (
    <ViewsContext.Provider
      value={{ defaultStyle, currentView, message, changeView, showMessage }}
    >
      {children}
    </ViewsContext.Provider>
  );
}

function useViews() {
  const context = useContext(ViewsContext);
  if (context === undefined)
    throw new Error("Views Context used outside of the provider");
  return context;
}

export { ViewsProvider, useViews };
