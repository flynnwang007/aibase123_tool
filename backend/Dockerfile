FROM --platform=linux/amd64 node:16-alpine
WORKDIR /app

# 安装依赖
COPY package*.json ./
RUN npm install

# 复制代码
COPY . .

# 编译 TypeScript
RUN npm run build

# 暴露端口
EXPOSE 4000

# 启动命令
CMD ["node", "dist/index.js"] 