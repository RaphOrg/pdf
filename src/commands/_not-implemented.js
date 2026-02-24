export function notImplemented(cmdName) {
  return async () => {
    // keep UX consistent across all stubs
    console.error(`${cmdName}: not implemented yet`);
    process.exitCode = 2;
  };
}
