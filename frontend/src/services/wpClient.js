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

  if (process.env.NODE_ENV === "development") {
    console.log("[wpFetch:start]", { url, method: fetchOptions.method || "GET" });
  }

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

    const contentType = res.headers.get("content-type") || "";

    if (!res.ok) {
      let bodyPreview = "";
      try {
        bodyPreview = (await res.clone().text()).slice(0, 400);
      } catch {
        bodyPreview = "";
      }
      if (process.env.NODE_ENV === "development") {
        console.warn("[wpFetch:non-ok]", { url, status: res.status, contentType, bodyPreview });
      }
      throw new WpClientError(`HTTP ${res.status} ${res.statusText}`.trim(), {
        status: res.status,
        url,
      });
    }

    let json;
    try {
      json = await res.json();
    } catch (parseErr) {
      if (process.env.NODE_ENV === "development") {
        console.warn("[wpFetch:json-parse-fail]", { url, contentType, error: parseErr?.message || parseErr });
      }
      throw new WpClientError("Invalid JSON response", { status: res.status, url, cause: parseErr });
    }

    if (process.env.NODE_ENV === "development") {
      console.log("[wpFetch:ok]", { url, status: res.status, contentType, jsonParse: "ok" });
      if (contentType && !contentType.includes("json")) {
        console.warn("[wpFetch:content-type]", { url, contentType, note: "JSON parsed despite non-json content-type" });
      }
    }

    if (options.includeHeaders) {
      return {
        data: json,
        headers: {
          total: res.headers.get("X-WP-Total"),
          totalPages: res.headers.get("X-WP-TotalPages"),
        },
      };
    }

    return json;
  } catch (err) {
    if (process.env.NODE_ENV === "development" && !(err instanceof WpClientError)) {
      console.warn("[wpFetch:error]", { url, error: err?.message || err });
    }
    if (err instanceof WpClientError) throw err;
    if (err?.name === "AbortError") {
      throw new WpClientError(`Request timed out after ${timeout}ms`, { url, cause: err });
    }
    throw new WpClientError(err?.message || "Network request failed", { url, cause: err });
  } finally {
    clearTimeout(timer);
  }
}
