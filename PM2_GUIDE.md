# PM2 Process Manager Guide

This project uses PM2 to manage the Strapi backend process in production and development environments.

## What is PM2?

PM2 is a production-ready process manager for Node.js applications that provides:
- **Auto-restart**: Automatically restarts your app if it crashes
- **Load balancing**: Can run multiple instances for better performance
- **Monitoring**: Real-time monitoring of CPU/memory usage
- **Log management**: Centralized log management
- **Startup scripts**: Keep your app running after system reboots

## Installation

PM2 is already included in the backend dependencies. After running `yarn install` in the backend directory, PM2 will be available.

To install PM2 globally (optional but recommended for easier CLI usage):
```bash
npm install -g pm2
# or
yarn global add pm2
```

## Available Scripts

All PM2 commands are available as npm/yarn scripts in the backend:

### Start the Backend
```bash
cd backend
yarn pm2:start
```

This starts Strapi using PM2 with the configuration from `ecosystem.config.js`.

### Stop the Backend
```bash
yarn pm2:stop
```

Stops the running Strapi process.

### Restart the Backend
```bash
yarn pm2:restart
```

Restarts Strapi (useful after code changes or configuration updates).

### Delete from PM2
```bash
yarn pm2:delete
```

Removes the process from PM2's process list.

### View Logs
```bash
yarn pm2:logs
```

Shows live logs from the backend. Press `Ctrl+C` to exit.

### Monitor
```bash
yarn pm2:monit
```

Opens an interactive monitoring dashboard showing CPU, memory usage, and logs.

## Direct PM2 Commands

If you have PM2 installed globally, you can also use these commands directly:

```bash
# Start
pm2 start ecosystem.config.js

# Stop
pm2 stop portfolio-backend

# Restart
pm2 restart portfolio-backend

# Delete
pm2 delete portfolio-backend

# View process list
pm2 list

# View logs
pm2 logs portfolio-backend

# Monitor
pm2 monit

# Show detailed info
pm2 show portfolio-backend
```

## Configuration

The PM2 configuration is in `backend/ecosystem.config.js`. Key settings:

- **name**: `portfolio-backend` - Process name in PM2
- **script**: Path to Strapi's start script
- **instances**: `1` - Number of instances (1 for Strapi)
- **exec_mode**: `fork` - Execution mode (fork for single instance)
- **autorestart**: `true` - Auto-restart on crash
- **max_memory_restart**: `1G` - Restart if memory exceeds 1GB
- **watch**: `false` - Don't auto-restart on file changes (set to `true` for dev)

### Environment Variables

The ecosystem config supports two environments:

**Production** (default):
```javascript
env: {
  NODE_ENV: 'production',
  PORT: 1337,
}
```

**Development**:
```javascript
env_development: {
  NODE_ENV: 'development',
  PORT: 1337,
}
```

To use development environment:
```bash
pm2 start ecosystem.config.js --env development
```

## Logs

PM2 logs are stored in `backend/logs/`:
- `pm2-error.log` - Error logs
- `pm2-out.log` - Standard output logs
- `pm2-combined.log` - Combined logs

These files are gitignored.

## Startup on System Boot (Production)

To make your backend start automatically when the server reboots:

```bash
# Generate startup script
pm2 startup

# Follow the command it outputs (usually requires sudo)

# Save the current process list
pm2 save
```

Now PM2 will automatically start your backend when the system boots.

## Development vs Production

### Development
For development, you might want to use the regular Strapi develop command with auto-reload:
```bash
yarn develop
```

### Production
For production, use PM2 to ensure the process stays running:
```bash
# Build the admin panel first
yarn build

# Start with PM2
yarn pm2:start
```

## Troubleshooting

### Process Won't Start
```bash
# Check PM2 logs
yarn pm2:logs

# Check process status
pm2 list

# Delete and restart
yarn pm2:delete
yarn pm2:start
```

### Memory Issues
If the process keeps restarting due to memory:
1. Increase `max_memory_restart` in `ecosystem.config.js`
2. Check for memory leaks in your code
3. Optimize database queries

### Port Already in Use
```bash
# Check what's running on port 1337
lsof -i :1337

# Kill the process
kill -9 <PID>

# Or change the port in .env and ecosystem.config.js
```

## Best Practices

1. **Use `yarn develop` for development** - It has auto-reload and better error messages
2. **Use PM2 for production** - It ensures reliability and monitoring
3. **Monitor logs regularly** - Check `yarn pm2:logs` for errors
4. **Restart after changes** - Always restart PM2 after code changes
5. **Keep PM2 updated** - Run `yarn upgrade pm2` periodically

## Additional Resources

- [PM2 Official Documentation](https://pm2.keymetrics.io/)
- [PM2 Process Management](https://pm2.keymetrics.io/docs/usage/process-management/)
- [PM2 Cluster Mode](https://pm2.keymetrics.io/docs/usage/cluster-mode/)

