export type TemplateVars = Record<string, string | undefined | null>;

export function renderTemplate(template: string, vars: TemplateVars): string {
  return template.replace(/\{\{\s*([A-Z0-9_]+)\s*\}\}/gi, (_, key: string) => {
    const value = vars[key] ?? vars[key.toUpperCase()] ?? vars[key.toLowerCase()];
    return value == null ? "" : String(value);
  });
}

export function textToHtml(text: string): string {
  const escaped = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  return `<div style="font-family:Georgia,serif;font-size:15px;line-height:1.55;color:#1a1a1a">${escaped
    .split(/\n{2,}/)
    .map((p) => `<p>${p.replace(/\n/g, "<br/>")}</p>`)
    .join("")}</div>`;
}

export function appendUnsubscribe(html: string, text: string, url: string): { html: string; text: string } {
  const footerText = `\n\n---\nPour vous désinscrire : ${url}`;
  const footerHtml = `<hr/><p style="font-size:12px;color:#666">Pour vous désinscrire : <a href="${url}">cliquez ici</a></p>`;
  return {
    html: `${html}${footerHtml}`,
    text: `${text}${footerText}`,
  };
}
