# Chat Application Notes

To run the project, we need to follow the next commands:

- minikube start --driver=hyperkit,
- mnikube addons enbale ingress,
- kubectl apply -f k8, and
- Put the IP obtained using the command minikube ip in your web browser.

The application consist of four services:

- client-cluster-ip-service,
- mongodb-service,
- server-cluster-ip-service, and
- socket-cluster-ip-service (This service includes socket.io and graphQL)
