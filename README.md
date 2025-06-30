# I. Basic usage

Run NATS Server:
```
skaffold dev
```

Run port-forwarding:

```
kubectl port-forward service/nats-svc 4222:4222
```

Run listener and publisher:
```
cd ./nats-streaming
npm run listen
npm run publish
```