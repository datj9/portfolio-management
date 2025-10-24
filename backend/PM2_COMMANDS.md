# PM2 Quick Reference

Quick reference for PM2 commands in this project.

## Development vs Production

**Development** (with auto-reload):
```bash
yarn develop
```

**Production** (with PM2):
```bash
yarn build
yarn pm2:start
```

## Common Commands

### Start
```bash
yarn pm2:start
```

### Stop
```bash
yarn pm2:stop
```

### Restart
```bash
yarn pm2:restart
```

### View Logs
```bash
yarn pm2:logs
```

### Monitor
```bash
yarn pm2:monit
```

### Delete Process
```bash
yarn pm2:delete
```

## Direct PM2 Commands

If PM2 is installed globally:

```bash
pm2 list                      # List all processes
pm2 start ecosystem.config.js # Start
pm2 stop portfolio-backend    # Stop
pm2 restart portfolio-backend # Restart
pm2 delete portfolio-backend  # Remove from PM2
pm2 logs portfolio-backend    # View logs
pm2 monit                     # Monitor dashboard
pm2 show portfolio-backend    # Detailed info
```

## Troubleshooting

**Process won't start:**
```bash
yarn pm2:delete
yarn pm2:start
yarn pm2:logs
```

**Check if running:**
```bash
pm2 list
```

**View errors:**
```bash
yarn pm2:logs
# or
cat logs/pm2-error.log
```

## See Also

- [PM2_GUIDE.md](../PM2_GUIDE.md) - Complete PM2 documentation
- [Official PM2 Docs](https://pm2.keymetrics.io/)

