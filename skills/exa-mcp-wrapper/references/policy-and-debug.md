# Policy + Debug Notes

## Safer default tool set

Start with:
- web_search_exa
- web_search_advanced_exa
- get_code_context_exa
- crawling_exa
- company_research_exa
- deep_researcher_start
- deep_researcher_check

Add `people_search_exa` only when explicitly requested.

## Troubleshooting order

1. Auth: invalid/missing `EXA_API_KEY`
2. Endpoint shape: malformed `tools=` query string
3. Runtime registration: backend exists but not enabled/loaded
4. Gateway reload: config changed but process not reloaded
5. Rate limits/quota from Exa

## Minimal smoke tests

- Discovery test: list backend tools and confirm expected names.
- Execution test: run `web_search_exa` on a short query.
- Async test: start + check a deep researcher job.

## Security posture

- Avoid broad people-search usage by default.
- Log only non-sensitive summaries.
- Keep API keys in env/secret storage, never plain chat text.
