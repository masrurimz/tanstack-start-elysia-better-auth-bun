import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";

// Custom CSS for animations
const customStyles = `
@keyframes img-shadow-animation {
  from {
    opacity: 0.5;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0px);
  }
}

.img-shadow-animation {
  animation-name: img-shadow-animation;
  animation-iteration-count: infinite;
  animation-duration: 2s;
  animation-timing-function: linear;
  animation-direction: alternate;
}

.img-border-animation {
  animation: img-border-pulse 2s infinite alternate linear;
}

@keyframes img-border-pulse {
  from {
    border-top-color: rgba(124, 58, 237, 0.1);
  }
  to {
    border-top-color: rgba(124, 58, 237, 0.6);
  }
}
`;

const Hero = () => {
  const [mode, setMode] = useState("dark");

  useEffect(() => {
    // Check theme on component mount
    const isDarkMode = document.documentElement.classList.contains("dark");
    setMode(isDarkMode ? "dark" : "light");

    // Create observer to detect theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          const isDarkMode = document.documentElement.classList.contains("dark");
          setMode(isDarkMode ? "dark" : "light");
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });

    // Cleanup
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />
      <section className="container">
        <div className="grid gap-8 place-items-center py-20 mx-auto md:py-32 lg:max-w-screen-xl">
          <div className="space-y-8 text-center">
            <Badge variant="outline" className="py-2 text-sm">
              <span className="mr-2 text-primary">
                <Badge>New</Badge>
              </span>
              <span> Design is out now! </span>
            </Badge>

            <div className="mx-auto max-w-screen-md text-5xl font-bold text-center md:text-6xl">
              <h1>
                Experience the
                <span className="to-primary bg-gradient-to-r from-[#D247BF] bg-clip-text text-transparent">
                  {" "}
                  ShadcnTanStart
                </span>{" "}
                landing page
              </h1>
            </div>

            <p className="mx-auto max-w-screen-sm text-xl text-muted-foreground">
              We're more than just a tool, we're a community of passionate creators. Get
              access to exclusive resources, tutorials, and support.
            </p>

            <div className="space-y-4 md:space-y-0 md:space-x-4">
              <Button className="w-5/6 font-bold group md:w-1/4">
                Get Started
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>

              <Button asChild variant="secondary" className="w-5/6 font-bold md:w-1/4">
                <a href="https://github.com/shadcn-ui/ui" target="_blank">
                  Github repository
                </a>
              </Button>
            </div>
          </div>

          <div className="relative mt-14 group">
            {/* gradient shadow */}
            <div className="bg-primary/50 img-shadow-animation absolute -top-6 right-12 h-12 w-[90%] rounded-full blur-3xl lg:h-[80%]"></div>

            <img
              className="border-t-primary/30 img-border-animation relative mx-auto w-full rounded-lg border border-t-2 md:w-[1200px]"
              src={mode === "light" ? "/hero-image-light.jpg" : "/hero-image-dark.jpg"}
              alt="dashboard using shadcn components"
            />

            {/* gradient effect img */}
            <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-b rounded-lg from-background/0 via-background/50 to-background md:h-28"></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
