# 使用 Node.js 镜像作为基础镜像
FROM node:22-alpine

# 设置工作目录
WORKDIR /app

# 确保 yarn 已安装，如果未安装则执行安装
RUN command -v yarn || npm install -g yarn

# 将 package.json 和 yarn.lock 复制到工作目录
COPY package*.json ./

# 使用 yarn 安装依赖
RUN yarn install

# 将整个应用复制到容器中
COPY . .

# 构建项目
RUN yarn build

# 暴露端口
EXPOSE 3000

# 启动项目
CMD ["yarn", "start"]
