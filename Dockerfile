FROM node:12.0.0

RUN useradd --user-group --create-home --shell /bin/false app

ENV HOME=/home/app
WORKDIR $HOME/lang-frontend

COPY package.json webpack* $HOME/lang-frontend/

RUN chown -R app:app $HOME/*

RUN npm install

COPY client $HOME/lang-frontend/client
RUN npm run build
#USER root
# COPY . $HOME/p-drum
#RUN chown -R app:app $HOME/*
#USER app

CMD ["tail", "-f", "/dev/null"]
#CMD ["yarn", "build"]


