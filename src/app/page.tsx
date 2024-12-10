import Desktop from "@/components/Desktop";
import "@react95/core/GlobalStyle";
import "@react95/core/themes/win95.css";

export default function Home() {
  return (
    <div
      className="b bg-cover h-screen"
      style={{
        backgroundImage:
          'url("https://syjyscgqllcrvyutlqll.supabase.co/storage/v1/object/public/web_assets/windows_background.jpg?t=2024-12-10T02%3A52%3A09.467Z")',
      }}
    >
      <Desktop />
    </div>
  );
}
