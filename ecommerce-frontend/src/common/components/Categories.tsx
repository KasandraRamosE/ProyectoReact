import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Image from "next/image";
import MainLayout from "@/common/components/layouts/MainLayout";

const Categories = () => {
  const [categories, setCategories] = useState<
    { slug: string; name: string; image: string }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchCategoriesWithImages = async () => {
      try {
        const response = await axios.get(
          "https://dummyjson.com/products/categories"
        );

        const categorySlugs = response.data;

        if (!Array.isArray(categorySlugs)) {
          console.error("Formato inesperado en las categorías:", categorySlugs);
          setCategories([]);
          return;
        }

        const categoriesWithImages = await Promise.all(
          categorySlugs.map(async (category: any) => {
            const slug = typeof category === "string" ? category : category.slug;

            if (typeof slug !== "string") {
              console.error(
                "Categoría no válida (se esperaba una cadena):",
                category
              );
              return null;
            }

            try {
              const productsResponse = await axios.get(
                `https://dummyjson.com/products/category/${slug}`
              );

              const products = productsResponse.data.products;

              const image =
                products.length > 0
                  ? products[0].thumbnail
                  : "/assets/categories/default.jpg";

              return {
                slug,
                name: slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, " "),
                image,
              };
            } catch (error) {
              console.error(
                `Error al cargar productos para la categoría ${slug}:`,
                error
              );
              return {
                slug,
                name: slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, " "),
                image: "/assets/categories/default.jpg",
              };
            }
          })
        );

        setCategories(categoriesWithImages.filter((category) => category !== null));
      } catch (error) {
        console.error("Error al cargar las categorías:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoriesWithImages();
  }, []);

  if (loading) {
    return (
      <MainLayout title="Categorías">
        <div className="flex justify-center items-center h-screen">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout title="Categorías">
      <div className="px-4">
        <p className="text-center mb-6 text-gray-600">
          Explora nuestras categorías y encuentra productos únicos.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div
              key={category.slug}
              className="p-4 bg-white border rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer"
              onClick={() =>
                router.push(`/productos/categoria/${category.slug}`)
              }
            >
              <div className="w-full h-40 flex items-center justify-center">
                <Image
                  src={category.image}
                  alt={category.name}
                  width={150}
                  height={150}
                  className="rounded-md object-contain"
                />
              </div>
              <h3 className="text-lg font-semibold text-center mt-4">
                {category.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Categories;
