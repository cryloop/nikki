---
name: exa-mcp-wrapper
description: Wrap the Exa hosted MCP endpoint into a reusable OpenClaw skill backend and verify it is callable. Use when a user asks to add Exa MCP tools (web_search_exa, crawling_exa, code context, company/people research, deep_researcher) or asks for setup, hardening, testing, or troubleshooting of Exa MCP integration.
---

# Exa MCP Wrapper

Set up Exa MCP as a skill backend, validate tool visibility, and hand back a working config.

## Quick workflow

1. Confirm target MCP URL and selected tools.
2. Configure backend with `EXA_API_KEY` in env (never inline in chat logs).
3. Reload/restart OpenClaw if required.
4. Verify tool discovery and run one smoke test.
5. Return a short result with what was enabled and what still needs manual action.

## Implementation steps

### 1) Normalize the endpoint

Use the provided URL exactly unless user asks to trim tools:

`https://mcp.exa.ai/mcp?tools=web_search_exa,web_search_advanced_exa,get_code_context_exa,crawling_exa,company_research_exa,people_search_exa,deep_researcher_start,deep_researcher_check`

If user wants safer defaults, remove `people_search_exa` first.

### 2) Configure backend runtime

Use the local MCP backend runtime available in the environment (commonly `mcporter`).

- Discover current commands first (`--help`) before mutating anything.
- Create/update a backend named `exa` pointing at the endpoint.
- Inject `EXA_API_KEY` via env/secret storage supported by the runtime.
- Prefer idempotent updates (upsert) over delete/recreate.

If command surface differs by version, adapt by reading help output and mapping to equivalent actions.

### 3) Wire into OpenClaw

Ensure the backend is visible to the active agent/toolchain.

- Enable required plugin/skill entries if disabled.
- Apply config changes safely.
- Restart/reload gateway only if needed.

### 4) Validate

Run all checks:

- Backend status is healthy.
- Tool list includes requested Exa tools.
- Smoke test succeeds (e.g., `web_search_exa` with a short query).

If any check fails, capture exact error text and classify as auth / routing / policy / quota.

## Output format

Return:

- Enabled tools
- Security notes (especially people/company research scope)
- Smoke test result
- Next action (if any)

Keep it concise and operational.

## Reference

For safer policy defaults and troubleshooting checklist, read `references/policy-and-debug.md`.
