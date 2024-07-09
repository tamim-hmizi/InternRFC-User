import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center">
      <div className="card bg-base-100 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-3xl font-bold mb-4">Not Found</h2>
          <p className="mb-8">Could not find the requested resource.</p>
          <div className="card-actions justify-end">
            <Link href="/">
              <button className="btn btn-primary">Return Home</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
