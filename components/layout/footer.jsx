import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4 py-6 md:py-8">
        <div className="flex flex-col items-center md:items-start">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} InterviewMaster AI. All rights
            reserved.
          </p>
        </div>
        <nav className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-2">
          <Link
            href="/terms"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Terms of Service
          </Link>
          <Link
            href="/privacy"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Privacy Policy
          </Link>
          <Link
            href="/support"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Support
          </Link>
          <Link
            href="/feedback"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Feedback
          </Link>
        </nav>
      </div>
    </footer>
  );
}
