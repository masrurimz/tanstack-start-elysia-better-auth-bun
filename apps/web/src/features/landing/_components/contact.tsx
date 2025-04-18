import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Textarea } from "~/components/ui/textarea";

import { AlertCircle, Building2, Clock, Mail, Phone } from "lucide-react";

interface ContactFormProps {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}

const Contact = () => {
  const [contactForm, setContactForm] = useState<ContactFormProps>({
    firstName: "",
    lastName: "",
    email: "",
    subject: "Web Development",
    message: "",
  });

  const [invalidInputForm, setInvalidInputForm] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic form validation
    if (
      !contactForm.firstName ||
      !contactForm.lastName ||
      !contactForm.email ||
      !contactForm.message
    ) {
      setInvalidInputForm(true);
      return;
    }

    setInvalidInputForm(false);
    const { firstName, lastName, email, subject, message } = contactForm;
    console.log(contactForm);

    const mailToLink = `mailto:leomirandadev@gmail.com?subject=${subject}&body=Hello I am ${firstName} ${lastName}, my Email is ${email}. %0D%0A${message}`;

    window.location.href = mailToLink;
  };

  const handleChange = (field: keyof ContactFormProps, value: string) => {
    setContactForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error message when user starts typing
    if (invalidInputForm) {
      setInvalidInputForm(false);
    }
  };

  return (
    <section id="contact" className="container py-24 sm:py-32">
      <section className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div>
          <div className="mb-4">
            <h2 className="mb-2 text-lg tracking-wider text-primary">Contact</h2>

            <h2 className="text-3xl font-bold md:text-4xl">Connect With Us</h2>
          </div>
          <p className="mb-8 text-muted-foreground lg:w-5/6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum ipsam sint
            enim exercitationem ex autem corrupti quas tenetur
          </p>

          <div className="flex flex-col gap-4">
            <div>
              <div className="flex gap-2 mb-1">
                <Building2 />
                <div className="font-bold">Find Us</div>
              </div>

              <div>742 Evergreen Terrace, Springfield, IL 62704</div>
            </div>

            <div>
              <div className="flex gap-2 mb-1">
                <Phone />
                <div className="font-bold">Call Us</div>
              </div>

              <div>+1 (619) 123-4567</div>
            </div>

            <div>
              <div className="flex gap-2 mb-1">
                <Mail />
                <div className="font-bold">Mail Us</div>
              </div>

              <div>leomirandadev@gmail.com</div>
            </div>

            <div>
              <div className="flex gap-2">
                <Clock />
                <div className="font-bold">Visit Us</div>
              </div>

              <div>
                <div>Monday - Friday</div>
                <div>8AM - 4PM</div>
              </div>
            </div>
          </div>
        </div>

        {/* form */}
        <Card className="bg-muted/60 dark:bg-card">
          <CardHeader className="text-2xl text-primary"></CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid gap-4">
              <div className="flex flex-col gap-8 md:flex-row">
                <div className="flex w-full flex-col gap-1.5">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input
                    id="first-name"
                    type="text"
                    placeholder="Leopoldo"
                    value={contactForm.firstName}
                    onChange={(e) => handleChange("firstName", e.target.value)}
                  />
                </div>

                <div className="flex w-full flex-col gap-1.5">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input
                    id="last-name"
                    type="text"
                    placeholder="Miranda"
                    value={contactForm.lastName}
                    onChange={(e) => handleChange("lastName", e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="leomirandadev@gmail.com"
                  value={contactForm.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="subject">Subject</Label>

                <Select
                  value={contactForm.subject}
                  onValueChange={(value) => handleChange("subject", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Web Development">Web Development</SelectItem>
                      <SelectItem value="Mobile Development">
                        Mobile Development
                      </SelectItem>
                      <SelectItem value="Figma Design"> Figma Design </SelectItem>
                      <SelectItem value="REST API "> REST API </SelectItem>
                      <SelectItem value="FullStack Project">FullStack Project</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Your message..."
                  rows={5}
                  value={contactForm.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                />
              </div>

              {invalidInputForm && (
                <Alert variant="destructive">
                  <AlertCircle className="w-4 h-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>
                    There is an error in the form. Please check your input.
                  </AlertDescription>
                </Alert>
              )}

              <Button className="mt-4">Send message</Button>
            </form>
          </CardContent>

          <CardFooter></CardFooter>
        </Card>
      </section>
    </section>
  );
};

export default Contact;
