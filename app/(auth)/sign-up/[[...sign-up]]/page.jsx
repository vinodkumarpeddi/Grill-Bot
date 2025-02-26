import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return(
    <section className="bg-gradient-to-br from-orange-500 via-pink-500 to-red-600">

      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt=""
            src="/page.jpeg"
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />

          <div className="hidden lg:relative lg:block lg:p-12">
          <a href="/" className="block">
  <span className="sr-only">AI Mock Interviews Home</span>
  <img 
    src="/logo.svg" 
    alt="AI Mock Interviews Logo" 
    className="h-10 sm:h-12 w-auto object-contain"
  />
</a>

            <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              Join AI-Powered Mock Interviews 
            </h2>

            <p className="mt-4 leading-relaxed text-white/90">
              Experience real-time AI-driven mock interviews to prepare for your dream job!
            </p>
          </div>
        </section>

        <main
          className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
        >
          <div className="max-w-xl lg:max-w-3xl">
            <div className="relative -mt-16 block lg:hidden">
            <a
  className="inline-flex items-center justify-center rounded-full bg-white text-blue-600 size-16 sm:size-20 p-2 shadow-md hover:shadow-lg transition-all duration-300"
  href="#"
>
  <span className="sr-only">Home</span>
  <img 
    src="/logo.svg"  
    alt="AI Mock Interviews Logo" 
    className="h-10 sm:h-16 w-auto object-contain"
  />
</a>


              <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                Get Ready for Success with AI Interviews 
              </h1>

              <p className="mt-4 leading-relaxed text-gray-500">
                Practice with AI-based interview simulations and boost your confidence.
              </p>
            </div>

            <SignUp />
          </div>
        </main>
      </div>
    </section>
  )
}
