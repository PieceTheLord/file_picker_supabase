import { AuthButton } from "@/components/auth-button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Suspense } from "react";
import { EmptyOutline } from "./components/emptyFile";
import { UploadFileComponent } from "./components/uploadFileComponent";

export default async function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col gap-20 items-center justify-center">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-5xl flex justify-end items-center p-3 px-5 text-sm">
            <Suspense fallback={<p>Loading Auth...</p>}>
              <AuthButton />
            </Suspense>
          </div>
        </nav>
        <div className="flex-1 flex flex-col gap-20 max-w-5xl p-5 w-full">
          <section className="text-center">
            <h1 className="text-4xl font-bold mb-4">
              Welcome our dear friend!
            </h1>
            <p className="text-lg mb-8">
              Upload your files from any device and access them easily through a
              simple link in your browser.
            </p>
            <p className="text-md">
              Get started today and experience seamless file sharing and access.
            </p>
            <div className="flex flex-col items-center justify-start gap-10 mt-16">
              <Suspense fallback={<p>Loading files...</p>}>
                <UploadFileComponent />
              </Suspense>
            </div>
          </section>
        </div>

        <footer className="w-full flex flex-col items-center justify-center border-t mx-auto text-center text-xs py-16">
          <div className="flex items-center">
            <p className="text-[14px] font-thin">Chose your theme:</p>
            <ThemeSwitcher />
          </div>
          <p className="text-[14px] font-thin">ИНН(INN) - 312823638291</p>
        </footer>
      </div>
    </main>
  );
}
