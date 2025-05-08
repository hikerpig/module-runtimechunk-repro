
# Reproduce in rspack

1. Build

```bash
npx rspack --json=dist/compilation-stats.json
```

2. Check stats json output `dist/compilation-stats.json`,  some module in `chunks.modules` marked as `orphan`.


Notes: If you turn off `optimization.concatenateModules`, there are no orphan modules.

# Behavior in webpack

1. Build

```bash
npx rspack --json=dist-webpack/compilation-stats.json
```

2. Check stats json output `dist-webpack/compilation-stats.json`,  all `chunks.modules` are not orphan.
