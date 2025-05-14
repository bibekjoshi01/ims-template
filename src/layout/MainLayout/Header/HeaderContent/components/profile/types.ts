interface LogoutResponse {
  message: string;
}

interface LogoutError {
  status: number;
  data: {
    refresh?: string[];
  };
}

type LogoutFunction = (args: { refresh: string }) => Promise<LogoutResponse>;
