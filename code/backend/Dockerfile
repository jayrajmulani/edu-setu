FROM ubuntu:latest

RUN apt-get update -y
RUN apt-get install -y python3-pip python3
RUN apt-get install libaio1

RUN mkdir -p /opt/oracle
RUN cd /opt/oracle

RUN mkdir -p /usr/src/code/backend
WORKDIR /usr/src/code/backend

COPY . /usr/src/code/backend/
RUN pip3 install -r requirements.txt

ENV ORACLE_HOME=/usr/src/code/backend/instantclient_21_8
ENV DYLD_LIBRARY_PATH=$ORACLE_HOME
ENV LD_LIBRARY_PATH=$ORACLE_HOME
ENV PATH=$ORACLE_HOME:$PATH
ENV TNS_ADMIN=$ORACLE_HOME/network/admin

ENTRYPOINT [ "flask" ]
CMD [ "run" , "--host=0.0.0.0" ,"--port=5000"]