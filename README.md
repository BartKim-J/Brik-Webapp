# Spendwallet Website

This is the code for Spendwallet website that are currently running on AWS. Can be found on http://spendwallet.com/ 

## Docker deployment process to server

Docker Instructions

Docker is good to ensure that the website runs independent of operating system and server.
The project has a docker file in the root path. It contains general instructions for Docker on how to run and install the project.

Useful commands:
`docker ps`		list all running container instances
`docker ps -a`		list all containers

Tutorial:
https://nodejs.org/en/docs/guides/nodejs-docker-webapp/

Workflow:
1. Install docker toolbox from https://www.docker.com/products/docker-toolbox
2. Login and create a repository.
3. Pull down website code from git, run project with: `$ npm install && npm run develop`
4. Make changes
5. `cd into project folder`
6. `$ docker build -t <your username>/<webapp-name> .` // Creates the image and specify the repository
7. `$ docker push <your username>/<webapp-name>`       // Push image to repository at docker hub (create if you dont have)
8. SSH into server and make yourself root to see running containers (Started docker as root long time ago haven't fixed it.)
9. `$ docker pull <your username>/<webapp-name>`
10. `$ docker ps`
11. `$ docker stop spend_webapp`
12. `$ docker rm spend_webapp`
13. `$ docker run -d -p 3000:3000 --name spend_webapp <your username>/<webapp-name>`
14. The app is now safely deployed to the server.
15. confirm by `$ docker ps`
