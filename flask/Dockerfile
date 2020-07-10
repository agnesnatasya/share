FROM ubuntu:16.04
RUN apt-get update -y && \
    apt-get install -y python-pip python-dev
COPY ./requirements.txt /api/requirements.txt
WORKDIR /api
RUN pip install -r requirements.txt
COPY . /api
RUN export FLASK_APP=app
RUN export FLASK_ENV=development
CMD ["flask", "run"]