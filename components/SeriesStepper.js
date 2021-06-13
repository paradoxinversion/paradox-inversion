import React from "react";
import Link from "next/link";

import { formatPostPath } from "../appUtilities/utilityFunctions";
import {
  getPreviousSerialPartData,
  getNextSerialPartData,
} from "../appUtilities/actions";

const SeriesStepper = ({ post, seriesData }) => {
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
      <a id="next-part-link">{`Next: ${
        getNextSerialPartData(post, seriesData).title
      }`}</a>
    </Link>
  ) : null;

  return (
    <div>
      {previous && previous}
      {next && next}
    </div>
  );
};

export default SeriesStepper;
