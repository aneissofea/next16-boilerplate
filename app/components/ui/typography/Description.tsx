type DescriptionProps = {
    text: string; // HTML from our own content files
    className?: string;
};

export default function Description({ text, className = "" }: DescriptionProps) {
    return (
        <div
            dangerouslySetInnerHTML={{ __html: text }}
            className={`custom-html ${className}`}
        />
    );
}
