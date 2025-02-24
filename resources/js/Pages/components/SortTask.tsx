import SortOption from "./SortOption";
import { useState } from "react";

interface SortTaskProps {
    handleFilter: (value: string) => void;
    handleSort: (value: string) => void;
    handleOrder: (value: string) => void;
}

export default function SortTask({
    handleFilter,
    handleSort,
    handleOrder,
}: SortTaskProps) {
    const [filter, setFilter] = useState("all");
    const [sort, setSort] = useState("date");
    const [order, setOrder] = useState("asc");

    const filterOptions = [
        { label: "Show All", value: "all" },
        { label: "Show Completed", value: "completed" },
        { label: "Show Pending", value: "pending" },
    ];

    const sortOptions = [
        { label: "Name", value: "name" },
        { label: "Created Date", value: "date" },
        { label: "Due Date", value: "due_date" },
    ];

    const orderOptions = [
        { label: "Ascending Order", value: "asc" },
        { label: "Descending Order", value: "desc" },
    ];

    const handleFilterClick = (value: string) => {
        setFilter(value);
        handleFilter(value);
    };

    const handleSortClick = (value: string) => {
        setSort(value);
        handleSort(value);
    };

    const handleOrderClick = (value: string) => {
        setOrder(value);
        handleOrder(value);
    };

    return (
        <div className="sorterDiv">
            <div>
                <div className="title">Filter By:</div>
                {filterOptions.map((option) => (
                    <div
                        key={option.value}
                        onClick={() => handleFilterClick(option.value)}
                    >
                        <SortOption
                            selectedOption={
                                filter === option.value ? "active" : ""
                            }
                            value={option.label}
                        />
                    </div>
                ))}
            </div>

            <div>
                <div className="title">Sort By:</div>
                {sortOptions.map((option) => (
                    <div
                        key={option.value}
                        onClick={() => handleSortClick(option.value)}
                    >
                        <SortOption
                            selectedOption={
                                sort === option.value ? "active" : ""
                            }
                            value={option.label}
                        />
                    </div>
                ))}
            </div>

            <div>
                <div className="title">Order By:</div>
                {orderOptions.map((option) => (
                    <div
                        key={option.value}
                        onClick={() => handleOrderClick(option.value)}
                    >
                        <SortOption
                            selectedOption={
                                order === option.value ? "active" : ""
                            }
                            value={option.label}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
