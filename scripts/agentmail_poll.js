#!/usr/bin/env node
/**
 * AgentMail inbox poller
 * 
 * Checks for new messages and prints them in a format the cron job can handle.
 * 
 * Usage: node agentmail_poll.js
 * 
 * Output:
 *   - Nothing (empty) if no new messages
 *   - Message details if new messages found
 */

const { AgentMailClient } = require('agentmail');
const fs = require('fs');

// Load API key from config
const configPath = '/home/ubuntu/.openclaw/openclaw.json';
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
const apiKey = config.skills?.entries?.agentmail?.env?.AGENTMAIL_API_KEY;

if (!apiKey) {
  console.error('Error: AGENTMAIL_API_KEY not found in config');
  process.exit(1);
}

const client = new AgentMailClient({ apiKey });

const STATE_FILE = '/home/ubuntu/.openclaw/workspace/memory/agentmail_last.json';

async function main() {
  const inboxId = 'nikki-lab@agentmail.to';
  
  // Load last seen message IDs
  let lastSeenIds = new Set();
  try {
    if (fs.existsSync(STATE_FILE)) {
      const data = JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
      lastSeenIds = new Set(data.lastSeenIds || []);
    }
  } catch (e) {
    // Start fresh if state file doesn't exist
  }
  
  // Fetch messages - pass inbox ID as string, not object
  const result = await client.inboxes.messages.list(inboxId);
  
  const messages = result.messages || [];
  
  // Find new messages
  const newMessages = messages.filter(m => !lastSeenIds.has(m.messageId));
  
  if (newMessages.length === 0) {
    // No new messages - output nothing
    process.exit(0);
  }
  
  // Update state with all current message IDs
  const allIds = messages.map(m => m.messageId);
  fs.writeFileSync(STATE_FILE, JSON.stringify({ lastSeenIds: allIds }, null, 2));
  
  // Print new messages
  for (const msg of newMessages) {
    // 'from' is a string like "Name <email@domain.com>" or just "email@domain.com"
    const from = msg.from || 'unknown';
    const subject = msg.subject || '(no subject)';
    const preview = (msg.preview || '').substring(0, 150);
    
    console.log(`📧 ${from}`);
    console.log(`   Subject: ${subject}`);
    if (preview) {
      console.log(`   Preview: ${preview}${preview.length === 150 ? '...' : ''}`);
    }
    console.log();
  }
}

main().catch(e => {
  console.error('Error:', e.message);
  process.exit(1);
});
