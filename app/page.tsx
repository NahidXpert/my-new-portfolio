import { InView } from "@/components/core/in-view";
import ModernAnimatedHeroSection from "@/components/ui/modern-animated-hero-section";
import { projects } from "@/lib/projects";

export default function Home() {
  return (
    <main id="home" className="bg-black">
      <ModernAnimatedHeroSection />
      <section
        id="about"
        className="relative overflow-hidden border-t border-slate-800 bg-slate-950 px-6 py-24 sm:py-32"
      >
        <div className="mx-auto w-full max-w-5xl">
          <div className="grid gap-12 md:grid-cols-2 md:items-center md:gap-16">
            <div>
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.35em] text-lime-400">
                About me
              </p>
              <InView
                variants={{
                  hidden: {
                    opacity: 0,
                    transform: "translateY(100px)",
                    filter: "blur(4px)",
                  },
                  visible: {
                    opacity: 1,
                    transform: "translateY(0)",
                    filter: "blur(0px)",
                  },
                }}
                viewOptions={{ rootMargin: "0px" }}
                transition={{ duration: 1.2, ease: "ease-in-out" }}
              >
                <div className="space-y-6 text-lg leading-8 text-slate-300">
                  <p>
                    I&apos;m a final-year Computer Science and Engineering
                    student with a curiosity for how technology works and how
                    it can solve meaningful problems.
                  </p>
                  <p>
                    My interests lie in Artificial Intelligence, Machine
                    Learning, and Cybersecurity. I enjoy experimenting with new
                    technologies, building projects, and continuously
                    challenging myself to learn something new.
                  </p>
                </div>
              </InView>
            </div>
            <div>
              <InView
                variants={{
                  hidden: {
                    opacity: 0,
                    transform: "translateY(100px)",
                    filter: "blur(4px)",
                  },
                  visible: {
                    opacity: 1,
                    transform: "translateY(0)",
                    filter: "blur(0px)",
                  },
                }}
                viewOptions={{ rootMargin: "0px" }}
                transition={{ duration: 1.2, ease: "ease-in-out" }}
              >
                <video
                  className="aspect-[4/5] w-full rounded-2xl border border-slate-800 object-cover shadow-2xl shadow-lime-950/20"
                  src="/nahidnur.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  aria-label="Nahid working on a software project"
                />
              </InView>
            </div>
          </div>
        </div>
      </section>
      <section
        id="work"
        className="border-t border-slate-800 bg-black px-6 py-24 sm:py-32"
      >
        <div className="mx-auto w-full max-w-5xl">
          <div className="mb-12">
            <p className="font-mono text-xs uppercase tracking-[0.35em] text-lime-400">
              Selected work
            </p>
            <h2 className="mt-4 max-w-2xl text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Projects built with purpose.
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {projects.map((project, index) => (
              <InView
                key={project.slug}
                variants={{
                  hidden: {
                    opacity: 0,
                    transform: `translateY(${index === 0 ? 70 : 110}px)`,
                    filter: "blur(4px)",
                  },
                  visible: {
                    opacity: 1,
                    transform: "translateY(0)",
                    filter: "blur(0px)",
                  },
                }}
                viewOptions={{ rootMargin: "0px" }}
                transition={{ duration: 1.2, ease: "ease-in-out" }}
              >
                <article className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-950">
                  <img
                    src={project.image}
                    alt={`${project.title} project preview`}
                    className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-105 group-hover:brightness-50"
                  />
                  <div className="absolute inset-0 flex translate-y-4 flex-col items-center justify-center bg-black/50 p-6 text-center opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <p className="font-mono text-xs uppercase tracking-[0.25em] text-lime-400">
                      {project.eyebrow}
                    </p>
                    <h3 className="mt-3 text-3xl font-bold text-white">
                      {project.title}
                    </h3>
                    <a
                      href={`/projects/${project.slug}`}
                      className="mt-6 rounded-full bg-lime-400 px-6 py-3 text-sm font-bold text-black transition hover:bg-lime-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime-300"
                    >
                      View Details
                    </a>
                  </div>
                  <div className="p-5">
                    <p className="font-mono text-xs uppercase tracking-[0.25em] text-slate-500">
                      {project.eyebrow}
                    </p>
                    <h3 className="mt-2 text-2xl font-bold text-white">
                      {project.title}
                    </h3>
                  </div>
                </article>
              </InView>
            ))}
          </div>
        </div>
      </section>
      <section
        id="contact"
        className="border-t border-slate-800 bg-slate-950 px-6 py-24 sm:py-32"
      >
        <div className="mx-auto grid w-full max-w-5xl gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-20">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.35em] text-lime-400">
              Get in touch
            </p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Let&apos;s build something meaningful.
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              Have an idea, a project, or an opportunity in mind? Send me a
              message and I&apos;ll get back to you.
            </p>
          </div>
          <form
            action="https://formsubmit.co/309aaf2803356beb59e7a9c0c24a33fd"
            method="POST"
            className="space-y-6"
          >
            <input
              type="hidden"
              name="_subject"
              value="New portfolio contact message"
            />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_template" value="table" />
            <div className="grid gap-6 sm:grid-cols-2">
              <label className="space-y-2">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-slate-400">
                  Name
                </span>
                <input
                  type="text"
                  name="name"
                  required
                  autoComplete="name"
                  className="w-full rounded-xl border border-slate-700 bg-black px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-lime-400"
                  placeholder="Your name"
                />
              </label>
              <label className="space-y-2">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-slate-400">
                  Email
                </span>
                <input
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
                  title="Enter a valid email address, such as you@example.com"
                  className="w-full rounded-xl border border-slate-700 bg-black px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-lime-400"
                  placeholder="you@example.com"
                />
              </label>
            </div>
            <label className="block space-y-2">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-slate-400">
                Message
              </span>
              <textarea
                name="message"
                required
                rows={6}
                className="w-full resize-y rounded-xl border border-slate-700 bg-black px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-lime-400"
                placeholder="Tell me a little about your project..."
              />
            </label>
            <button
              type="submit"
              className="rounded-full bg-lime-400 px-7 py-3 text-sm font-bold text-black transition hover:bg-lime-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime-300"
            >
              Send message
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
