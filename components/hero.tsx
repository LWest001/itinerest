import { baskerville } from "./ui/fonts";

export default function Header() {
  return (
    <div className="flex flex-col gap-16 items-center">
      <p className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center">
        Plan your next vacation with{" "}
        <a
          href="/"
          target="_blank"
          className={`${baskerville.className} font-bold hover:underline`}
          rel="noreferrer"
        >
          Itinerest
        </a>{" "}
      </p>
      <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
    </div>
  );
}
