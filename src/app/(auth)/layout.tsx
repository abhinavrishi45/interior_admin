import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <div className="hidden lg:flex lg:w-1/2 relative bg-zinc-900">
        <Image
          src="/auth-bg.png"
          alt="Commercial Interior"
          fill
          className="object-cover opacity-80"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent pointer-events-none" />
        <div className="absolute inset-0 flex items-end p-12 pb-24">
          <div className="max-w-md">
            <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">
              Elevate Your Workspace
            </h1>
            <p className="text-zinc-300 text-lg">
              Manage your premium commercial interior projects with our intuitive and powerful admin dashboard.
            </p>
          </div>
        </div>
      </div>
      <div className="flex w-full lg:w-1/2 flex-col items-center justify-center p-8 sm:p-12 md:p-24 bg-background">
        <div className="w-full max-w-[400px]">
          {children}
        </div>
      </div>
    </div>
  );
}
