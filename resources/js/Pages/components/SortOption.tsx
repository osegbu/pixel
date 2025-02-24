interface SortOptionProps {
    selectedOption: string;
    value: string;
}
export default function SortOption({ selectedOption, value }: SortOptionProps) {
    return (
        <div className="sortOption">
            <div className="optionValue">{value}</div>
            <div className={`selectedOption ${selectedOption}`}></div>
        </div>
    );
}
