import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { useBooks } from "./BooksContext";
import { CLASSIC_LIMIT } from "../utils/config";

const ViewsContext = createContext();

const initialState = {
  currentView: "modern",
  defaultStyle: "modern",
  message: "",
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
    default:
      throw new Error("Unknown action");
  }
}

function ViewsProvider({ children }) {
  const [{ defaultStyle, currentView, message }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const { upcomingBook, clearBookToShow, bookToShow } = useBooks();

  useEffect(
    function () {
      if (!upcomingBook) return;
      dispatch({ type: "setDefaultStyle", payload: upcomingBook.year });
    },
    [upcomingBook]
  );

  function changeView(view) {
    if (currentView === view) return;
    dispatch({ type: "changeView", payload: view });
    //   bookToShow && clearBookToShow();
  }

  return (
    <ViewsContext.Provider value={{ defaultStyle, currentView, changeView }}>
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
