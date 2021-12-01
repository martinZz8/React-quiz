const isUserAuthenticated = (accessToken: string, userRoles: string[]): boolean => {
  if(accessToken !== "") {
    if (userRoles.includes("ROLE_USER")) { //|| userRoles.includes("ROLE_TEACHER")
      return true;
    }
  }

  return false;
};

export default isUserAuthenticated;