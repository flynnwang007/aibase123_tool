# Install dependencies only when needed
FROM --platform=linux/amd64 node:18-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm install

# Rebuild the source code only when needed
FROM --platform=linux/amd64 node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# 确保 public 目录存在并添加测试文件
RUN mkdir -p public && echo "This is a test file." > public/test.txt

# 确保所有配置文件都存在
RUN ls -la && \
    echo "Checking config files..." && \
    ls -la .babelrc && \
    ls -la next.config.js && \
    ls -la tsconfig.json && \
    ls -la postcss.config.js && \
    ls -la tailwind.config.js

# 调试信息
RUN echo "Contents of public directory before build:" && ls -la public

RUN npm run build

# Production image, copy all the files and run next
FROM --platform=linux/amd64 node:18-alpine AS runner
WORKDIR /app

RUN apk add --no-cache tini

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# 复制所有必要的文件
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/package.json ./
COPY --from=builder /app/.babelrc ./

# 检查 public 目录是否存在，如果存在则复制
RUN if [ -d /app/public ]; then cp -r /app/public ./public; fi

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules

USER nextjs

EXPOSE 3000
ENV PORT 3000

ENTRYPOINT ["/sbin/tini", "--"]
CMD ["npm", "start"] 