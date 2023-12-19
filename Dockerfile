FROM ubuntu:latest
LABEL authors="trann"

ENTRYPOINT ["top", "-b"]