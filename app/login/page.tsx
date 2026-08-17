import { Suspense } from "react";
import { redirect } from "next/navigation";
import PageHead from "@/components/site/page-head";
import { getSession } from "@/lib/auth-session";
import LoginForm from "./login-form";

export const metadata = { title: "Member Login" };

export default async function LoginPage({
  searchParams
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const session = await getSession();
  if (session) {
    const { next } = await searchParams;
    redirect(next || "/");
  }

  return (
    <div className="page on page-in">
      <PageHead
        crumb="Member Login"
        title={<>Sign in to your<br />ABTO member account</>}
        intro="Use the email and password you set when you applied for membership."
      />
      <section className="pad-s">
        <div className="wrap">
          <Suspense>
            <LoginForm />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
