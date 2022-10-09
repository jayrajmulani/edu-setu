FROM ubuntu:latest

RUN apt-get update -y
RUN apt-get install -y python3-pip python3 wget unzip libaio1

RUN mkdir -p /usr/instant_client
WORKDIR /usr/instant_client
RUN wget https://download.oracle.com/otn_software/linux/instantclient/217000/instantclient-basic-linux.x64-21.7.0.0.0dbru.zip
RUN unzip instantclient-basic-linux.x64-21.7.0.0.0dbru.zip

RUN mkdir -p /usr/src/backend
WORKDIR /usr/src/backend

COPY requirements.txt /usr/src/backend/
RUN pip3 install -r requirements.txt

COPY . .

COPY ./db/Wallet_EduSetuDB/ /usr/instant_client/instantclient_21_7/network/admin/

ENV LD_LIBRARY_PATH=/usr/instant_client/instantclient_21_7
ENV PYTHONUNBUFFERED 1
RUN export LD_LIBRARY_PATH=/usr/instant_client/instantclient_21_7
RUN export PATH=${PATH}:${LD_LIBRARY_PATH}

ENTRYPOINT [ "flask" ]
CMD [ "run" , "--host=0.0.0.0" ,"--port=4000"]