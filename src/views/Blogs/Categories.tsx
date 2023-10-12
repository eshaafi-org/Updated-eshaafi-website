import style from "../../styles/blogs.module.scss";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { MdNavigateNext } from "react-icons/md";
// import { motion } from "framer-motion";
import { useWindowSize } from "react-use";
import BlogCard from "@/components/BlogCard";

// export default function Categories({ categories }: { categories: any[] }) {
//   const size = useWindowSize();
//   const [width, setWidth] = useState<number | null>(null);
//   let carousel = useRef<HTMLDivElement | null>(null);
//   useEffect(() => {
//     if (carousel.current) {
//       setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
//     }
//   }, [carousel?.current?.offsetWidth]);
//   return (
//     <ul className={style.categoryCont}>
//       {categories.map((item, indx) => (
//         <li key={indx}>
//           <div className="d-flex w-100 justify-between sm-col-gap-0-5">
//             <span>
//               <h4 className={`${style.blogPageHeadings} ${style.noMargin}`}>
//                 {item.name}
//               </h4>
//               <p className={style.blogDescription}>{item.description}</p>
//             </span>
//             <Link
//               href={`/blog/category/${item.name.replace(/\s/g, "")}`}
//               className="link"
//             >
//               View all <MdNavigateNext />
//             </Link>
//           </div>
//           <motion.div
//             ref={carousel}
//             whileTap={{ cursor: "grabbing" }}
//             className={style.categoryBlogsContainer}
//           >
//             <motion.div
//               whileTap={{ cursor: "grabbing" }}
//               drag={"x"}
//               dragConstraints={{ right: 0, left: -width! }}
//               key={JSON.stringify(size)}
//               className={style.innerCategoryBlogsContainer}
//             >
//               {item.blogs.map((blog: any, indx: number) => (
//                 <motion.div
//                   key={indx}
//                   whileTap={{ cursor: "grabbing" }}
//                   // style={{ visibility: i.icon === "" ? "hidden" }}
//                   className={style.sliderItm}
//                 >
//                   <BlogCard blog={blog} link={"/blog/"} />
//                 </motion.div>
//               ))}
//             </motion.div>
//           </motion.div>
//         </li>
//       ))}
//     </ul>
//   );
// }
export default function Categories({ categories }: { categories: any[] }) {
  const size = useWindowSize();
  const [width, setWidth] = useState<number | null>(null);
  let carousel = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (carousel.current) {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    }
  }, [carousel?.current?.offsetWidth]);
  return (
    <ul className={style.categoryCont}>
      {categories.map((item, indx) => (
        <li key={indx}>
          {" "}
          <div className="d-flex w-100 justify-between sm-col-gap-0-5">
            <span>
              <h4 className={`${style.blogPageHeadings} ${style.noMargin}`}>
                {item.name}
              </h4>
              <p className={style.blogDescription}>{item.description}</p>
            </span>
            <Link
              href={`/blog/category/${item.name.replace(/\s/g, "")}`}
              className="link"
            >
              View all <MdNavigateNext />
            </Link>
          </div>
          <div
            // ref={carousel}
            // whileTap={{ cursor: "grabbing" }}
            className={style.categoryBlogsContainer}
          >
            <div
              // whileTap={{ cursor: "grabbing" }}
              // drag={"x"}
              // dragConstraints={{ right: 0, left: -width! }}
              // key={JSON.stringify(size)}
              className={style.innerCategoryBlogsContainer}
            >
              {item.blogs.map((blog: any, indx: number) => (
                <div
                  key={indx}
                  // whileTap={{ cursor: "grabbing" }}
                  // style={{ visibility: i.icon === "" ? "hidden" }}
                  className={style.sliderItm}
                >
                  <BlogCard blog={blog} link={"/blog/"} />
                </div>
              ))}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
