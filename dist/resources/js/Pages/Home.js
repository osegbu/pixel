import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState, useMemo } from "react";
import "./css/home.css";
import Layout from "./components/Layout";
export default function Home({ tasks }) {
    const [filter, setFilter] = useState("all");
    const [sort, setSort] = useState("date");
    const [order, setOrder] = useState("asc");
    const [taskData, setTaskData] = useState([]);
    const handleFilter = (value) => setFilter(value);
    const handleSort = (value) => setSort(value);
    const handleOrder = (value) => setOrder(value);
    const getDate = useMemo(() => (timeStamp) => {
        const date = new Date(timeStamp);
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    }, []);
    useEffect(() => {
        let filteredTasks = tasks;
        if (filter === "completed") {
            filteredTasks = tasks.filter((task) => task.status.toLowerCase() === "completed");
        }
        else if (filter === "pending") {
            filteredTasks = tasks.filter((task) => task.status.toLowerCase() === "pending");
        }
        else if (filter === "progress") {
            filteredTasks = tasks.filter((task) => task.status.toLowerCase() === "in progress");
        }
        filteredTasks.sort((a, b) => {
            if (sort === "name") {
                return a.task.localeCompare(b.task);
            }
            else if (sort === "date") {
                return (new Date(a.created_at).getTime() -
                    new Date(b.created_at).getTime());
            }
            else if (sort === "due_date") {
                return (new Date(a.due_date).getTime() -
                    new Date(b.due_date).getTime());
            }
            return 0;
        });
        if (order === "desc") {
            filteredTasks.reverse();
        }
        setTaskData([...filteredTasks]);
    }, [tasks, filter, sort, order]);
    return (_jsx("div", { className: "mainContainer", children: _jsxs("div", { className: "taskCon", children: [_jsx("div", { className: "filterTilter", children: _jsx("b", { children: filter === "all"
                            ? "All Tasks"
                            : filter.charAt(0).toUpperCase() +
                                filter.slice(1) +
                                " Tasks" }) }), taskData.length > 0 ? (_jsxs("table", { children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "ID" }), _jsx("th", { children: "TASK" }), _jsx("th", { children: "STATUS" }), _jsx("th", { children: "CREATED DATE" }), _jsx("th", { children: "DUE DATE" })] }) }), _jsx("tbody", { children: taskData.map((task) => (_jsxs("tr", { children: [_jsx("td", { "data-label": "ID", children: task.id }), _jsx("td", { "data-label": "Task", children: task.task }), _jsx("td", { "data-label": "Status", children: _jsx("div", { className: `status ${task.status.toLowerCase()}`, children: task.status }) }), _jsx("td", { "data-label": "Created Date", children: getDate(task.created_at) }), _jsx("td", { "data-label": "Due Date", children: task.due_date })] }, task.id))) })] })) : (_jsx("p", { children: "No tasks available." }))] }) }));
}
Home.layout = (page) => (_jsx(Layout, { title: "Home", description: "This is the Home page.", children: page }));
