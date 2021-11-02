import {useEffect, useState} from "react";
import {useTypedSelector} from "../../hooks/useTypedSelector";

// utils
import isUserAuthenticated from "../../functions/is-user-authenticated";

const useRoot = () => {
  const {accessToken, user: {role: userRole}} = useTypedSelector(state => state.login.loginData);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(isUserAuthenticated(accessToken, userRole));

  useEffect(() => {
    setIsUserLoggedIn(isUserAuthenticated(accessToken, userRole));
  },[accessToken, userRole]);

  return {isUserLoggedIn};
};

export default useRoot;