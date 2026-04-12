export default function Footer() {
  return (
    <footer className="py-8 text-center border-t border-border">
      <p className="text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} Naji Najari. Built with Next.js.
      </p>
    </footer>
  );
}
