#!/usr/bin/env node
/**
 * AgentMail poller.
 * - Lists latest messages in nikki-lab@agentmail.to
 * - Compares against memory/agentmail_state.json
 * - If new inbound message(s), writes state and prints a short notification line.
 */

const fs = require('fs');
const path = require('path');

const CFG_PATH = '/home/ubuntu/.openclaw/openclaw.json';
const STATE_PATH = '/home/ubuntu/.openclaw/workspace/memory/agentmail_state.json';

function loadCfg() {
  const cfg = JSON.parse(fs.readFileSync(CFG_PATH, 'utf8'));
  const key = cfg?.skills?.entries?.agentmail?.env?.AGENTMAIL_API_KEY;
  if (!key) throw new Error('Missing AGENTMAIL_API_KEY in config');
  return { key };
}

function loadState() {
  if (!fs.existsSync(STATE_PATH)) return { lastSeenMessageId: null, updatedAt: null };
  try { return JSON.parse(fs.readFileSync(STATE_PATH, 'utf8')); }
  catch { return { lastSeenMessageId: null, updatedAt: null }; }
}

function saveState(st) {
  st.updatedAt = new Date().toISOString();
  fs.mkdirSync(path.dirname(STATE_PATH), { recursive: true });
  fs.writeFileSync(STATE_PATH, JSON.stringify(st, null, 2));
}

async function listMessages(key, inbox, limit = 10) {
  const url = `https://api.agentmail.to/v0/inboxes/${encodeURIComponent(inbox)}/messages?limit=${limit}`;
  const res = await fetch(url, { headers: { authorization: `Bearer ${key}` } });
  const txt = await res.text();
  if (!res.ok) throw new Error(`HTTP ${res.status} ${txt}`);
  return JSON.parse(txt);
}

async function getMessage(key, inbox, messageId) {
  const url = `https://api.agentmail.to/v0/inboxes/${encodeURIComponent(inbox)}/messages/${encodeURIComponent(messageId)}`;
  const res = await fetch(url, { headers: { authorization: `Bearer ${key}` } });
  const txt = await res.text();
  if (!res.ok) throw new Error(`HTTP ${res.status} ${txt}`);
  return JSON.parse(txt);
}

function safePreview(text) {
  if (!text) return '';
  return text
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 160);
}

(async () => {
  const inbox = process.env.AGENTMAIL_INBOX || 'nikki-lab@agentmail.to';
  const { key } = loadCfg();
  const st = loadState();

  const data = await listMessages(key, inbox, 10);
  const msgs = data.messages || [];
  if (!msgs.length) process.exit(0);

  // Find newest message id
  const newest = msgs[0];
  const newestId = newest.message_id;
  if (!newestId) process.exit(0);

  // No change
  if (st.lastSeenMessageId === newestId) process.exit(0);

  // Only notify on inbound replies (heuristic: subject starts with Re: OR not authored by our inbox)
  const full = await getMessage(key, inbox, newestId);
  const subject = full.subject || newest.subject || '(no subject)';
  const text = full.text || full.snippet || '';

  // Update state regardless to avoid repeat spam
  st.lastSeenMessageId = newestId;
  saveState(st);

  // Decide notify
  const subj = String(subject);
  const shouldNotify = true; // keep simple; Luca wants proactive

  if (!shouldNotify) process.exit(0);

  const preview = safePreview(text);
  const line = `📬 new email: ${subj}${preview ? ` — ${preview}` : ''}`;
  process.stdout.write(line + '\n');
})();
