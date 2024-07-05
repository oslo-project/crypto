---
title: "constantTimeEqual()"
---

# constantTimeEqual()

Compares 2 data in constant time (*). 

> Note: While this is algorithmically constant time, the JIT-compiler and garbage collection makes it nearly impossible for JavaScript code to be constant time.

## Definition

```ts
function constantTimeEqual(a: Uint8Array, b: Uint8Array): boolean;
```

### Parameters

- `a`
- `b`
