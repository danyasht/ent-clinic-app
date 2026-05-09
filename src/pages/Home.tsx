import Footer from '@/components/custom/Footer';
import { Button } from '@/components/ui/Button';
import { Activity, Brain, Clock, Ear, FileText, GlassWater, Headphones, Heart, Star, Stethoscope } from 'lucide-react';

const STATS_DATA = [
  {
    title: 'Happy Patients',
    value: '1000+',
    icon: <Heart size={24} strokeWidth={2} />,
  },
  {
    title: 'Years of Experience',
    value: '4+',
    icon: <Clock size={24} strokeWidth={2} />,
  },
  {
    title: 'Specialized Services',
    value: '5+',
    icon: <Stethoscope size={24} strokeWidth={2} />,
  },
  {
    title: 'Average Rating',
    value: '4.9/5',
    icon: <Star size={24} strokeWidth={2} />,
  },
];

const SERVICES_DATA = [
  {
    icon: <Stethoscope />,
    title: 'Consultation',
    desc: 'Expert medical advice for ENT issues.',
    imgUrl: '/HomePage/card-service-consultation.jpg',
  },
  {
    icon: <Activity />,
    title: 'Endoscopy',
    desc: 'Nasal cavity diagnostic procedures.',
    imgUrl: '/HomePage/card-service-endoscopy.jpg',
  },
  {
    icon: <Headphones />,
    title: 'Audiometry',
    desc: 'Comprehensive hearing tests.',
    imgUrl: '/HomePage/card-service-audiometry.jpg',
  },
  {
    icon: <GlassWater />,
    title: 'Tonsil washing',
    desc: 'Throat cleaning and hygiene.',
    imgUrl: '/HomePage/card-service-throat.jpg',
  },
  {
    icon: <Ear />,
    title: 'Earwax removal',
    desc: 'Minor non-surgical treatments.',
    imgUrl: '/HomePage/card-service-ear.jpg',
  },
];

