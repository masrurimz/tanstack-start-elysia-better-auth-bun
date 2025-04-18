import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";

interface FAQProps {
  question: string;
  answer: string;
  value: string;
}

const FAQList: FAQProps[] = [
  {
    question: "Is this template free?",
    answer: "Yes. It is a free Shadcn/React template.",
    value: "item-1",
  },
  {
    question: "Duis aute irure dolor in reprehenderit in voluptate velit?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint labore quidem quam consectetur sapiente, iste rerum reiciendis animi nihil nostrum sit quo, modi quod.",
    value: "item-2",
  },
  {
    question: "Lorem ipsum dolor sit amet Consectetur natus dolor minus quibusdam?",
    answer:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore qui nostrum reiciendis veritatis.",
    value: "item-3",
  },
  {
    question: "Excepteur sint occaecat cupidata non proident sunt?",
    answer: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
    value: "item-4",
  },
  {
    question: "Enim ad minim veniam, quis nostrud exercitation ullamco laboris?",
    answer: "consectetur adipisicing elit. Sint labore.",
    value: "item-5",
  },
];

const FAQ = () => {
  return (
    <section id="faq" className="container py-24 sm:py-32 md:w-[700px]">
      <div className="mb-8 text-center">
        <h2 className="text-primary mb-2 text-center text-lg tracking-wider">FAQS</h2>

        <h2 className="text-center text-3xl font-bold md:text-4xl">Common Questions</h2>
      </div>

      <Accordion type="single" collapsible className="AccordionRoot">
        {FAQList.map(({ question, answer, value }) => (
          <AccordionItem key={value} value={value}>
            <AccordionTrigger className="text-left">{question}</AccordionTrigger>
            <AccordionContent>{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <h3 className="mt-4 font-medium">
        Still have questions?
        <a href="#" className="text-muted-foreground">
          <a href="#" className="underline">
            Contact us
          </a>
        </a>
      </h3>
    </section>
  );
};

export default FAQ;
