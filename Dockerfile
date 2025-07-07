FROM ghcr.io/gohugoio/hugo:latest AS build

ARG ENVIRONMENT=main

ADD --chown=hugo:hugo . . 

RUN hugo mod get && \
    hugo --minify --environment $ENVIRONMENT

FROM lipanski/docker-static-website:latest

LABEL org.opencontainers.image.source="https://github.com/Coto-Studio/hugo-innocent-dreams.git"

ADD httpd.conf .

COPY --from=build /project/public .
