interface SVGProps {
    width?: string;
    height?: string;
}

export function Dots({width='15', height='3'}: SVGProps) {
    return <svg width={width} height={height}>
        <path
            d="M1.5 3a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm6 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm6 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"
            fill="currentColor" 
            fill-rule="evenodd"
        ></path>
    </svg>
}