"use client";
import { useEffect } from "react";
import { useRouter } from "next/router";
import BlogCard from "@/components/BlogCard";
import axios from "axios";
import { BASE_URL } from "@/helper/CONST";
export default function CategoryPage() {
  let router = useRouter();
  // fetch data
  const getData = () => {
    axios
      .get(`${BASE_URL}//new/users/blogs?category=${router?.query?.category}`)
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    getData();
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
