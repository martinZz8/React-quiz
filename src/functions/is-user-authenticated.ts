const isUserAuthenticated = (accessToken: string, userRole: string) => {
  if(accessToken !== "") {
    if(userRole === "admin" || userRole === "teacher" || userRole === "student") {
      return true;
    }
  }

  return false;
};

export default isUserAuthenticated;