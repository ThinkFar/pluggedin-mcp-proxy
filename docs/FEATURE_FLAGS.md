# Feature Flags Guide

The plugged.in MCP Proxy supports optional tool categories that can be enabled via environment variables. This allows you to customize which tools are available based on your needs.

## Overview

By default, only **core tools** are enabled:
- `pluggedin_setup` - Setup and configuration help
- `pluggedin_discover_tools` - Tool discovery

All other tool categories are **opt-in** and must be explicitly enabled.

## Available Feature Flags

### Knowledge Base / RAG Tools

**Environment Variable:** `PLUGGEDIN_ENABLE_KNOWLEDGE_BASE=true`

**Enables:**
- `pluggedin_ask_knowledge_base` - Ask questions and get AI-generated answers from your knowledge base

**Use Case:** Enable this if you want to use RAG (Retrieval-Augmented Generation) capabilities to query your document library.

### Document Management Tools

**Environment Variable:** `PLUGGEDIN_ENABLE_DOCUMENTS=true`

**Enables:**
- `pluggedin_create_document` - Create and save AI-generated documents
- `pluggedin_list_documents` - List documents with filtering options
- `pluggedin_search_documents` - Search for specific documents
- `pluggedin_get_document` - Retrieve full content of a document by ID
- `pluggedin_update_document` - Update or append to existing documents

**Use Case:** Enable this if you want AI models to create, manage, and search documents in your library.

### Notification Management Tools

**Environment Variable:** `PLUGGEDIN_ENABLE_NOTIFICATIONS=true`

**Enables:**
- `pluggedin_send_notification` - Send custom notifications with optional email delivery
- `pluggedin_list_notifications` - List notifications with filters
- `pluggedin_mark_notification_done` - Mark a notification as done/read
- `pluggedin_delete_notification` - Delete a notification

**Use Case:** Enable this if you want AI models to send notifications and manage your notification inbox.

## Configuration Examples

### Claude Desktop

#### Minimal Configuration (Core Tools Only)

```json
{
  "mcpServers": {
    "pluggedin": {
      "command": "npx",
      "args": ["-y", "@pluggedin/pluggedin-mcp-proxy@latest"],
      "env": {
        "PLUGGEDIN_API_KEY": "YOUR_API_KEY"
      }
    }
  }
}
```

#### Enable Knowledge Base Only

```json
{
  "mcpServers": {
    "pluggedin": {
      "command": "npx",
      "args": ["-y", "@pluggedin/pluggedin-mcp-proxy@latest"],
      "env": {
        "PLUGGEDIN_API_KEY": "YOUR_API_KEY",
        "PLUGGEDIN_ENABLE_KNOWLEDGE_BASE": "true"
      }
    }
  }
}
```

#### Enable Documents and Notifications

```json
{
  "mcpServers": {
    "pluggedin": {
      "command": "npx",
      "args": ["-y", "@pluggedin/pluggedin-mcp-proxy@latest"],
      "env": {
        "PLUGGEDIN_API_KEY": "YOUR_API_KEY",
        "PLUGGEDIN_ENABLE_DOCUMENTS": "true",
        "PLUGGEDIN_ENABLE_NOTIFICATIONS": "true"
      }
    }
  }
}
```

#### Full Configuration (All Features Enabled)

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

### Cline

The configuration format is identical to Claude Desktop. Use the same JSON structure in your Cline configuration file.

### Command Line

You can also set these environment variables when running from the command line:

```bash
# Enable all features
PLUGGEDIN_API_KEY=your_key \
PLUGGEDIN_ENABLE_KNOWLEDGE_BASE=true \
PLUGGEDIN_ENABLE_DOCUMENTS=true \
PLUGGEDIN_ENABLE_NOTIFICATIONS=true \
npx -y @pluggedin/pluggedin-mcp-proxy@latest
```

### Docker

When running in Docker, pass environment variables using the `-e` flag:

```bash
docker run -d --rm \
  -e PLUGGEDIN_API_KEY="YOUR_API_KEY" \
  -e PLUGGEDIN_ENABLE_KNOWLEDGE_BASE="true" \
  -e PLUGGEDIN_ENABLE_DOCUMENTS="true" \
  -e PLUGGEDIN_ENABLE_NOTIFICATIONS="true" \
  -p 12006:12006 \
  pluggedin-mcp-proxy:latest \
  --transport streamable-http --port 12006
```

## Error Messages

If you try to use a tool that hasn't been enabled, you'll receive a clear error message:

- **Knowledge Base tools:** `"Knowledge Base tools are not enabled. Set PLUGGEDIN_ENABLE_KNOWLEDGE_BASE=true to enable."`
- **Document tools:** `"Document Management tools are not enabled. Set PLUGGEDIN_ENABLE_DOCUMENTS=true to enable."`
- **Notification tools:** `"Notification Management tools are not enabled. Set PLUGGEDIN_ENABLE_NOTIFICATIONS=true to enable."`

## Best Practices

1. **Start Minimal:** Begin with only the core tools and enable additional features as needed
2. **Security:** Only enable tools that you actually need to minimize the attack surface
3. **Performance:** Fewer enabled tools means faster tool discovery and listing
4. **Testing:** Test each feature category individually before enabling all of them

## Checking Enabled Tools

Use the `pluggedin_discover_tools` tool to see which tools are currently available:

```javascript
// In your MCP client
pluggedin_discover_tools()
```

This will show you all enabled static tools plus any dynamic tools from connected MCP servers.
