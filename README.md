# Sample_docker-compose_project
#### A sample project using docker-compose with mysql, node, and react.js containers.
#### This project is meant to give you an understanding of how to formulate your docker development environment for developing web apps using node.js and mysql.

- Express Server

- React.JS Client

- MySQL Database

# SETUP

First make sure to open a terminal window to `./backend/node` and `./frontend` and from there run `yarn` or `npm install` in both directories to install the necessary packages. Then, from the root directory of the project, all you need to do is run `docker-compose up` to have the compose file automatically spin the containers up for you.

If you want to run a terminal in detached mode (so you can close the window and it wont stop the containers) then type `docker-compose up -d` for a headless start instead.

As always make sure to type `docker-compose down` to shut the containers down and close everything up.

Hope this helps!

Liam
