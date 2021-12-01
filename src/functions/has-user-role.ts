const HasUserRole = (role: "student" | "teacher", userRoles: string[]): boolean => {
  if (role === "student") {
    return userRoles.includes("ROLE_USER");
  }
  else {
    return userRoles.includes("ROLE_TEACHER");
  }
};

export default HasUserRole;