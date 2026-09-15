"use client";

import { useState } from "react";
import { DestinationsCta } from "./destinations-cta";
import { DestinationsExplorer } from "./destinations-explorer";
import { DestinationsFeatured } from "./destinations-featured";
import { DestinationsHero } from "./destinations-hero";
import { DestinationsMap } from "./destinations-map";
import { DestinationsMood } from "./destinations-mood";
import { DestinationsStory } from "./destinations-story";

export function DestinationsPageContent() {
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("all");

  return (
    <>
      <DestinationsHero />
      <DestinationsExplorer
        search={search}
        region={region}
        onSearchChange={setSearch}
        onRegionChange={setRegion}
      />
      <DestinationsFeatured search={search} region={region} />
      <DestinationsMood />
      <DestinationsStory />
      <DestinationsMap />
      <DestinationsCta />
    </>
  );
}
