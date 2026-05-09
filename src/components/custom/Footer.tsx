export default function Footer() {
  return (
    <footer className="bg-emerald-900 px-[60px] pt-20 pb-5 text-emerald-50">
      <div className="grid xl:grid-cols-3">
        <div className="flex flex-col gap-4">
          <span className="text-2xl font-bold text-white">ENT Clinic App</span>

          <p className="max-w-sm text-sm leading-relaxed font-normal text-stone-200">
            Modern, AI-powered Ear, Nose, and Throat healthcare. Making your medical journey seamless and secure.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <span className="text-lg font-bold text-white">Quick Links</span>
          <ul className="flex flex-col gap-2 text-sm text-emerald-200">
            <li className="text-stone-300">
              <a href="/login" className="transition-colors hover:text-white hover:underline">
                Patient Portal Login
              </a>
            </li>
            <li className="text-stone-300">
              <a href="#" className="transition-colors hover:text-white hover:underline">
                Doctor Dashboard
              </a>
            </li>
            <li className="text-stone-300">
              <a href="#services" className="transition-colors hover:text-white hover:underline">
                Our Services
              </a>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <span className="text-lg font-bold text-white">Contact Us</span>
          <ul className="flex flex-col gap-2 text-sm text-emerald-200">
            <li className="text-stone-300">123 Health Avenue, Medical District</li>
            <li className="text-stone-300">+1 (555) 123-4567</li>
            <li className="text-stone-300">support@entclinic.com</li>
          </ul>
        </div>
      </div>

      <div className="my-8 h-px bg-stone-300" />

      <div className="text-center text-sm text-stone-400">
        &copy; {new Date().getFullYear()} ENT Clinic App. All rights reserved.
      </div>
    </footer>
  );
}
