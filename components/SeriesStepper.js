import React from "react";
import Link from "next/link";
import Select from "react-select";
import { useRouter } from "next/router";
import { formatPostPath } from "../appUtilities/utilityFunctions";
import {
  getPreviousSerialPartData,
  getNextSerialPartData,
} from "../appUtilities/actions";

const SeriesStepper = ({ post, seriesData }) => {
  const router = useRouter();
  const previous = getPreviousSerialPartData(post, seriesData) ? (
    <Link
      href="/post/[year]/[month]/[day]/[slug]"
      as={formatPostPath(
        getPreviousSerialPartData(post, seriesData).publishDate,
        getPreviousSerialPartData(post, seriesData).url
      )}
    >
      <a>{`Previous: ${getPreviousSerialPartData(post, seriesData).title}`}</a>
    </Link>
  ) : null;
  const next = getNextSerialPartData(post, seriesData) ? (
    <Link
      href="/post/[year]/[month]/[day]/[slug]"
      as={formatPostPath(
        getNextSerialPartData(post, seriesData).publishDate,
        getNextSerialPartData(post, seriesData).url
      )}
    >
      <a id="next-part-link" className="inline">{`Next: ${
        getNextSerialPartData(post, seriesData).title
      }`}</a>
    </Link>
  ) : null;

  const getSeriesOptions = () => {
    return seriesData.reduce((prev, curr) => {
      prev.push({ label: curr.title, value: curr });
      return prev;
    }, []);
  };
  const seriesOptions = getSeriesOptions();
  return (
    <div className="grid lg:self-start lg:w-64 lg:ml-4">
      <Select
        className="text-black bg-transparent"
        menuPlacement="auto"
        onChange={(option) => {
          router.push(
            formatPostPath(option.value.publishDate, option.value.url)
          );
        }}
        options={seriesOptions}
      />
      {previous && previous}
      {next && next}
    </div>
  );
};

export default SeriesStepper;
