
# JWT

The script produces a signed JWT token with the provided payload and options.

## Inputs

Environment variables correspond to the parameters of the [node library from Auth0][1].

- `PAYLOAD`: could be an object literal, buffer or string representing valid JSON.
- `SECRET`: is a string, buffer, or object containing either the secret for HMAC
algorithms or the PEM encoded private key for RSA and ECDSA.
- `OPTIONS`: JWT token options as per the node library.

## Outputs

The signed JWT is logged to the console and can be collected as a [`result` of the workflow
step][2]

## Test locally

```
docker build -t jwt .
docker run \
    --env PAYLOAD='{"data":{"userId":"user1"}}' \
    --env SECRET='super-secret-passphrase' \
    --env OPTIONS='{"expiresIn":"2h","issuer":"argo-workflows"}' \
    jwt

```

[1]: https://github.com/auth0/node-jsonwebtoken#jwtsignpayload-secretorprivatekey-options-callback
[2]: https://argoproj.github.io/argo-workflows/fields/#outputs

