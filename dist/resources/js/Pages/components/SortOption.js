import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function SortOption({ selectedOption, value }) {
    return (_jsxs("div", { className: "sortOption", children: [_jsx("div", { className: "optionValue", children: value }), _jsx("div", { className: `selectedOption ${selectedOption}` })] }));
}
