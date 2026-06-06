# Deployment Workflow

Never deploy automatically.

## Steps

1. Audit current changes.
2. Confirm target environment.
3. Confirm build command.
4. Confirm server/process affected.
5. Confirm rollback plan.
6. Request approval.
7. Deploy only if approved.
8. Verify health endpoints.
9. Check logs.

## Never Without Approval

- Restart PM2.
- Restart Nginx.
- Modify `.github/workflows/`.
- Change Cloudflare/DNS.
- Change SSL/certs.
- Push to production.
- Sync S3 with `--delete`.
