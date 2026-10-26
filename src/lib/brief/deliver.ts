import type { BriefPacket } from "./compose";

/**
 * Delivery boundary for the project brief.
 * The form calls `deliverBrief` and nothing else.
 * To plug in a form service later, replace this function and keep `BriefPacket`.
 */
export const MAILTO_SAFE_LIMIT = 1800;

export type DeliveryResult =
  | { ok: true; method: "mailto"; href: string }
  | { ok: false; method: "mailto"; reason: "too-long"; text: string };

export function buildMailto(packet: Pick<BriefPacket, "to" | "subject" | "body">): string {
  const query = new URLSearchParams({ subject: packet.subject, body: packet.body });
  return `mailto:${packet.to}?${query.toString()}`;
}

export function deliverBrief(packet: BriefPacket): DeliveryResult {
  const href = buildMailto(packet);
  if (href.length > MAILTO_SAFE_LIMIT) {
    return { ok: false, method: "mailto", reason: "too-long", text: packet.plain };
  }
  return { ok: true, method: "mailto", href };
}
