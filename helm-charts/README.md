# Helm Charts for Client and Server Applications

This repository contains Helm charts for deploying both the client and server applications. Each chart includes configurations for deployment, service, secrets, horizontal pod autoscaler (HPA), and pod disruption budget (PDB).

## Directory Structure

```
helm-charts/
├── client/
│   ├── Chart.yaml
│   ├── values.yaml
│   └── templates/
│       ├── deployment.yaml
│       ├── service.yaml
│       ├── secret.yaml
│       ├── hpa.yaml
│       └── pdb.yaml
└── server/
    ├── Chart.yaml
    ├── values.yaml
    └── templates/
        ├── deployment.yaml
        ├── service.yaml
        ├── secret.yaml
        ├── hpa.yaml
        └── pdb.yaml
```

## Installation

To install the Helm charts for the client and server applications, follow these steps:

1. Ensure you have [Helm](https://helm.sh/docs/intro/install/) installed on your local machine.

2. Navigate to the `helm-charts` directory:

   ```bash
   cd helm-charts
   ```

3. Install the client application:

   ```bash
   helm install client ./client
   ```

4. Install the server application:

   ```bash
   helm install server ./server
   ```

## Configuration

You can customize the deployment by modifying the `values.yaml` files located in the `client` and `server` directories. These files allow you to override default configuration values.

## Components

- **Deployment**: Manages the deployment of the application pods.
- **Service**: Exposes the application to the network.
- **Secret**: Stores sensitive information securely.
- **Horizontal Pod Autoscaler (HPA)**: Automatically scales the number of pods based on resource usage.
- **Pod Disruption Budget (PDB)**: Ensures a minimum number of pods remain available during voluntary disruptions.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.