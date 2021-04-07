[![Moleculer](https://badgen.net/badge/Powered%20by/Moleculer/0e83cd)](https://moleculer.services)

# beera-backend
This is a [Moleculer](https://moleculer.services/)-based microservices project. Generated with the [Moleculer CLI](https://moleculer.services/docs/0.14/moleculer-cli.html).

## Usage
Start the localEnv using its docker-compose file (`docker-compose up --build`) to run a local db.
Start the project with `npm run dev:watch` command.
Can view microservice nodes and metrics at http://localhost:3001/
## Services
- **api**: API Gateway services, with GraphQL server and Socket IO server
- **beer**: Responsible for CRUD GraphQL operations for beers added to the to drink list
- **brewdog**: Responsible for obtaining information about Brewdog beers
- **notification**: Responsible for publishing overdue beer info via broadcast

## Useful links

* Moleculer website: https://moleculer.services/
* Moleculer Documentation: https://moleculer.services/docs/0.14/

## NPM scripts

- `npm run dev`: Start development mode (load all services locally)
- `npm run dev:watch`: Start development mode with hot-reload
- `npm run build`: Transpiles the source code with babel into the dist folder
- `npm run build:docker`: creates a docker image with the build output
- `npm run start`: Start production mode (set `SERVICES` env variable to load certain services)
- `npm run dc:up`: Start the stack with Docker Compose
- `npm run dc:down`: Stop the stack with Docker Compose

## How to deploy to Minukube cluster
Ensure the options.json is filled out correctly first and that you are running Python 3

### Install
- download minikube: choco install minikube (At the time of writing this README, minikube version is 1.18.1, and kubernetes-cli is 1.20.4)
- Once minikube is running (after running start script) 
	- Obtain minikube ip with "minikube ip" and then add this mapping to your hosts file following instructions below:
	- Navigate to C:\Windows\System32\drivers\etc\hosts on Windows
	- Add line "<minikube-ip> beera.nip.io"
	- Add line "<minikube-ip> beera-client.nip.io"

### Dashboard
Open minikube dashboard using "minikube dashboard"

### Scripts
RUN ALL SCRIPTS WITH ADMIN PRIVILEDGES IN POWERSHELL AND ESURE PYTHON VERSION IS 3
- start-local-cluster.py: Run first time when you have not started your minikube cluster
- update-cluster-containers.py: Run to update the docker images for either the api or client in the already running minikube cluster.
### Useful Info
- To date, Minikube can only use kubernetes version 1.18.1
- To connect docker commands to point to the docker daemon inside your minikube vm, run "minikube docker-env | Invoke-Expression"
- In order to deploy our images to minikube, we set up a local registry inside the cluster and push to it
- To bring down the cluster and minikube vm run "minikube stop & minikube delete"
- Make sure you only have one end file before docker builds as currently they are all used

## Cheatsheet
https://kubernetes.io/docs/reference/kubectl/cheatsheet/
- View all pods: kubectl get pods
- restart deployment: kubectl rollout restart deployment/<deployment-name>
- Apply latest changes from k8s yaml: kubectl apply -f <your k8s yaml file>
- Delete a container that is not running: docker container prune <container id>
- View logs for container: 

### NGINX ingress:
- https://kubernetes.io/docs/tasks/access-application-cluster/ingress-minikube/
- https://github.com/kubernetes/ingress-nginx/blob/master/docs/examples/rewrite/README.md

### Service help:
- https://kubernetes.io/docs/concepts/services-networking/connect-applications-service/

INFO - if you want to ssh into the minicube vm, run this "ssh docker@<ip-of-vm>". You can get the ip-of-vm from the ~\\.minikube\\machines\\minikube\\config.json
The default password is "tcuser".

