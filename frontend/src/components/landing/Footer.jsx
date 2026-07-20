import {
  Facebook,
  Linkedin,
  Instagram,
  Github,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const services = [
  "Artificial Intelligence",
  "Web Development",
  "Mobile Apps",
  "Cloud Solutions",
  "Cyber Security",
];

const company = [
  "About",
  "Services",
  "Technologies",
  "Careers",
  "Contact",
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#020617] text-white">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-4">

          {/* Company */}

          <div>
            <h2 className="text-3xl font-black">
              VAIVO
              <span className="text-cyan-400">AI</span>
            </h2>

            <p className="mt-6 leading-8 text-gray-400">
              Building intelligent software solutions with Artificial
              Intelligence, Cloud Computing, Enterprise Applications and Digital
              Transformation.
            </p>

            <div className="mt-8 flex gap-4">

              <a
                href="#"
                className="rounded-xl border border-white/10 p-3 transition hover:border-cyan-400 hover:bg-cyan-500/10"
              >
                <Facebook size={20} />
              </a>

              <a
                href="#"
                className="rounded-xl border border-white/10 p-3 transition hover:border-cyan-400 hover:bg-cyan-500/10"
              >
                <Linkedin size={20} />
              </a>

              <a
                href="#"
                className="rounded-xl border border-white/10 p-3 transition hover:border-cyan-400 hover:bg-cyan-500/10"
              >
                <Instagram size={20} />
              </a>

              <a
                href="#"
                className="rounded-xl border border-white/10 p-3 transition hover:border-cyan-400 hover:bg-cyan-500/10"
              >
                <Github size={20} />
              </a>

            </div>
          </div>

          {/* Services */}

          <div>

            <h3 className="text-xl font-bold">
              Services
            </h3>

            <div className="mt-6 space-y-4">

              {services.map((item) => (

                <a
                  key={item}
                  href="#"
                  className="block text-gray-400 transition hover:text-cyan-400"
                >
                  {item}
                </a>

              ))}

            </div>

          </div>

          {/* Company */}

          <div>

            <h3 className="text-xl font-bold">
              Company
            </h3>

            <div className="mt-6 space-y-4">

              {company.map((item) => (

                <a
                  key={item}
                  href="#"
                  className="block text-gray-400 transition hover:text-cyan-400"
                >
                  {item}
                </a>

              ))}

            </div>

          </div>

          {/* Contact */}

          <div>

            <h3 className="text-xl font-bold">
              Contact
            </h3>

            <div className="mt-6 space-y-5">

              <div className="flex items-center gap-3">
                <Mail className="text-cyan-400" size={20} />
                <span className="text-gray-400">
                  contact@vaivoai.com
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="text-cyan-400" size={20} />
                <span className="text-gray-400">
                  +91 98765 43210
                </span>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="mt-1 text-cyan-400" size={20} />
                <span className="text-gray-400">
                  Bangalore, Karnataka, India
                </span>
              </div>

            </div>

          </div>

        </div>

        {/* Bottom */}

        <div className="mt-20 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 md:flex-row">

          <p className="text-gray-500">
            © {new Date().getFullYear()} VAIVOAI Technologies Pvt. Ltd.
            All Rights Reserved.
          </p>

          <div className="flex gap-8">

            <a
              href="#"
              className="text-gray-500 transition hover:text-cyan-400"
            >
              Privacy Policy
            </a>

            <a
              href="#"
              className="text-gray-500 transition hover:text-cyan-400"
            >
              Terms of Service
            </a>

          </div>

        </div>

      </div>
    </footer>
  );
}