#!/usr/bin/env node
/**
 * CI guard: every .claude/skills/<name>/SKILL.md must have YAML frontmatter
 * with non-empty `name` and `description` fields, and `name` must match its
 * directory. Also validates that .mcp.json is parseable JSON.
 *
 * Exits non-zero with a readable message on the first problem.
 */
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const errors = [];

// 1) Validate .mcp.json
const mcpPath = join(repoRoot, '.mcp.json');
if (!existsSync(mcpPath)) {
  errors.push('.mcp.json is missing.');
} else {
  try {
    const mcp = JSON.parse(readFileSync(mcpPath, 'utf8'));
    if (!mcp.mcpServers || typeof mcp.mcpServers !== 'object') {
      errors.push('.mcp.json must contain an "mcpServers" object.');
    } else if (!mcp.mcpServers.playwright) {
      errors.push('.mcp.json should define a "playwright" MCP server.');
    }
  } catch (e) {
    errors.push(`.mcp.json is not valid JSON: ${e.message}`);
  }
}

// 2) Validate skills
const skillsDir = join(repoRoot, '.claude', 'skills');
if (existsSync(skillsDir)) {
  const dirs = readdirSync(skillsDir).filter((d) =>
    statSync(join(skillsDir, d)).isDirectory(),
  );
  if (dirs.length === 0) errors.push('No skill directories found under .claude/skills/.');

  for (const dir of dirs) {
    const file = join(skillsDir, dir, 'SKILL.md');
    if (!existsSync(file)) {
      errors.push(`${dir}: missing SKILL.md`);
      continue;
    }
    const content = readFileSync(file, 'utf8');
    const fm = content.match(/^---\n([\s\S]*?)\n---/);
    if (!fm) {
      errors.push(`${dir}/SKILL.md: missing YAML frontmatter block.`);
      continue;
    }
    const body = fm[1];
    const name = body.match(/^name:\s*(.+)$/m)?.[1]?.trim();
    const description = body.match(/^description:\s*(.+)$/m)?.[1]?.trim();
    if (!name) errors.push(`${dir}/SKILL.md: frontmatter missing "name".`);
    if (!description)
      errors.push(`${dir}/SKILL.md: frontmatter missing "description".`);
    if (name && name !== dir)
      errors.push(`${dir}/SKILL.md: name "${name}" must match directory "${dir}".`);
    if (description && description.length < 40)
      errors.push(
        `${dir}/SKILL.md: description is too short to trigger reliably (<40 chars).`,
      );
  }
} else {
  errors.push('.claude/skills/ directory is missing.');
}

if (errors.length) {
  console.error('✗ Skill / MCP validation failed:\n');
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}

console.log('✓ .mcp.json and all SKILL.md files are valid.');
