const isUserType = (role: "student" | "teacher", userRoles: string[]): boolean => {
  if (role === "student") {
    return userRoles.includes("ROLE_USER") && !userRoles.includes("ROLE_TEACHER");
  }
  else {
    return userRoles.includes("ROLE_USER") && userRoles.includes("ROLE_TEACHER");
  }
};

export default isUserType;