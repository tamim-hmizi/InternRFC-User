import Link from "next/link";

export default function NotFound() {
  return (
    <div className="card bg-neutral text-neutral-content w-96">
      <div className="card-body items-center text-center">
        <h2 className="card-title">Not Found!</h2>
        <p>Sorry, the page you are looking for does not exist.</p>
        <div className="card-actions justify-end">
          <Link href="/">
            <button className="btn btn-primary">Return to homepage</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
