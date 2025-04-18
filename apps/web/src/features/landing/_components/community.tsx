import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

import { Button } from "~/components/ui/button";

// Discord icon component
const DiscordIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="80"
      height="80"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="m-auto mb-4 w-20 h-20"
    >
      <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.39-.444.883-.608 1.283c-1.85-.28-3.688-.28-5.5 0c-.16-.4-.4-.895-.608-1.283a.077.077 0 0 0-.079-.036c-1.714.29-3.354.8-4.885 1.491a.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055a20.03 20.03 0 0 0 6.031 3.056a.078.078 0 0 0 .085-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106c-.653-.25-1.28-.55-1.878-.892a.077.077 0 0 1-.008-.127c.126-.094.252-.19.372-.288a.074.074 0 0 1 .077-.01c3.927 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.193.373.288a.077.077 0 0 1-.006.127c-.598.342-1.225.642-1.88.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .085.028a19.963 19.963 0 0 0 6.032-3.056a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
};

const Community = () => {
  return (
    <section id="community" className="py-12">
      <hr />
      <div className="container py-20 sm:py-20">
        <div className="mx-auto lg:w-[60%]">
          <Card className="flex flex-col justify-center items-center text-center border-0 shadow-none bg-background">
            <CardHeader>
              <CardTitle className="text-4xl font-bold md:text-5xl">
                <DiscordIcon />
                Ready to join this
                <span className="to-primary bg-linear-to-r from-[#D247BF] bg-clip-text text-transparent">
                  {" Community?"}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground text-xl lg:w-[80%]">
              Join our vibrant Discord community! Connect, share, and grow with
              like-minded enthusiasts. Click to dive in! 🚀
            </CardContent>

            <CardFooter>
              <Button asChild>
                <a href="https://discord.com/" target="_blank">
                  Join Discord
                </a>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      <hr />
    </section>
  );
};

export default Community;
