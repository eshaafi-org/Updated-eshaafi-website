import { useEffect } from "react";
import { useRouter } from "next/router";
import BlogCard from "@/components/BlogCard";
import axios from "axios";
export default function CategoryPage() {
  let router = useRouter();
  // fetch data
  const getData = () =>
    useEffect(() => {
      console.log(router);
    }, []);
  return (
    <>
      <main>
        <section>
          <ul>
            {[].map((blog, indx) => (
              <li key={indx}>
                <BlogCard />
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  );
}
