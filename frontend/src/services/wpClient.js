const DEFAULT_BASE_URL = "https://coins.local";
const DEFAULT_TIMEOUT_MS = 8000;

export class WpClientError extends Error {
  constructor(message, { status, url, cause } = {}) {
    super(message);
    this.name = "WpClientError";
    this.status = status;
    this.url = url;
    this.cause = cause;
  }
}

export function getWpBaseUrl() {
  const url = process.env.REACT_APP_WP_API_URL || DEFAULT_BASE_URL;
  return url.replace(/\/+$/, "");
}

export async function wpFetch(path, options = {}) {
  const { timeout = DEFAULT_TIMEOUT_MS, headers, ...fetchOptions } = options;
  const base = getWpBaseUrl();
  const url = path.startsWith("http")
    ? path
    : `${base}${path.startsWith("/") ? path : `/${path}`}`;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  try {
    const res = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
      headers: {
        Accept: "application/json",
        ...headers,
      },
    });

    if (!res.ok) {
      throw new WpClientError(`HTTP ${res.status} ${res.statusText}`.trim(), {
        status: res.status,
        url,
      });
    }

    const contentType = res.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      throw new WpClientError("Expected JSON response", { status: res.status, url });
    }

    return await res.json();
  } catch (err) {
    if (err instanceof WpClientError) throw err;
    if (err?.name === "AbortError") {
      throw new WpClientError(`Request timed out after ${timeout}ms`, { url, cause: err });
    }
    throw new WpClientError(err?.message || "Network request failed", { url, cause: err });
  } finally {
    clearTimeout(timer);
  }
}
