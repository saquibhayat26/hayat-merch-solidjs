import { A } from "@solidjs/router";

export const NotFound = () => {
  return (
    <div class="flex justify-center items-center h-screen">
      <div class="bg-white p-8 rounded-m shadow-md text-center">
        <h1 class="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p class="text-gray-600 mb-6">
          The page you're looking for doesn't exist.
        </p>
        <A
          href="/"
          class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          Go to Home
        </A>
      </div>
    </div>
  );
};
