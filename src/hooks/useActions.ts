import {useDispatch} from "react-redux";
import {bindActionCreators} from "redux";

// Add other imports and bind them to action creators - when it improves
import {
  loginUserActionCreators
} from "../redux";

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(Object.assign({},
    loginUserActionCreators,
  ), dispatch);
}