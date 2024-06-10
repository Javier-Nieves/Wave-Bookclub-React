import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { CLASSIC_LIMIT } from "../utils/config";
import { useLibrary } from "../features/book/useLibrary";
import { arraysEqual, objectsAreEqual } from "../utils/helpers";

const ViewsContext = createContext();

const initialState = {
  currentSearchResults: [],
  currentView: "modern",
  defaultStyle: "modern",
  message: null,
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
        currentSearchResults: [],
      };
    case "searchResults/save":
      return {
        ...state,
        currentSearchResults: action.payload,
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
  const [
    { defaultStyle, currentView, message, currentSearchResults, currentBook },
    dispatch,
  ] = useReducer(reducer, initialState);
  const { upcomingBook } = useLibrary();

  function showMessage(text, style = "good") {
    if (!message) dispatch({ type: "message/show", payload: { text, style } });
    setTimeout(() => {
      dispatch({ type: "message/delete" });
    }, 2000);
  }

  function showSearchResults(data) {
    if (!data) return;
    if (arraysEqual(data, currentSearchResults)) return;
    dispatch({ type: "searchResults/save", payload: data });
  }

  // setting default app style based on the upcomming book type (modern or classic)
  useEffect(
    function () {
      if (!upcomingBook) return;
      dispatch({ type: "setDefaultStyle", payload: upcomingBook.year });
    },
    [upcomingBook]
  );

  function changeView(view) {
    // console.log("changing view! to", view);
    if (currentView === view) return;
    dispatch({ type: "changeView", payload: view });
  }

  return (
    <ViewsContext.Provider
      value={{
        defaultStyle,
        currentView,
        message,
        currentSearchResults,
        changeView,
        showMessage,
        showSearchResults,
      }}
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
