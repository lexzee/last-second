const IDL = require("../public/idl.json");

// Helper: decode Anchor / Solana program errors into human text
export function decodeProgramError(err: any): string {
  if (!err) return "Unknown error";

  // 1) Anchor error object with msg field
  if (err?.error?.msg) return err.error.msg;
  if (err?.msg) return err.msg;

  // 2) Some errors include Program logs/messages in `logs` array
  if (Array.isArray(err?.logs) && err.logs.length) {
    // try to find an Anchor custom error message in logs
    const anchorMsg = err.logs.find((l: string) =>
      /(GameEnded|TimeExpired|GameNotOver|GameAlreadyClaimed|NotTheWinner|custom program error)/i.test(
        l
      )
    );
    if (anchorMsg) return anchorMsg;
  }

  // 3) Common shape: 'custom program error: 0x1770' inside message
  const msg = err?.message ?? JSON.stringify(err);
  const hexMatch = msg.match(/custom program error: 0x([0-9a-fA-F]+)/);
  if (hexMatch) {
    const hex = hexMatch[1];
    const code = parseInt(hex, 16);

    // lookup in IDL errors (IDL is your imported idl.json)
    const idlErr = (IDL as any)?.errors?.find((e: any) => e.code === code);
    if (idlErr) return `${idlErr.name}: ${idlErr.msg} (code ${code})`;

    return `Program error 0x${hex} (code ${code})`;
  }

  // 4) Anchor sometimes nests the error differently
  if (err?.error?.error) {
    // try nested error message
    return err.error.error.toString();
  }

  // 5) Anything else, return the original message or stringified object
  return typeof msg === "string" ? msg : JSON.stringify(msg);
}
