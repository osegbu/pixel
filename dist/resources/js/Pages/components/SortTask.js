import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import SortOption from "./SortOption";
import { useState } from "react";
export default function SortTask({ handleFilter, handleSort, handleOrder, }) {
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
    const handleFilterClick = (value) => {
        setFilter(value);
        handleFilter(value);
    };
    const handleSortClick = (value) => {
        setSort(value);
        handleSort(value);
    };
    const handleOrderClick = (value) => {
        setOrder(value);
        handleOrder(value);
    };
    return (_jsxs("div", { className: "sorterDiv", children: [_jsxs("div", { children: [_jsx("div", { className: "title", children: "Filter By:" }), filterOptions.map((option) => (_jsx("div", { onClick: () => handleFilterClick(option.value), children: _jsx(SortOption, { selectedOption: filter === option.value ? "active" : "", value: option.label }) }, option.value)))] }), _jsxs("div", { children: [_jsx("div", { className: "title", children: "Sort By:" }), sortOptions.map((option) => (_jsx("div", { onClick: () => handleSortClick(option.value), children: _jsx(SortOption, { selectedOption: sort === option.value ? "active" : "", value: option.label }) }, option.value)))] }), _jsxs("div", { children: [_jsx("div", { className: "title", children: "Order By:" }), orderOptions.map((option) => (_jsx("div", { onClick: () => handleOrderClick(option.value), children: _jsx(SortOption, { selectedOption: order === option.value ? "active" : "", value: option.label }) }, option.value)))] })] }));
}
