import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <Header />
      <section className="flex items-center bg-white dark:bg-gray-900 h-screen">
        <div className="container text-left mx-auto grid gap-16 items-start py-8 px-4 max-w-screen-xl lg:grid-cols-2 lg:py-16 lg:px-6">
          <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              Welcome to Video KYC
            </h2>
            <p className="mb-4">
              Fast, Secure, and User-Friendly Verification at Your Fingertips
            </p>
            <p>
              Join the revolution in customer onboarding with our
              state-of-the-art Video KYC solution. Experience a seamless
              verification process that’s as easy as having a conversation.
            </p>

            <div className="flex flex-col items-start justify-start gap-4 mt-8">
              <div className="flex items-center">
                <input
                  id="link-checkbox"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="link-checkbox"
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  I agree with the{" "}
                  <a
                    href="#"
                    className="text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    terms and conditions
                  </a>
                  .
                </label>
              </div>

              <Link
                to="/start"
                className="text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm lg:px-5 py-2 lg:py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Get started
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
            <img
              className="w-full rounded-lg"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-2.png"
              alt="Office Content 1 - Descriptive Text"
            />
            <img
              className="mt-4 w-full lg:mt-10 rounded-lg"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-1.png"
              alt="Office Content 2 - Descriptive Text"
            />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Home;
