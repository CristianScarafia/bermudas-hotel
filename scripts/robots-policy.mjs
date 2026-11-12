// Crawl checks for the site's ASCII routes, including CDN-injected agent groups.
// Group and rule precedence: https://developers.google.com/crawling/docs/robots-txt/robots-txt-spec
export function canCrawlPath(text, userAgent, pathname = "/") {
  const groups = [];
  let group;
  for (const line of text.split(/\r?\n/)) {
    const match = line.split("#", 1)[0].trim().match(/^([^:]+):\s*(.*)$/);
    if (!match) continue;
    const [, field, value] = match;
    const name = field.trim().toLowerCase();
    if (name === "user-agent") {
      if (!group || group.rules.length) {
        group = { agents: [], rules: [] };
        groups.push(group);
      }
      group.agents.push(value.trim().toLowerCase());
    } else if (group && ["allow", "disallow"].includes(name)) {
      // Empty rules still separate groups, but don't restrict crawling.
      group.rules.push({ allow: name === "allow", path: value.trim() });
    }
  }
  const agent = userAgent.toLowerCase();
  const ranked = groups.map(item => ({ ...item, specificity: Math.max(-1, ...item.agents.map(token => {
    if (token === "*") return 0;
    const product = token.replace(/[^a-z_-].*$/, "");
    return product && agent.includes(product) ? product.length : -1;
  })) }));
  const specificity = Math.max(-1, ...ranked.map(item => item.specificity));
  const rules = ranked.filter(item => item.specificity === specificity && specificity >= 0).flatMap(item => item.rules);
  let best = { length: -1, allow: true };
  for (const rule of rules) {
    if (!rule.path.startsWith("/")) continue;
    const pattern = rule.path.replace(/\*+$/, "");
    const end = pattern.endsWith("$");
    const body = end ? pattern.slice(0, -1) : pattern;
    const expression = body.split("*").map(part => part.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join(".*");
    if (!new RegExp(`^${expression}${end ? "$" : ""}`).test(pathname)) continue;
    if (pattern.length > best.length || (pattern.length === best.length && rule.allow)) best = { length: pattern.length, allow: rule.allow };
  }
  return best.allow;
}
