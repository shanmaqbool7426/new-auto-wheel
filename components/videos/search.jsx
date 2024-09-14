"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Card, Input } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/videos/search/${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <Card shadow="0px 4px 20px 0px #00000014" padding="lg" radius="md">
      <div className="row mb-2">
        <div className="col-md-9">
          <Input
            size="md"
            radius="md"
            placeholder="Search Videos"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            leftSection={<IconSearch size={16} />}
          />
        </div>
        <div className="col-md-3 mt-md-0 mt-2">
          <Button
            fullWidth
            size="md"
            radius="md"
            style={{ backgroundColor: "#E90808",color:'#fff' }}

            leftSection={<IconSearch size={16} />}
            onClick={handleSearch}
            disabled={!searchQuery.trim()}
          >
            Search
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default Search;
