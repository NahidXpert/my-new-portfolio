import { InView } from "@/components/core/in-view";
import ModernAnimatedHeroSection from "@/components/ui/modern-animated-hero-section";

export default function Home() {
  return (
    <main className="bg-black">
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
    </main>
  );
}
