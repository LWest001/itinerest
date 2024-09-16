import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import Hero from "@/components/hero";

export default async function Index() {
  return (
    <>
      <Hero />
    </>
  );
}
