interface Login {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    roles: string[];
  };
}

export type AdminLogin = Login;