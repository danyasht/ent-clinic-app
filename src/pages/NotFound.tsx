import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="p-6">
      <p className="text-xl font-semibold">
        Page not found. Check if the URL is correct :)
      </p>
      <Link
        to="/"
        className="text-blue-500 hover:text-blue-700 text-lg hover:underline"
      >
        &larr; Back to main page
      </Link>
    </div>
  );
}
