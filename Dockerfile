FROM node:16-bullseye

WORKDIR /usr/src/app

RUN apt-get -y update && \
    apt-get install -y libasound2 libgconf-2-4 \
    libatk1.0-0 libatk-bridge2.0-0 libgdk-pixbuf2.0-0 \
    libgtk-3-0 libgbm-dev libnss3-dev libxss-dev chromium

# Install doppler
RUN apt-get update && apt-get upgrade && apt-get install -y apt-transport-https ca-certificates curl gnupg && \
    curl -sLf --retry 3 --tlsv1.2 --proto "=https" 'https://packages.doppler.com/public/cli/gpg.DE2A7741A397C129.key' | apt-key add - && \
    echo "deb https://packages.doppler.com/public/cli/deb/debian any-version main" | tee /etc/apt/sources.list.d/doppler-cli.list && \
    apt-get update && \
    apt-get -y install doppler

COPY . .

# Keep only the required packages
RUN ./scripts/remove_unnecessary_packages.sh

RUN yarn install --frozen-lockfile && \
    yarn build:all && \
    rm -Rf node_modules

# But when deployed, we only need production dependencies
RUN yarn install --production --frozen-lockfile

ARG GIT_VERSION
ENV GIT_VERSION ${GIT_VERSION}

ARG REPO_NAME
ENV REPO_NAME ${REPO_NAME}

# We need to override the path, otherwise puppeteer crashes on Arm macbooks
ENV PUPPETEER_EXECUTABLE_PATH /usr/bin/chromium

EXPOSE 3000

ENTRYPOINT ["doppler", "run", "--"]

CMD [ "yarn", "workspace", "@animaapp/scooby-service", "start"]
