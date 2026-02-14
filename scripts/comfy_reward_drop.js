#!/usr/bin/env node
/**
 * ComfyUI reward-drop generator.
 *
 * - Loads a workflow JSON (default: comfy_live_workflow.json)
 * - Replaces LIVE_POSITIVE_PROMPT / LIVE_NEGATIVE_PROMPT placeholders
 * - Randomizes seed
 * - Submits to ComfyUI /prompt
 * - Polls /history until outputs exist
 * - Downloads the first image and saves it under workspace/output/rewards
 */

const fs = require('fs');
const path = require('path');
const { setTimeout: sleep } = require('timers/promises');

function mustEnv(name, fallback = undefined) {
  const v = process.env[name] ?? fallback;
  if (v === undefined || v === '') throw new Error(`Missing env ${name}`);
  return v;
}

function nowStamp() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}_${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}${pad(d.getUTCSeconds())}Z`;
}

function randSeed() {
  // 32-bit safe
  return Math.floor(Math.random() * 0x7fffffff);
}

async function httpJson(url, opts = {}) {
  const res = await fetch(url, {
    ...opts,
    headers: {
      'content-type': 'application/json',
      ...(opts.headers || {})
    }
  });
  if (!res.ok) {
    const txt = await res.text().catch(() => '');
    throw new Error(`HTTP ${res.status} ${res.statusText} for ${url}\n${txt}`);
  }
  return res.json();
}

async function httpBuffer(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  const ab = await res.arrayBuffer();
  return Buffer.from(ab);
}

function replacePrompts(workflow, positive, negative) {
  const cloned = JSON.parse(JSON.stringify(workflow));
  for (const nodeId of Object.keys(cloned)) {
    const node = cloned[nodeId];
    if (node?.inputs?.text === 'LIVE_POSITIVE_PROMPT') node.inputs.text = positive;
    if (node?.inputs?.text === 'LIVE_NEGATIVE_PROMPT') node.inputs.text = negative;
  }
  return cloned;
}

function pickUnique(arr, n) {
  const a = [...arr];
  const out = [];
  while (a.length && out.length < n) {
    const i = Math.floor(Math.random() * a.length);
    out.push(a.splice(i, 1)[0]);
  }
  return out;
}

function replaceOptionalLoras(workflow, picks) {
  const cloned = JSON.parse(JSON.stringify(workflow));
  const [p1, p2] = picks;
  for (const nodeId of Object.keys(cloned)) {
    const node = cloned[nodeId];
    // Replace whichever optional defaults are present (we keep valid defaults in the template).
    if (p1 && ['roundassv11_SDXL.safetensors','OPTIONAL_LORA_1'].includes(node?.inputs?.lora_name)) node.inputs.lora_name = p1;
    if (p2 && ['igbaddie-PN.safetensors','OPTIONAL_LORA_2'].includes(node?.inputs?.lora_name)) node.inputs.lora_name = p2;
  }
  return cloned;
}

function setSeed(workflow, seed) {
  const cloned = JSON.parse(JSON.stringify(workflow));
  for (const nodeId of Object.keys(cloned)) {
    const node = cloned[nodeId];
    if (node?.class_type === 'KSampler' && node?.inputs?.seed !== undefined) {
      node.inputs.seed = seed;
    }
  }
  return cloned;
}

function setCheckpoint(workflow, ckptName) {
  const cloned = JSON.parse(JSON.stringify(workflow));
  for (const nodeId of Object.keys(cloned)) {
    const node = cloned[nodeId];
    if (node?.class_type === 'CheckpointLoaderSimple' && node?.inputs?.ckpt_name !== undefined) {
      if (node.inputs.ckpt_name === 'CKPT_NAME') node.inputs.ckpt_name = ckptName;
    }
  }
  return cloned;
}

async function main() {
  const base = mustEnv('COMFY_BASE', 'http://lucapc.tail932dcc.ts.net:8000');
  const workflowPath = mustEnv('COMFY_WORKFLOW', path.join(process.cwd(), 'comfy_live_workflow.json'));
  const outDir = mustEnv('OUT_DIR', path.join(process.cwd(), 'output', 'rewards'));

  // Identity + consistency lock (safe: no secrets/tokens). Keep this stable.
  const ID_LOCK = [
    // core identity
    'nikki',
    'asian woman',
    // selfie realism + social-feed vibe
    'realistic photo',
    'self-taken photo',
    'handheld phone selfie',
    'natural skin texture',
    'less AI-clean',
    'single-frame',
    // body constraints (moderate IG model proportions)
    'moderate curves',
    'slim legs',
    'no muscular arms',
    'stable fair-light skin tone',
    // composition constraints
    'rotate angles (not always mirror)',
    'exactly one phone visible if phone present'
  ].join(', ');

  const positiveRaw = mustEnv('POSITIVE_PROMPT');
  const positive = `${positiveRaw}, ${ID_LOCK}`;

  const negative = [
    mustEnv('NEGATIVE_PROMPT', ''),
    // anatomy/composition safety
    'duplicate phone',
    'two phones',
    'extra phones',
    'split screen',
    'diptych',
    'collage',
    'watermark',
    'text',
    'logo'
  ].filter(Boolean).join(', ');

  fs.mkdirSync(outDir, { recursive: true });

  const workflow = JSON.parse(fs.readFileSync(workflowPath, 'utf8'));
  const seed = randSeed();

  // Optional LoRA rotation (1-2 each run). Keep fixed ones in the workflow.
  const optionalPool = (process.env.OPTIONAL_LORAS || [
    'roundassv11_SDXL.safetensors',
    'igbaddie-PN.safetensors',
    'On_Stomach.safetensors',
    'Perfect_Ass_-_Illustrious_V2.safetensors',
    'Mini_dress_from_behind_underbun.safetensors',
    'sexy_perspective_v3.safetensors',
    'Expressive_H-000001.safetensors'
  ].join(','))
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);

  const n = Math.random() < 0.5 ? 1 : 2;
  const picks = pickUnique(optionalPool, n);

  const wf1 = replacePrompts(workflow, positive, negative);
  const wfL = replaceOptionalLoras(wf1, picks);
  const ckptName = process.env.CKPT_NAME || 'cyberrealisticPony_v85.safetensors';

  const wfS = setSeed(wfL, seed);
  const wf2 = setCheckpoint(wfS, ckptName);

  const promptRes = await httpJson(`${base}/prompt`, {
    method: 'POST',
    body: JSON.stringify({ prompt: wf2 })
  });

  const promptId = promptRes.prompt_id;
  if (!promptId) throw new Error(`No prompt_id in response: ${JSON.stringify(promptRes)}`);

  // Poll history
  const deadline = Date.now() + 1000 * 180; // 3 min
  let hist;
  while (Date.now() < deadline) {
    hist = await httpJson(`${base}/history/${promptId}`);
    if (hist && Object.keys(hist).length > 0) break;
    await sleep(1000);
  }
  if (!hist || Object.keys(hist).length === 0) throw new Error('Timed out waiting for history');

  // Grab first image output
  const job = hist[promptId];
  const outputs = job?.outputs || {};
  const allImages = [];
  for (const out of Object.values(outputs)) {
    if (out?.images?.length) allImages.push(...out.images);
  }
  if (!allImages.length) {
    throw new Error(`No images in outputs. keys=${Object.keys(outputs).join(',')}`);
  }

  const img = allImages[0];
  const filename = img.filename;
  const subfolder = img.subfolder || '';
  const type = img.type || 'output';

  const qs = new URLSearchParams({ filename, subfolder, type });
  const buf = await httpBuffer(`${base}/view?${qs.toString()}`);

  const outPath = path.join(outDir, `reward_${nowStamp()}_seed${seed}.png`);
  fs.writeFileSync(outPath, buf);

  // Print machine-readable output
  process.stdout.write(JSON.stringify({
    ok: true,
    promptId,
    seed,
    outPath,
    comfyImage: { filename, subfolder, type },
    base
  }, null, 2) + '\n');
}

main().catch((err) => {
  console.error(err?.stack || String(err));
  process.exit(1);
});