const AI_PROS = [
  {
    title: 'Zero waiting room paperwork',

    desc: 'Skip the tedious clinic forms. Simply describe your symptoms in your own words through our secure patient portal before arriving.',

    icon: <FileText />,
  },

  {
    title: 'Highly accurate symptom structuring',

    desc: 'Our AI instantly analyzes your natural input, transforming it into a clear, structured medical summary for your doctor to review.',

    icon: <Brain />,
  },

  {
    title: 'More time for doctor-patient interaction',

    desc: 'With data already processed, doctors can focus entirely on your care, ensuring deeper and more meaningful face-to-face consultations.',

    icon: <Clock />,
  },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      <div className="relative flex min-h-[600px] flex-col justify-center bg-[url('/HomePage/hero-home-bg.jpg')] bg-cover bg-center px-[60px] py-[80px]">
        <div className="absolute inset-0 bg-linear-to-r from-emerald-900/80 to-emerald-900/70" />
        <div className="z-10 mt-auto">
          <h1 className="text-5xl font-bold text-white">Ent clinic app in your hands</h1>

          <p className="mt-4 max-w-2/3 text-lg leading-tight font-normal text-white">
            Experience seamless healthcare management. Book appointments, track your medical history, and get AI-powered
            insights for your Ear, Nose, and Throat health.
          </p>

          <div className="mt-12 flex items-center gap-4">
            <Button
              variant="default"
              className="w-fit bg-emerald-50 px-6 py-5 text-lg text-emerald-900 hover:border hover:border-emerald-50 hover:bg-emerald-900 hover:text-emerald-50"
            >
              Get started with us
            </Button>
            <Button
              variant="outline"
              className="hober:border-emerald-50 w-fit border-emerald-900 bg-emerald-900 px-6 py-5 text-lg text-emerald-50 hover:bg-emerald-50 hover:text-emerald-900"
            >
              Learn about services
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col py-[80px]">
        <div className="flex flex-col px-[60px]">
          <h2 className="text-4xl font-bold text-emerald-900">Who we are?</h2>
          <p className="mt-6 text-lg leading-tight font-normal text-emerald-900">
            We are a team of dedicated medical professionals specializing in Otolaryngology. Our clinic combines
            cutting-edge technology with compassionate care to provide the best possible outcomes for our patients. This
            patient portal is designed to make your healthcare journey as smooth as possible, giving you full control
            over your appointments and medical records.
          </p>
        </div>

        <div className="my-10 h-px bg-stone-300" />

        <section className="flex items-center justify-between px-[140px]">
          {STATS_DATA.map((stat) => (
            <div key={stat.title} className="flex flex-col items-center">
              <div className="mb-4 flex items-center gap-2">
                <span className="text-emerald-800">{stat.icon}</span>
                <p className="text-lg font-bold text-emerald-800">{stat.title}</p>
              </div>
              <p className="text-5xl font-bold text-emerald-900">{stat.value}</p>
            </div>
          ))}
        </section>

        <div className="mt-10 h-px bg-stone-300" />
      </div>

      <div id="services" className="flex flex-col px-[60px]">
        <h2 className="text-4xl font-bold text-emerald-900">Our Services</h2>
        <p className="mt-6 mb-10 text-lg leading-tight font-normal text-emerald-900">
          Explore our spectrum of services.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 pb-[80px] md:grid-cols-3 lg:grid-cols-5 xl:px-[60px]">
        {SERVICES_DATA.map((service) => (
          <div
            key={service.title}
            className="flex w-full flex-col overflow-hidden rounded-[20px] border border-stone-200 bg-white"
          >
            <div className="h-40 w-full bg-stone-100">
              <img src={service.imgUrl} alt={service.title} className="h-full w-full bg-top object-cover object-top" />
            </div>

            <div className="flex flex-1 flex-col p-6">
              <div className="mb-4 flex w-fit items-center justify-center rounded-lg border border-stone-200 p-2">
                {service.icon}
              </div>

              <div className="flex flex-1 flex-col">
                <p className="mb-2 text-lg font-bold text-emerald-900">{service.title}</p>
                <p className="text-sm leading-relaxed font-normal text-stone-600">{service.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="relative flex min-h-[600px] flex-col justify-center bg-[url('/HomePage/doctor-desktop-bg.jpg')] bg-cover bg-position-[right_250px_center] px-[60px] py-[80px]">
        <div className="absolute inset-0 bg-linear-to-l from-emerald-900/90 to-emerald-900/60" />
        <div className="z-10 mt-auto ml-auto max-w-[60%] text-right">
          <p className="text-md mb-2 font-bold text-white">Powered by AI technology</p>

          <h2 className="text-3xl font-bold text-white">Smart Symptom Analysis & AI Pre-Diagnosis</h2>

          <p className="mt-6 mb-10 text-lg leading-tight font-normal text-white">
            Forget about filling out endless paperwork in the waiting room. Describe your symptoms in your own words
            through our patient portal. Our intelligent system instantly analyzes your input and generates a structured
            medical summary for your doctor before you even step into the clinic.
          </p>

          <Button
            variant="default"
            className="w-fit bg-emerald-50 px-6 py-5 text-lg text-emerald-900 hover:border hover:border-emerald-50 hover:bg-emerald-900 hover:text-emerald-50"
          >
            Try it now
          </Button>
        </div>
      </div>

      <div className="grid gap-4 px-[60px] pt-10 pb-20 xl:grid-cols-3">
        {AI_PROS.map((pro) => (
          <div
            key={pro.title}
            className="flex min-h-[250px] flex-col items-center rounded-[20px] border border-stone-200 bg-white p-6"
          >
            <span className="rounded-[10px] border border-stone-200 p-2 text-emerald-900">{pro.icon}</span>
            <div className="my-4 h-px w-full bg-stone-200" />

            <p className="my-auto text-center text-sm leading-relaxed font-normal text-emerald-900">{pro.desc}</p>

            <div className="my-4 h-px w-full bg-stone-200" />
            <p className="text-center text-lg font-bold text-emerald-900">{pro.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
