# Feature Flags Implementation - Changelog

## Summary

Implemented opt-in feature flags for optional tool categories, allowing users to selectively enable Knowledge Base, Document Management, and Notification Management tools via environment variables.

## Changes Made

### 1. Core Implementation (`src/constants.ts`)

Added new `FEATURE_FLAGS` constant with three feature toggles:
- `ENABLE_KNOWLEDGE_BASE` - Controls Knowledge Base/RAG tools
- `ENABLE_DOCUMENTS` - Controls Document Management tools
- `ENABLE_NOTIFICATIONS` - Controls Notification Management tools

All flags default to `false` (disabled) and are enabled by setting the corresponding environment variable to `'true'`.

### 2. Tool Registration (`src/mcp-proxy.ts`)

**Added:**
- `getEnabledStaticTools()` helper function that dynamically builds the list of enabled tools based on feature flags
- Feature flag checks in tool call handlers to prevent execution of disabled tools

**Modified:**
- `ListToolsRequestSchema` handler now uses `getEnabledStaticTools()` instead of hardcoded tool lists
- All tool call handlers for optional tools now check feature flags before execution

**Tool Categories:**

**Always Enabled (Core):**
- `pluggedin_setup`
- `pluggedin_discover_tools`

**Opt-in via `PLUGGEDIN_ENABLE_KNOWLEDGE_BASE=true`:**
- `pluggedin_ask_knowledge_base`

**Opt-in via `PLUGGEDIN_ENABLE_DOCUMENTS=true`:**
- `pluggedin_create_document`
- `pluggedin_list_documents`
- `pluggedin_search_documents`
- `pluggedin_get_document`
- `pluggedin_update_document`

**Opt-in via `PLUGGEDIN_ENABLE_NOTIFICATIONS=true`:**
- `pluggedin_send_notification`
- `pluggedin_list_notifications`
- `pluggedin_mark_notification_done`
- `pluggedin_delete_notification`

### 3. Documentation Updates

**README.md:**
- Updated "Tool Categories" section to clearly distinguish core vs optional tools
- Added environment variable documentation table
- Provided both basic and full configuration examples for Claude Desktop and Cline
- Added feature flag information to configuration sections

**New Documentation:**
- Created `docs/FEATURE_FLAGS.md` with comprehensive guide including:
  - Overview of feature flags
  - Detailed description of each flag and its tools
  - Configuration examples for all MCP clients
  - Docker and command-line usage examples
  - Error messages reference
  - Best practices

### 4. Error Handling

Added clear, actionable error messages when users attempt to use disabled tools:
- `"Knowledge Base tools are not enabled. Set PLUGGEDIN_ENABLE_KNOWLEDGE_BASE=true to enable."`
- `"Document Management tools are not enabled. Set PLUGGEDIN_ENABLE_DOCUMENTS=true to enable."`
- `"Notification Management tools are not enabled. Set PLUGGEDIN_ENABLE_NOTIFICATIONS=true to enable."`

## Benefits

1. **Security:** Users can minimize attack surface by only enabling needed tools
2. **Performance:** Faster tool discovery with fewer tools to list
3. **Flexibility:** Users can customize their MCP proxy based on their specific needs
4. **Clarity:** Clear separation between core and optional functionality
5. **Backward Compatibility:** Existing users can continue with minimal configuration (core tools only)

## Migration Guide for Existing Users

### No Action Required
If you're happy with just the core tools (`pluggedin_setup` and `pluggedin_discover_tools`), no changes are needed.

### To Enable Previously Available Tools

Add the appropriate environment variables to your MCP client configuration:

```json
{
  "mcpServers": {
    "pluggedin": {
      "command": "npx",
      "args": ["-y", "@pluggedin/pluggedin-mcp-proxy@latest"],
      "env": {
        "PLUGGEDIN_API_KEY": "YOUR_API_KEY",
        "PLUGGEDIN_ENABLE_KNOWLEDGE_BASE": "true",
        "PLUGGEDIN_ENABLE_DOCUMENTS": "true",
        "PLUGGEDIN_ENABLE_NOTIFICATIONS": "true"
      }
    }
  }
}
```

## Testing

- ✅ All TypeScript compilation passes
- ✅ No diagnostic errors
- ✅ Existing tests pass (unrelated test failures in streamable-http are pre-existing)
- ✅ Build succeeds without errors

## Files Modified

1. `src/constants.ts` - Added FEATURE_FLAGS
2. `src/mcp-proxy.ts` - Implemented feature flag logic
3. `README.md` - Updated documentation
4. `docs/FEATURE_FLAGS.md` - New comprehensive guide

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PLUGGEDIN_ENABLE_KNOWLEDGE_BASE` | `false` | Enable Knowledge Base/RAG tools |
| `PLUGGEDIN_ENABLE_DOCUMENTS` | `false` | Enable Document Management tools |
| `PLUGGEDIN_ENABLE_NOTIFICATIONS` | `false` | Enable Notification Management tools |
