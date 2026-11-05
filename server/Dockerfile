FROM node:22-alpine

ENV NODE_ENV=production
WORKDIR /app

COPY server/package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY server/ ./

USER node

EXPOSE 5000

CMD ["node", "server.js"]
