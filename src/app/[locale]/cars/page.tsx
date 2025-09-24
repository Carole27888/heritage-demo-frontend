import { PagesProps } from "@/components/PagesProps";
import { setRequestLocale } from "next-intl/server";
import CarsWrapper from "@/features/cars/pages/CarsWrapper";

export default async function CarsPage({ params }: PagesProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <CarsWrapper />;
}
