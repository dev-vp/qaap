# RTA Implmentation

## Library Options

* socket.io
* pg-listen
* socket.io + node-pg (http://darrenoneill.co.uk/post/real-time-web-apps-postgresql-and-node/)
* socket.io + pg (https://whatsyourssn.com/posts/real-time-app-socket-postgresql/)
* psql / sequlize hooks (https://stackoverflow.com/questions/29716346/how-to-create-a-trigger-in-sequelize-nodejs/33136511)
* pg-pubsub

## Challenges

* **Polling:** (Client actively and continuously sampling the database for updates/changes.) This is resource intensive and not scalable.
* **PSQL Notify / Listen:** There is a queue that holds notifications that have been sent but not yet processed by all listening sessions. If this queue becomes full, transactions calling NOTIFY will fail at commit. The queue is quite large (8GB in a standard installation) and should be sufficiently sized for almost every use case. However, no cleanup can take place if a session executes LISTEN and then enters a transaction for a very long time. Once the queue is half full you will see warnings in the log file pointing you to the session that is preventing cleanup. In this case you should make sure that this session ends its current transaction so that cleanup can proceed. [Source](https://www.postgresql.org/docs/9.4/sql-notify.html) **Therefore, this approach is inherently non-scaleable.**

## Alternative (The Solution)

**Socket.io:** Leveraging cross-browser compatibility to provide real-time input/output without passing through the database.

### Communication Flow

1.  Participant Vote is Submitted
2.  Redirect Participant to a 'Thank You for Voting' page (\* Ignored for ease of testing voting functionality)
3.  Send Vote over `socket` connection
4.  Presenter receives votes over `socket` connection
5.  Vote is stored in redux / component state
6.  Trigger a `PUT` request to update the database; and then also trigger a rerender (maybe `componentDidUpdate`) of the component.
