FROM node:14

#RUN mkdir -p /app
WORKDIR /app

ENV NODE_VERSION=16.13.0

# Check if Node is already installed
RUN which node || ( \
  apt install -y curl && \
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash && \
  . "$NVM_DIR/nvm.sh" && nvm install ${NODE_VERSION} && \
  . "$NVM_DIR/nvm.sh" && nvm use v${NODE_VERSION} && \
  . "$NVM_DIR/nvm.sh" && nvm alias default v${NODE_VERSION} && \
  export PATH="/root/.nvm/versions/node/v${NODE_VERSION}/bin/:${PATH}" \
)

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 8000

CMD ["npm", "start"]
