import React from "react";

const Home: React.FC = () => {
  return (
    <div className="bg-gray-100">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto flex justify-between lg:flex-row items-center px-4">
          {/* Hero Content */}
          <div className="lg:w-1/2">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Organize Your Tasks Like Never Before
            </h1>
            <p className="text-lg mb-6">
              Boost your productivity with our intuitive and powerful task
              management application. Stay organized, meet your deadlines, and
              achieve your goals effortlessly.
            </p>
            <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-gray-200 transition">
              Get Started
            </button>
          </div>
          {/* Hero Image */}
          <div className="lg:w-1/2 mt-8 lg:mt-0">
            <img
              src="https://www.cflowapps.com/wp-content/uploads/2018/07/task-management-process.png"
              alt="Task Management Illustration"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Our Task Management App?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <img
                src="https://thumbs.dreamstime.com/b/productivity-icon-stopwatch-gears-productivity-icon-stopwatch-gears-eps-file-easy-to-edit-160185066.jpg"
                alt="Feature 1"
                className="w-28 h-28 mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Easy to Use</h3>
              <p>
                Our app is designed with simplicity in mind, making it easy for
                anyone to manage tasks efficiently.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhX7x4G_31J75UUusvh4YcWyfQI-wd9eJ6BA&s"
                alt="Feature 2"
                className="w-28 h-28 mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Collaboration</h3>
              <p>
                Work seamlessly with your team by sharing tasks, tracking
                progress, and staying on the same page.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4GzWTLzTEcx_5NXVoNvqDr-RsiudmGyBvEtC6XJKlGU9qWM-AkrUStrApNnrIOrSUX0c&usqp=CAU"
                alt="Feature 3"
                className="w-28 h-28 mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Customizable</h3>
              <p>
                Tailor the app to your workflow with custom tags, filters, and
                priority settings.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="bg-gray-800 text-white py-16">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Take Control of Your Tasks?
          </h2>
          <p className="text-lg mb-8">
            Sign up today and start organizing your life with ease and
            efficiency.
          </p>
          <button className="px-8 py-3 bg-blue-600 font-semibold rounded-lg hover:bg-blue-700 transition">
            Sign Up Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
