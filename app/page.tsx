import { AuthButton } from "@/components/auth-button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Suspense } from "react";
import { EmptyOutline } from "./components/emptyFile";
import { UploadFileComponent } from "./components/uploadFileComponent";
import Footer from "./components/footer";
import { Navbar } from "./components/navbar";

export default async function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col gap-20 items-center justify-center">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-5xl flex justify-end items-center p-3 px-5 text-sm">
            <Suspense fallback={<p>Загрузка авторизации...</p>}>
              <Navbar />
            </Suspense>
          </div>
        </nav>
        <div className="flex-1 flex flex-col gap-20 max-w-5xl p-5 w-full">
          <section className="text-center">
            <h1 className="text-4xl font-bold mb-4">
              Скачивай файлы где тебе нужжно!
            </h1>
            <p className="text-lg mb-8">
              Загружайте свои файлы с любого устройства и получайте к ним легкий доступ через простую ссылку, на вашем ПК или телефоне.
            </p>
            <p className="text-md">
              Начните сегодня и оцените удобство обмена файлами и доступа к ним.
            </p>
            <div className="flex flex-col items-center justify-start gap-10 mt-16">
              <Suspense fallback={<p>Загрузка файлов...</p>}>
                <UploadFileComponent />
              </Suspense>
            </div>
          </section>
        </div>

        <Footer />
      </div>
    </main>
  );
}
