export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <p className="site-footer-copy">
          &copy; {new Date().getFullYear()} Berry Blom
        </p>
        <nav className="site-footer-links" aria-label="Footer">
          <a href="/about">About</a>
          <a
            href="https://linkedin.com/in/berry-blom"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/berryxmas"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a href="mailto:hello@berryblom.com">Email</a>
          <a href="/feed.xml">RSS</a>
        </nav>
      </div>
    </footer>
  );
}
