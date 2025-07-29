import Link from "next/link";
import { Container } from "../ui/container";

export function MapSection() {
  return (
    <footer className="bg-zinc-900 dark:bg-zinc-950 text-white transition-colors duration-700">
      <Container className="flex justify-between px-4 py-16 pt-20">
        <div className=" w-1/2 flex flex-col gap-8 max-w-md">
          {" "}
          <Link href="/" className="flex items-center space-x-2 group">
            <img
              src="/images/ACOB-Logo.png"
              alt="ACOB Lighting Logo"
              className="h-12 w-auto transition-transform duration-200 group-hover:scale-105"
            />
          </Link>
          <p className="text-lg dark:text-white transition-colors duration-700">ACOB provides mini grid solutions that
serve a wide range of customers which
include private households, commercial
businesses such as shops, ice makers
and mobile phone chargers, agricultural
loads such as cold storage, productive
loads such as grind mills, food
processing and wood or metal working
shops, and semi-industrials such as telecom towers.</p>
        </div>
        <div className=" w-1/2  aspect-video rounded-lg overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4042.0004937198446!2d7.418824175135592!3d9.11723979094763!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e0b1e73987599%3A0xd8a3ed0c898644c5!2sACOB%20LIGHTING%20TECHNOLOGY%20LIMITED!5e1!3m2!1sen!2sng!4v1752592656509!5m2!1sen!2sng&maptype=satellite"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </Container>
    </footer>
  );
}
