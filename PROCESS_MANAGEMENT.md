# Backend/Frontend Process Management Fix ✅

## Problem

When running `./start.sh`, the services would start correctly, complete the health check, but then immediately shut down instead of continuing to run.

## Root Cause

The issue was in the script's cleanup and waiting logic:

1. **Cleanup trap was too aggressive** - It was configured to trap EXIT signal, which would trigger even on normal script completion
2. **Wait command had no proper monitoring** - The `wait` command would exit as soon as child processes completed
3. **No process monitoring loop** - There was no way to keep services running continuously

## Solution

### 1. **Fixed Trap Configuration**
```bash
# Before (would cleanup on any exit)
trap cleanup SIGINT SIGTERM EXIT

# After (only cleanup on user interrupt/termination)
trap cleanup SIGINT SIGTERM
```

This ensures cleanup only happens when the user explicitly stops the services with Ctrl+C, not on normal script exit.

### 2. **Added Continuous Monitoring Loop**
```bash
# Before: Simple wait command that exits immediately
wait

# After: Continuous monitoring loop that keeps services running
while true; do
    sleep 1
    # Check if backend is still running
    if ! kill -0 $BACKEND_PID 2>/dev/null; then
        print_error "Backend process died unexpectedly"
        echo "Check logs: cat /tmp/lynko-backend.log"
    fi
    # Check if frontend is still running
    if ! kill -0 $FRONTEND_PID 2>/dev/null; then
        print_error "Frontend process died unexpectedly"
        echo "Check logs: cat /tmp/lynko-frontend.log"
    fi
done
```

This loop:
- Continuously checks that both services are still running
- Reports if either service crashes unexpectedly
- Keeps the script alive so services stay in the foreground
- Responds to Ctrl+C to shut everything down gracefully

### 3. **Improved Port-Based Process Killing**
```bash
# Before: Used incompatible lsof syntax
lsof -ti:$BACKEND_PORT | xargs -r kill -9

# After: Compatible lsof syntax with fallbacks
pids=$(lsof -t -i :$BACKEND_PORT 2>/dev/null || echo "")
if [ -n "$pids" ]; then
    echo "$pids" | xargs -r kill -9 2>/dev/null || true
fi
```

## How It Works Now

### Service Lifecycle

```
1. start.sh runs
   ↓
2. Services start (background processes)
   ↓
3. Health checks run
   ↓
4. Monitoring loop starts
   ├─ Continuously checks if services are alive
   ├─ Reports any unexpected crashes
   └─ Keeps script running (services stay in background)
   ↓
5. User presses Ctrl+C
   ↓
6. SIGINT signal caught by cleanup trap
   ↓
7. Services are properly terminated
   └─ Kill by PID
   └─ Kill by port (fallback)
   └─ Kill by process name (final fallback)
   ↓
8. Script exits cleanly
```

### Process Management

**Graceful Shutdown Strategy:**
1. Send SIGTERM to processes to shut down gracefully
2. Wait 1 second for processes to exit
3. Kill remaining processes by port (most reliable)
4. Fallback to fuser command
5. Fallback to pkill by process name

## Files Modified

- ✅ `start.sh` - Fixed trap configuration and monitoring loop

## Testing

### Test 1: Normal Operation
```bash
./start.sh
# Services should stay running
# Health checks should complete successfully
# Services should continue running until Ctrl+C
```

### Test 2: Graceful Shutdown
```bash
./start.sh
# Let it run for 5-10 seconds
# Press Ctrl+C
# Services should shut down cleanly
# Script should exit with cleanup messages
```

### Test 3: Process Monitoring
```bash
./start.sh
# In another terminal, kill the backend:
kill -9 <backend-pid>
# Script should detect and report the crash:
✗ Backend process died unexpectedly
Check logs: cat /tmp/lynko-backend.log
```

## Benefits

✅ **Services stay running** - No more premature shutdown after health checks
✅ **Crash detection** - Script monitors and reports if services die unexpectedly
✅ **Graceful cleanup** - Proper shutdown with multiple fallback methods
✅ **User friendly** - Clear messages about what's happening
✅ **Port-safe** - Ensures ports are freed when stopping
✅ **Compatible** - Works with multiple Linux systems and shell variants

## Troubleshooting

### Services still shutting down
```bash
# Check for errors in the logs:
tail -f /tmp/lynko-backend.log
tail -f /tmp/lynko-frontend.log
```

### Port already in use
```bash
# Kill processes on port 5000:
lsof -ti:5000 | xargs kill -9

# Kill processes on port 3000:
lsof -ti:3000 | xargs kill -9
```

### Script exits immediately
```bash
# Check if services start successfully:
./start.sh 2>&1 | head -100

# Verify Node.js is installed:
node -v
npm -v
```

## Summary

The script now properly:
1. ✅ Starts both frontend and backend services
2. ✅ Runs health checks
3. ✅ **Keeps services running continuously**
4. ✅ Monitors for unexpected crashes
5. ✅ Shuts down gracefully on Ctrl+C
6. ✅ Cleans up ports and processes

Your chatbot services will now run reliably until you explicitly stop them! 🎉
