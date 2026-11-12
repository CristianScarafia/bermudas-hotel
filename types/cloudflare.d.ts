// Optional because this website does not require a database binding.
declare namespace Cloudflare {
  interface Env {
    DB?: D1Database;
  }
}
