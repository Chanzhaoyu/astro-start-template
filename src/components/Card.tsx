import { useStore } from "@nanostores/react";
import { count } from "@/store";
import { toast } from "react-hot-toast";

export default function Card() {
  const $count = useStore(count);

  return (
    <div>
      <div className="p-4 rounded-md border">
        <header className="font-bold">Card (React Component)</header>
        <main className="my-4">
          <p className="p-2 rounded-md bg-blue-200 mt-2">
            Counter is effect: &nbsp; {$count}
          </p>
        </main>
        <footer className="flex gap-4">
          <button
            className="px-4 p-2 border rounded-md"
            onClick={() => {
              count.set($count - 1);
            }}
          >
            Reduce Counter
          </button>
          <button
            className="px-4 p-2 border rounded-md bg-green-200"
            onClick={() => {
              toast.success("Hello World");
            }}
          >
            Say Hello Toast Message for react component
          </button>
        </footer>
      </div>
    </div>
  );
}
