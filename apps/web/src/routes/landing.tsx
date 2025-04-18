import { createFileRoute } from "@tanstack/react-router";
import Benefits from "~/features/landing/_components/benefits";
import Community from "~/features/landing/_components/community";
import Contact from "~/features/landing/_components/contact";
import FAQ from "~/features/landing/_components/faq";
import Features from "~/features/landing/_components/features";
import Footer from "~/features/landing/_components/footer";
import Hero from "~/features/landing/_components/hero";
import HowItWorks from "~/features/landing/_components/how-it-works";
import Navbar from "~/features/landing/_components/navbar";
import Pricing from "~/features/landing/_components/pricing";
import Services from "~/features/landing/_components/services";
import Sponsors from "~/features/landing/_components/sponsors";
import Team from "~/features/landing/_components/team";
import Testimonials from "~/features/landing/_components/testimonials";

export const Route = createFileRoute("/landing")({
  component: RouteComponent,
  loader: async ({ context }) => {
    return { user: context.session?.user };
  },
});

function RouteComponent() {
  const { user } = Route.useLoaderData();

  return (
    <>
      <Navbar user={user ?? undefined} />
      <Hero />
      <Sponsors />
      <Benefits />
      <Features />
      <Services />
      <HowItWorks />
      <Testimonials />
      <Team />
      <Community />
      <Pricing />
      <Contact />
      <FAQ />
      <Footer />
    </>
  );
}
