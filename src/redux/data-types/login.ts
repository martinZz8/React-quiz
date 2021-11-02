interface Login {
  accessToken: string;
  user: {
    role: string;
    firstName: string;
    lastName: string;
    email: string;
  };
}

export type AdminLogin = Login;