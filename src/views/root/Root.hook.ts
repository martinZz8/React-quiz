import {useEffect, useState} from "react";
import {useTypedSelector} from "../../hooks/useTypedSelector";

// utils
import isUserAuthenticated from "../../functions/is-user-authenticated";

const useRoot = () => {
  const {accessToken, user: {roles: userRoles}} = useTypedSelector(state => state.login.loginData);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(isUserAuthenticated(accessToken, userRoles));

  useEffect(() => {
    setIsUserLoggedIn(isUserAuthenticated(accessToken, userRoles));
  },[accessToken, userRoles]);

  return {isUserLoggedIn};
};

export default useRoot;