const COLUMNS = [
  {
    head: "About",
    links: [
      ["Our Story", "/our-story"],
      ["Our Crew", "/our-crew"],
      ["Newsroom", "/newsroom"],
      ["Events", "/events"],
      ["Partners", "/partner"],
    ],
  },
  {
    head: "Compare",
    links: [
      ["Forcepoint", "/vs/forcepoint"],
      ["Zscaler", "/vs/zscaler"],
      ["Cisco Umbrella", "/vs/cisco-umbrella"],
      ["Netskope", "/vs/netskope"],
      ["Testimonials", "/testimonials"],
    ],
  },
  {
    head: "Documentation",
    links: [
      ["Support", "mailto:support@dope.security"],
      ["User Manual", "https://inflight.dope.security"],
    ],
  },
] as const;

const SOCIALS = [
  ["Twitter", "https://twitter.com/dopesecurity"],
  ["Instagram", "https://instagram.com/dope.security"],
  ["LinkedIn", "http://www.linkedin.com/company/dopesecurity"],
  ["Youtube", "https://www.youtube.com/channel/UCDhraTNTxxJxUGLEiBInXFg"],
] as const;

const LEGAL = [
  ["EULA", "/legal/eula"],
  ["Privacy", "/legal/privacy-policy"],
  ["Legal", "/legal/eula"],
] as const;

export default function Footer() {
  return (
    <footer className="foot">
      <span className="foot__decor">[ DOPE.FOOTER ]</span>

      <div className="foot__grid">
        <div>
          <h2 className="foot__logo">
            <span>DOPE</span>
            <span>SECURITY</span>
          </h2>
          <p className="foot__blurb">
            It&rsquo;s not that we&rsquo;re mad at yesterday&rsquo;s
            cybersecurity. Just disappointed. So we made it better. We made it
            easier.
          </p>
          <p className="foot__blurb">
            <b>We made it dope.</b>
          </p>
          <div className="foot__contact">
            <a href="mailto:sales@dope.security">sales@dope.security</a>
            <a href="tel:+14152355100">Call Us</a>
          </div>
        </div>

        <div className="foot__cols">
          {COLUMNS.map((col) => (
            <div className="foot__col" key={col.head}>
              <h3 className="foot__colhead">{col.head}</h3>
              {col.links.map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  {...(href.startsWith("http")
                    ? { target: "_blank", rel: "noopener" }
                    : {})}
                >
                  {label}
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="foot__bottom">
        <span>© 2026 dope.security Inc.</span>
        <span className="foot__made">
          Made with
          <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
            <path d="M0 5.629v-.157C0 3.285 1.563 1.41 3.719 1.066 5.125.816 6.594 1.285 7.625 2.316L8 2.66l.344-.344C9.375 1.285 10.844.816 12.25 1.066 14.406 1.41 16 3.285 16 5.472v.157c0 1.312-.563 2.562-1.5 3.437L8.844 14.347A1.09 1.09 0 0 1 8 14.66c-.344 0-.656-.094-.875-.313L1.469 9.066A4.72 4.72 0 0 1 0 5.629Z" />
          </svg>
          in California
        </span>
        <div className="foot__socials">
          {SOCIALS.map(([label, href]) => (
            <a key={label} href={href} target="_blank" rel="noopener">
              {label} ↗
            </a>
          ))}
        </div>
        <div className="foot__legal">
          {LEGAL.map(([label, href]) => (
            <a key={label} href={href}>
              {label}
            </a>
          ))}
        </div>
        <img className="foot__soc" src="/media/soc2.svg" alt="SOC 2 Type 2" />
      </div>
    </footer>
  );
}
