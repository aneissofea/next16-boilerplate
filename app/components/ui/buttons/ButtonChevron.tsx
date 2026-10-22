type ButtonChevronProps = {
    direction: "left" | "right";
    disabled?: boolean;
    onClick?: () => void;
    className?: string;
};

export default function ButtonChevron({ direction, disabled, onClick, className = "" }: ButtonChevronProps) {
    return (
        <button type="button" onClick={onClick} disabled={disabled}
                aria-label={direction === "left" ? "Previous slide" : "Next slide"}
                className={`size-10 flex items-center justify-center rounded-full border border-current transition-opacity disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer ${className}`}>
            <svg viewBox="0 0 24 24" className={`size-5 ${direction === "left" ? "rotate-180" : ""}`}
                 fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
                <path d="m9 6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </button>
    );
}
