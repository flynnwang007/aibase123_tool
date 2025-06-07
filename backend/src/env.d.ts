declare namespace NodeJS {
  interface ProcessEnv {
    JWT_SECRET: string;
    JWT_EXPIRES_IN: string;
    // 添加其他环境变量声明...
  }
} 