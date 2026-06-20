import { FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa";
import { Mail, Phone, MapPin } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { TeamPhoto } from "@/components/ui/TeamPhoto";
import { navLinks, siteConfig, services, teamMembers } from "@/lib/content";

const socialLinks = [
  { Icon: FaInstagram, href: siteConfig.social.instagram, label: "Instagram" },
  { Icon: FaFacebook, href: siteConfig.social.facebook, label: "Facebook" },
  { Icon: FaYoutube, href: siteConfig.social.youtube, label: "YouTube" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-line bg-bg-card/40">
      <div className="container-px mx-auto max-w-content py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.1fr]">
          {/* Brand column */}
          <div className="max-w-sm">
            <Logo size={44} showTagline />
            <p className="mt-5 text-sm leading-relaxed text-ink-muted">
              Helping businesses and personal brands grow through powerful
              visuals &amp; strategy.
            </p>
            <div className="mt-6 flex gap-3">
              {socialLinks.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-white transition-colors hover:border-accent/40 hover:text-accent"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <p className="font-display text-sm font-semibold text-white">
              Quick Links
            </p>
            <ul className="mt-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-ink-muted transition-colors hover:text-accent"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <p className="font-display text-sm font-semibold text-white">
              Our Services
            </p>
            <ul className="mt-4 flex flex-col gap-3">
              {services.map((service) => (
                <li key={service.title}>
                  <a
                    href="#services"
                    className="text-sm text-ink-muted transition-colors hover:text-accent"
                  >
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <p className="font-display text-sm font-semibold text-white">
              Contact Info
            </p>
            <ul className="mt-4 flex flex-col gap-3">
              <li className="flex items-start gap-2.5 text-sm text-ink-muted">
                <Mail size={15} className="mt-0.5 shrink-0 text-accent" />
                <a href={`mailto:${siteConfig.email}`} className="hover:text-accent">
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-ink-muted">
                <Phone size={15} className="mt-0.5 shrink-0 text-accent" />
                <span>+44 123 456 7890</span>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-ink-muted">
                <MapPin size={15} className="mt-0.5 shrink-0 text-accent" />
                <span>{siteConfig.business.country}</span>
              </li>
            </ul>

            <a
              href="#booking"
              className="mt-5 inline-flex items-center justify-center rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:border-accent/40 hover:bg-white/[0.04]"
            >
              Book Free Call
            </a>

            {/* Mini team avatar grid, echoes the reference's footer collage */}
            <div className="mt-6 grid grid-cols-4 gap-1.5">
              {teamMembers.map((member) => (
                <div
                  key={member.name}
                  className="relative aspect-square overflow-hidden rounded-md border border-line"
                >
                  <TeamPhoto src={member.image} alt={member.name} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-line pt-8 sm:flex-row">
          <p className="text-xs text-ink-faint">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-ink-faint transition-colors hover:text-accent">
              Privacy Policy
            </a>
            <a href="#" className="text-xs text-ink-faint transition-colors hover:text-accent">
              Terms &amp; Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
