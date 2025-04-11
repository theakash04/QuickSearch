export default function cleanContent(text: string) {
  return text
    .replace(/\s+/g, " ")
    .replace(/[\u200B-\u200D\uFEFF]/g, "")
    .replace(/©\s?\d{4}.*/gi, "")
    .replace(/(Read more:|Follow us on|Subscribe to).*/gi, "")
    .replace(/[#,.:;_\-]/g, "")
    .trim();
}
