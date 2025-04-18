import { ChevronsDown } from "lucide-react";
import { Separator } from "~/components/ui/separator";

const Footer = () => {
  return (
    <footer id="footer" className="container py-24 pb-16 sm:py-32 sm:pb-24">
      <div className="bg-muted/50 dark:bg-card rounded-2xl border p-10">
        <div className="grid grid-cols-2 gap-x-12 gap-y-8 md:grid-cols-4 xl:grid-cols-6">
          <div className="col-span-full xl:col-span-2">
            <a href="#" className="flex items-center font-bold">
              <ChevronsDown className="from-primary via-primary/70 to-primary mr-2 h-9 w-9 rounded-lg border bg-linear-to-tr text-white" />

              <h3 className="text-2xl">Shadcn-React</h3>
            </a>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-bold">Contact</h3>
            <div>
              <a href="#" className="opacity-60 hover:opacity-100">
                Github
              </a>
            </div>

            <div>
              <a href="#" className="opacity-60 hover:opacity-100">
                Twitter
              </a>
            </div>

            <div>
              <a href="#" className="opacity-60 hover:opacity-100">
                Instagram
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-bold">Platforms</h3>
            <div>
              <a href="#" className="opacity-60 hover:opacity-100">
                iOS
              </a>
            </div>

            <div>
              <a href="#" className="opacity-60 hover:opacity-100">
                Android
              </a>
            </div>

            <div>
              <a href="#" className="opacity-60 hover:opacity-100">
                Web
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-bold">Help</h3>
            <div>
              <a href="#" className="opacity-60 hover:opacity-100">
                Contact Us
              </a>
            </div>

            <div>
              <a href="#" className="opacity-60 hover:opacity-100">
                FAQ
              </a>
            </div>

            <div>
              <a href="#" className="opacity-60 hover:opacity-100">
                Feedback
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-bold">Socials</h3>
            <div>
              <a href="#" className="opacity-60 hover:opacity-100">
                Twitch
              </a>
            </div>

            <div>
              <a href="#" className="opacity-60 hover:opacity-100">
                Discord
              </a>
            </div>

            <div>
              <a href="#" className="opacity-60 hover:opacity-100">
                Dribbble
              </a>
            </div>
          </div>
        </div>

        <Separator className="my-6" />
        <section>
          <h3>
            &copy; 2024 Designed and developed by
            <a
              target="_blank"
              href="https://github.com/leoMirandaa"
              className="text-primary border-primary transition-all hover:border-b-2"
            >
              Leo Miranda
            </a>
          </h3>
        </section>
      </div>
    </footer>
  );
};

export default Footer;
