# RTA Implmentation

## Library Options

* socket.io
* pg-listen
* socket.io + node-pg (http://darrenoneill.co.uk/post/real-time-web-apps-postgresql-and-node/)
* socket.io + pg (https://whatsyourssn.com/posts/real-time-app-socket-postgresql/)
* psql / sequlize hooks (https://stackoverflow.com/questions/29716346/how-to-create-a-trigger-in-sequelize-nodejs/33136511)
* pg-pubsub

## Challenges

* Polling
* Notify / Listen

## Alternative

Instead of executing 'polling',
Instead of using 'notify/listen'

## Communication Flow

1.  Participant Vote is Submitted
2.  Redirect Participant to a 'Thank You for Voting' page
3.  Send Vote over `socket` connection
4.  Presenter receives votes over `socket` connection
5.  Vote is stored in redux / component state
6.  Trigger a `PUT` request to update the database; and then also trigger a rerender (maybe `componentDidUpdate`) of the component.
