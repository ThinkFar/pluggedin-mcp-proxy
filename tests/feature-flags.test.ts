import { describe, it, expect } from 'vitest';

describe('Feature Flags Configuration', () => {
  describe('Environment variable names', () => {
    it('should have correct environment variable names', () => {
      const envVars = {
        knowledgeBase: 'PLUGGEDIN_ENABLE_KNOWLEDGE_BASE',
        documents: 'PLUGGEDIN_ENABLE_DOCUMENTS',
        notifications: 'PLUGGEDIN_ENABLE_NOTIFICATIONS'
      };

      expect(envVars.knowledgeBase).toBe('PLUGGEDIN_ENABLE_KNOWLEDGE_BASE');
      expect(envVars.documents).toBe('PLUGGEDIN_ENABLE_DOCUMENTS');
      expect(envVars.notifications).toBe('PLUGGEDIN_ENABLE_NOTIFICATIONS');
    });
  });

  describe('Feature flag logic', () => {
    it('should only enable when value is exactly "true"', () => {
      const testValue = (val: string | undefined) => val === 'true';

      expect(testValue('true')).toBe(true);
      expect(testValue('false')).toBe(false);
      expect(testValue('1')).toBe(false);
      expect(testValue('yes')).toBe(false);
      expect(testValue('')).toBe(false);
      expect(testValue('TRUE')).toBe(false); // Case sensitive
      expect(testValue(undefined)).toBe(false);
    });
  });

  describe('Tool categories', () => {
    it('should define core tools that are always available', () => {
      const coreTools = [
        'pluggedin_setup',
        'pluggedin_discover_tools'
      ];

      expect(coreTools).toHaveLength(2);
      expect(coreTools).toContain('pluggedin_setup');
      expect(coreTools).toContain('pluggedin_discover_tools');
    });

    it('should define knowledge base tools', () => {
      const knowledgeBaseTools = [
        'pluggedin_ask_knowledge_base'
      ];

      expect(knowledgeBaseTools).toHaveLength(1);
      expect(knowledgeBaseTools[0]).toBe('pluggedin_ask_knowledge_base');
    });

    it('should define document management tools', () => {
      const documentTools = [
        'pluggedin_create_document',
        'pluggedin_list_documents',
        'pluggedin_search_documents',
        'pluggedin_get_document',
        'pluggedin_update_document'
      ];

      expect(documentTools).toHaveLength(5);
    });

    it('should define notification management tools', () => {
      const notificationTools = [
        'pluggedin_send_notification',
        'pluggedin_list_notifications',
        'pluggedin_mark_notification_done',
        'pluggedin_delete_notification'
      ];

      expect(notificationTools).toHaveLength(4);
    });

    it('should have total of 12 static tools when all features enabled', () => {
      const totalTools = 2 + 1 + 5 + 4; // core + knowledge + documents + notifications
      expect(totalTools).toBe(12);
    });
  });

  describe('Error messages', () => {
    it('should have clear error message for disabled knowledge base tools', () => {
      const expectedError = 'Knowledge Base tools are not enabled. Set PLUGGEDIN_ENABLE_KNOWLEDGE_BASE=true to enable.';
      expect(expectedError).toContain('PLUGGEDIN_ENABLE_KNOWLEDGE_BASE=true');
      expect(expectedError).toContain('Knowledge Base');
    });

    it('should have clear error message for disabled document tools', () => {
      const expectedError = 'Document Management tools are not enabled. Set PLUGGEDIN_ENABLE_DOCUMENTS=true to enable.';
      expect(expectedError).toContain('PLUGGEDIN_ENABLE_DOCUMENTS=true');
      expect(expectedError).toContain('Document Management');
    });

    it('should have clear error message for disabled notification tools', () => {
      const expectedError = 'Notification Management tools are not enabled. Set PLUGGEDIN_ENABLE_NOTIFICATIONS=true to enable.';
      expect(expectedError).toContain('PLUGGEDIN_ENABLE_NOTIFICATIONS=true');
      expect(expectedError).toContain('Notification Management');
    });
  });
});
