FROM python:3

ENV PYTHONUNBUFFERED 1
RUN mkdir /db
RUN mkdir /code
WORKDIR /code
ADD requirements.txt /code/
RUN /usr/local/bin/python -m pip install --upgrade pip
RUN pip install -r requirements.txt
ADD . /code/
