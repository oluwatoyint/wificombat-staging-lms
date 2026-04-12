import HeadingDesign from "../general/HeaderDesign"


export const MessageUs = () => {
    return (
        <>
        <HeadingDesign heading="MESSAGE US"/>
        <div className="flex items-center justify-center min-h-screen py-10 md:py-14 lg:py-20 bg-gre">
      <div className="mt-16">
       <div>
      <form className="space-y-6">
        <>
          <div className="flex-col lg:flex  lg:flex-row lg:gap-x-8">
            <div className="w-full mt-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Your name
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  type="email"
                  placeholder="your name"
                  className="block outline-none lg:w-72 rounded-md border border-gray-600 py-2 px-2 shadow-sm ring-1 
                  ring-inset ring-gray-300 placeholder:text-gray-700 focus:ring-2 focus:ring-inset 
                  focus:ring-purple-600 sm:text-sm sm:leading-6 w-[300px] "
                />
              </div>
            </div>

            <div  className="w-full mt-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email Address
              </label>
              <div className="mt-2 relative">
                <input
                  placeholder="email address"
                  className="block outline-none lg:w-72 rounded-md border border-gray-600 py-2 px-2 shadow-sm ring-1 
                  ring-inset ring-gray-300 placeholder:text-gray-700 focus:ring-2 focus:ring-inset 
                  focus:ring-purple-600 sm:text-sm sm:leading-6 w-[300px]"
                />
              </div>
            </div>

            <div className="w-full mt-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Phone Number (optional)
              </label>
              <div className="mt-2 relative">
                <input
                  placeholder="Mobile number"
                  type="number"
                  className="block outline-none lg:w-80 rounded-md border border-gray-600 py-2 px-2 shadow-sm ring-1 
                  ring-inset ring-gray-300 placeholder:text-gray-700 focus:ring-2 focus:ring-inset 
                  focus:ring-purple-600 sm:text-sm sm:leading-6 w-[300px]"
                />
              </div>
            </div>
          </div>
          <div className="mt-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
            Your Message
            </label>
            <div className="mt-2 relative">
              <input
                className="block outline-none lg:w-[1000px] rounded-md border border-gray-600 lg:py-8 lg:px-8 shadow-sm ring-1 
                ring-inset ring-gray-300 placeholder:text-gray-700 placeholder:text-base focus:ring-2 focus:ring-inset 
                focus:ring-purple-600 sm:text-sm sm:leading-6 w-[300px] py-4 px-4"
              />
            </div>
          </div>

          <div className="mt-14">
            <button
              type="submit"
              className="bg-black text-white p-3 rounded"
            >
              Leave us a message
            </button>
          </div>
        </>
      </form>
    </div>
  </div>
</div>

       </>
    )
}